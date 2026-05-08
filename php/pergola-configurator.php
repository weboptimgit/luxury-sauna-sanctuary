<?php
/**
 * Plugin Name: Luxurelax – Pergola Configurator
 * Description: Samostatný backend pre konfigurátor pergoly. Prijíma dopyt z React appky,
 *              prepočíta cenu a (voliteľne) vytvorí WooCommerce objednávku/košík + pošle e-mail.
 * Version:     1.0.0
 * Author:      Luxurelax
 *
 * Endpoint:    POST /wp-json/luxurelax-pergola/v1/inquiry
 *
 * Súbor je úmyselne oddelený od existujúceho sauna-configurator.php aby sa logika nepletla.
 */

if (!defined('ABSPATH')) exit;

// =====================================================================
// 1) KONFIGURÁCIA – TU NEZABUDNI DOPLNIŤ WOO PRODUCT ID
// =====================================================================
if (!defined('LUXURELAX_PERGOLA_PRODUCT_ID')) {
    // TODO: nahraď reálnym Woo Product ID, keď bude vytvorené
    define('LUXURELAX_PERGOLA_PRODUCT_ID', 0);
}

if (!defined('LUXURELAX_PERGOLA_INQUIRY_EMAIL')) {
    define('LUXURELAX_PERGOLA_INQUIRY_EMAIL', get_option('admin_email'));
}

// Cenník (ilustračný – synchronizuj s frontendom!)
function luxurelax_pergola_pricing() {
    return [
        'base_price'            => 1800,   // EUR
        'price_per_m2'          => 220,    // EUR / m² strechy
        'height_baseline_cm'    => 250,
        'height_surcharge_per_cm' => 4,    // za každý cm nad baseline
        'colors' => [
            'anthracite'  => ['label' => 'Antracit',         'premium' => false],
            'white'       => ['label' => 'Biela',            'premium' => false],
            'brown'       => ['label' => 'Hnedá',            'premium' => false],
            'golden_oak'  => ['label' => 'Zlatý dub',        'premium' => true],
            'walnut'      => ['label' => 'Orech',            'premium' => true],
            'ral'         => ['label' => 'RAL vlastná farba','premium' => true],
        ],
        'premium_color_multiplier' => 1.10, // +10 %
        'roofs' => [
            'polycarbonate' => ['label' => 'Polykarbonát',       'price_per_m2' => 0],
            'safety_glass'  => ['label' => 'Bezpečnostné sklo',  'price_per_m2' => 90],
            'izo_glass_24'  => ['label' => 'IZO Sklo 24',        'price_per_m2' => 180],
        ],
        'transparencies' => [
            'milky' => 'Mliečne',
            'clear' => 'Číre',
        ],
        'mounting_price' => 850,
        'led_price'      => 420,
    ];
}

// =====================================================================
// 2) REST API
// =====================================================================
add_action('rest_api_init', function () {
    register_rest_route('luxurelax-pergola/v1', '/inquiry', [
        'methods'             => 'POST',
        'callback'            => 'luxurelax_pergola_handle_inquiry',
        'permission_callback' => '__return_true',
    ]);
    register_rest_route('luxurelax-pergola/v1', '/add-to-cart', [
        'methods'             => 'POST',
        'callback'            => 'luxurelax_pergola_handle_add_to_cart',
        'permission_callback' => '__return_true',
    ]);
});

// CORS pre konfigurátor (ak je hostovaný na inom hoste)
add_action('rest_api_init', function () {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function ($value) {
        $origin = get_http_origin();
        $allowed = ['https://www.luxurelax.sk', 'https://www.luxurelax.com', 'https://luxurelax.sk', 'https://luxurelax.com'];
        if ($origin && in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
            header('Access-Control-Allow-Methods: POST, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
            header('Access-Control-Allow-Credentials: true');
            header('Vary: Origin');
        }
        return $value;
    });
});

function luxurelax_pergola_calculate_price($cfg) {
    $p = luxurelax_pergola_pricing();

    $width  = max(200, min(5000, intval($cfg['width']  ?? 0)));
    $depth  = max(200, min(600,  intval($cfg['depth']  ?? 0)));
    $height = max(200, min(350,  intval($cfg['height'] ?? 0)));

    $area = ($width * $depth) / 10000.0; // m²

    $color_key = $cfg['color']        ?? 'anthracite';
    $roof_key  = $cfg['roof']         ?? 'polycarbonate';
    $trans_key = $cfg['transparency'] ?? 'clear';

    if (!isset($p['colors'][$color_key])) $color_key = 'anthracite';
    if (!isset($p['roofs'][$roof_key]))   $roof_key  = 'polycarbonate';
    if (!isset($p['transparencies'][$trans_key])) $trans_key = 'clear';

    // Business rule: IZO Sklo 24 = vždy číre
    if ($roof_key === 'izo_glass_24') {
        $trans_key = 'clear';
    }

    $price  = $p['base_price'];
    $price += $area * $p['price_per_m2'];
    $price += $area * $p['roofs'][$roof_key]['price_per_m2'];

    if ($height > $p['height_baseline_cm']) {
        $price += ($height - $p['height_baseline_cm']) * $p['height_surcharge_per_cm'];
    }

    if ($p['colors'][$color_key]['premium']) {
        $price *= $p['premium_color_multiplier'];
    }

    if (!empty($cfg['mounting'])) $price += $p['mounting_price'];
    if (!empty($cfg['led']))      $price += $p['led_price'];

    return [
        'price'        => round($price),
        'area_m2'      => round($area, 2),
        'color_label'  => $p['colors'][$color_key]['label'],
        'roof_label'   => $p['roofs'][$roof_key]['label'],
        'trans_label'  => $p['transparencies'][$trans_key],
        'normalized'   => [
            'width'        => $width,
            'depth'        => $depth,
            'height'       => $height,
            'color'        => $color_key,
            'roof'         => $roof_key,
            'transparency' => $trans_key,
            'mounting'     => !empty($cfg['mounting']),
            'led'          => !empty($cfg['led']),
        ],
    ];
}

function luxurelax_pergola_handle_inquiry(WP_REST_Request $request) {
    $body = $request->get_json_params();
    if (!is_array($body)) {
        return new WP_REST_Response(['error' => 'Invalid payload'], 400);
    }

    $cfg      = $body['config']   ?? [];
    $customer = $body['customer'] ?? [];

    // Server-side validácia zákazníka
    $name  = sanitize_text_field($customer['name']  ?? '');
    $phone = sanitize_text_field($customer['phone'] ?? '');
    $email = sanitize_email($customer['email']      ?? '');
    $city  = sanitize_text_field($customer['city']  ?? '');
    $note  = sanitize_textarea_field($customer['note'] ?? '');

    if ($name === '' || $phone === '' || !is_email($email) || $city === '') {
        return new WP_REST_Response(['error' => 'Missing or invalid fields'], 422);
    }

    $calc = luxurelax_pergola_calculate_price($cfg);

    // Uloženie ako CPT inquiry (jednoduchá CRM stopa)
    $post_id = wp_insert_post([
        'post_type'   => 'pergola_inquiry',
        'post_status' => 'publish',
        'post_title'  => sprintf('Pergola dopyt – %s (%s €)', $name, $calc['price']),
        'post_content'=> $note,
    ]);
    if ($post_id && !is_wp_error($post_id)) {
        update_post_meta($post_id, '_pergola_config', $calc['normalized']);
        update_post_meta($post_id, '_pergola_price',  $calc['price']);
        update_post_meta($post_id, '_pergola_customer', [
            'name' => $name, 'phone' => $phone, 'email' => $email, 'city' => $city,
        ]);
    }

    // E-mail
    $cfg_n = $calc['normalized'];
    $lines = [
        "Nový dopyt na pergolu (Luxurelax)",
        "------------------------------------",
        "Meno:      $name",
        "Telefón:   $phone",
        "E-mail:    $email",
        "Mesto:     $city",
        "Poznámka:  $note",
        "",
        "Konfigurácia:",
        "  Rozmery:       {$cfg_n['width']} × {$cfg_n['depth']} × {$cfg_n['height']} cm",
        "  Plocha strechy: {$calc['area_m2']} m²",
        "  Farba:         {$calc['color_label']}",
        "  Strecha:       {$calc['roof_label']}",
        "  Priehľadnosť:  {$calc['trans_label']}",
        "  Montáž:        " . ($cfg_n['mounting'] ? 'Áno' : 'Nie'),
        "  LED:           " . ($cfg_n['led'] ? 'Áno' : 'Nie'),
        "",
        "Orientačná cena: {$calc['price']} €",
    ];
    wp_mail(
        LUXURELAX_PERGOLA_INQUIRY_EMAIL,
        'Nový dopyt – Pergola konfigurátor',
        implode("\n", $lines),
        ['Content-Type: text/plain; charset=UTF-8', 'Reply-To: ' . $email]
    );

    return new WP_REST_Response([
        'success' => true,
        'price'   => $calc['price'],
        'inquiry_id' => $post_id ?: null,
    ], 200);
}

// =====================================================================
// 3) Custom Post Type pre dopyty (jednoduchý CRM zoznam v adminovi)
// =====================================================================
add_action('init', function () {
    register_post_type('pergola_inquiry', [
        'label'        => 'Pergola dopyty',
        'public'       => false,
        'show_ui'      => true,
        'show_in_menu' => true,
        'menu_icon'    => 'dashicons-email-alt',
        'supports'     => ['title', 'editor', 'custom-fields'],
        'capability_type' => 'post',
    ]);
});

// =====================================================================
// 4) (Voliteľné) WooCommerce – pridanie do košíka s konfiguráciou
//     Volaj manuálne, alebo rozšír handler vyššie tak, aby vytváral order.
// =====================================================================
add_filter('woocommerce_get_item_data', function ($item_data, $cart_item) {
    if (!empty($cart_item['pergola_config'])) {
        foreach ($cart_item['pergola_config'] as $k => $v) {
            $item_data[] = ['key' => $k, 'value' => $v];
        }
    }
    return $item_data;
}, 10, 2);

add_action('woocommerce_checkout_create_order_line_item', function ($item, $cart_item_key, $values) {
    if (!empty($values['pergola_config'])) {
        foreach ($values['pergola_config'] as $k => $v) {
            $item->add_meta_data($k, $v, true);
        }
    }
    if (!empty($values['pergola_price'])) {
        $item->set_subtotal($values['pergola_price']);
        $item->set_total($values['pergola_price']);
    }
}, 10, 3);
