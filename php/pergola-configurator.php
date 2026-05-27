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
    define('LUXURELAX_PERGOLA_PRODUCT_ID', 2210);
}

if (!defined('LUXURELAX_PERGOLA_INQUIRY_EMAIL')) {
    define('LUXURELAX_PERGOLA_INQUIRY_EMAIL', 'info@luxurelax.sk');
}
if (!defined('LUXURELAX_PERGOLA_FROM_EMAIL')) {
    define('LUXURELAX_PERGOLA_FROM_EMAIL', 'info@luxurelax.sk');
}
if (!defined('LUXURELAX_PERGOLA_FROM_NAME')) {
    define('LUXURELAX_PERGOLA_FROM_NAME', 'LuxuRelax');
}

// Cenník (ilustračný – synchronizuj s frontendom!)
function luxurelax_pergola_pricing() {
    return [
        'base_price'            => 1800,   // EUR
        'price_per_m2'          => 220,    // EUR / m² strechy
        'height_baseline_cm'    => 250,
        'height_surcharge_per_cm' => 4,    // za každý cm nad baseline
        'colors' => [
            'anthracite'  => ['label' => ['sk' => 'Antracit',         'en' => 'Anthracite',       'hu' => 'Antracit'],         'premium' => false],
            'white'       => ['label' => ['sk' => 'Biela',            'en' => 'White',            'hu' => 'Fehér'],            'premium' => false],
            'brown'       => ['label' => ['sk' => 'Hnedá',            'en' => 'Brown',            'hu' => 'Barna'],            'premium' => false],
            'golden_oak'  => ['label' => ['sk' => 'Zlatý dub',        'en' => 'Golden Oak',       'hu' => 'Aranytölgy'],       'premium' => true],
            'walnut'      => ['label' => ['sk' => 'Orech',            'en' => 'Walnut',           'hu' => 'Dió'],              'premium' => true],
            'ral'         => ['label' => ['sk' => 'RAL vlastná farba','en' => 'Custom RAL color', 'hu' => 'Egyedi RAL szín'],  'premium' => true],
        ],
        'premium_color_multiplier' => 1.10, // +10 %
        'roofs' => [
            'polycarbonate' => ['label' => ['sk' => 'Polykarbonát',      'en' => 'Polycarbonate',  'hu' => 'Polikarbonát'],   'price_per_m2' => 0],
            'safety_glass'  => ['label' => ['sk' => 'Bezpečnostné sklo', 'en' => 'Safety glass',   'hu' => 'Biztonsági üveg'], 'price_per_m2' => 90],
            'izo_glass_24'  => ['label' => ['sk' => 'IZO Sklo 24',       'en' => 'IZO Glass 24',   'hu' => 'IZO üveg 24'],    'price_per_m2' => 180],
        ],
        'transparencies' => [
            'milky' => ['sk' => 'Mliečne', 'en' => 'Milky', 'hu' => 'Tejüveg'],
            'clear' => ['sk' => 'Číre',    'en' => 'Clear', 'hu' => 'Átlátszó'],
        ],
        'mounting_price'        => 850,
        'led_price'             => 420,
        'reinforcement_price'   => 180,
        'extra_post_price'      => 220,
    ];
}

// Resolve a multilingual label array to a single string based on lang.
function luxurelax_pergola_t($value, $lang) {
    if (is_array($value)) {
        return $value[$lang] ?? $value['sk'] ?? reset($value);
    }
    return (string) $value;
}

// Centrálne UI/email preklady
function luxurelax_pergola_strings($lang) {
    $dict = [
        'sk' => [
            'yes' => 'Áno', 'no' => 'Nie',
            'rozmery' => 'Rozmery', 'plocha' => 'Plocha strechy',
            'farba' => 'Farba', 'strecha' => 'Strecha', 'priehladnost' => 'Priehľadnosť',
            'stlpy' => 'Stĺpy', 'stlp' => 'stĺp', 'vystuha' => 'výztuha',
            'montaz' => 'Montáž', 'led' => 'LED',
            'cart_item_name' => 'Pergola – konfigurácia na mieru',
            'expired' => 'Konfigurácia pergoly vypršala alebo je neplatná. Skús to prosím znova.',
            'add_failed' => 'Pergolu sa nepodarilo pridať do košíka.',
            'email_subject' => 'Nový dopyt – Pergola konfigurátor',
            'email_heading' => 'Nový dopyt na pergolu (Luxurelax)',
            'email_name' => 'Meno', 'email_phone' => 'Telefón', 'email_email' => 'E-mail',
            'email_city' => 'Mesto', 'email_note' => 'Poznámka',
            'email_config' => 'Konfigurácia', 'email_price' => 'Orientačná cena',
            'cust_subject' => 'Prijali sme váš dopyt – LuxuRelax pergola',
            'cust_hello' => 'Dobrý deň',
            'cust_thanks' => 'Ďakujeme za váš dopyt na pergolu. Vašu konfiguráciu sme úspešne prijali a čoskoro vás budeme kontaktovať s nezáväznou cenovou ponukou.',
            'cust_your_config' => 'Vaša konfigurácia',
            'cust_indicative' => 'Orientačná cena (môže sa upraviť podľa finálnej špecifikácie)',
            'cust_signature' => 'S pozdravom,\nTím LuxuRelax\ninfo@luxurelax.sk',
        ],
        'en' => [
            'yes' => 'Yes', 'no' => 'No',
            'rozmery' => 'Dimensions', 'plocha' => 'Roof area',
            'farba' => 'Color', 'strecha' => 'Roof', 'priehladnost' => 'Transparency',
            'stlpy' => 'Posts', 'stlp' => 'post', 'vystuha' => 'reinforcement',
            'montaz' => 'Installation', 'led' => 'LED',
            'cart_item_name' => 'Pergola – custom configuration',
            'expired' => 'Pergola configuration expired or is invalid. Please try again.',
            'add_failed' => 'Failed to add pergola to cart.',
            'email_subject' => 'New inquiry – Pergola configurator',
            'email_heading' => 'New pergola inquiry (Luxurelax)',
            'email_name' => 'Name', 'email_phone' => 'Phone', 'email_email' => 'E-mail',
            'email_city' => 'City', 'email_note' => 'Note',
            'email_config' => 'Configuration', 'email_price' => 'Indicative price',
            'cust_subject' => 'We received your inquiry – LuxuRelax pergola',
            'cust_hello' => 'Hello',
            'cust_thanks' => 'Thank you for your pergola inquiry. We have successfully received your configuration and will contact you shortly with a non-binding price quote.',
            'cust_your_config' => 'Your configuration',
            'cust_indicative' => 'Indicative price (may be adjusted based on final specification)',
            'cust_signature' => 'Best regards,\nThe LuxuRelax Team\ninfo@luxurelax.sk',
        ],
        'hu' => [
            'yes' => 'Igen', 'no' => 'Nem',
            'rozmery' => 'Méretek', 'plocha' => 'Tetőfelület',
            'farba' => 'Szín', 'strecha' => 'Tető', 'priehladnost' => 'Átlátszóság',
            'stlpy' => 'Oszlopok', 'stlp' => 'oszlop', 'vystuha' => 'merevítés',
            'montaz' => 'Telepítés', 'led' => 'LED',
            'cart_item_name' => 'Pergola – egyedi konfiguráció',
            'expired' => 'A pergola konfiguráció lejárt vagy érvénytelen. Kérjük, próbálja újra.',
            'add_failed' => 'A pergolát nem sikerült a kosárba helyezni.',
            'email_subject' => 'Új ajánlatkérés – Pergola konfigurátor',
            'email_heading' => 'Új pergola ajánlatkérés (Luxurelax)',
            'email_name' => 'Név', 'email_phone' => 'Telefon', 'email_email' => 'E-mail',
            'email_city' => 'Város', 'email_note' => 'Megjegyzés',
            'email_config' => 'Konfiguráció', 'email_price' => 'Tájékoztató ár',
            'cust_subject' => 'Megkaptuk az ajánlatkérését – LuxuRelax pergola',
            'cust_hello' => 'Tisztelt',
            'cust_thanks' => 'Köszönjük a pergolára vonatkozó ajánlatkérését. Konfigurációját sikeresen megkaptuk, és hamarosan felvesszük Önnel a kapcsolatot egy nem kötelező árajánlattal.',
            'cust_your_config' => 'Az Ön konfigurációja',
            'cust_indicative' => 'Tájékoztató ár (a végleges specifikáció alapján módosulhat)',
            'cust_signature' => 'Üdvözlettel,\nA LuxuRelax csapata\ninfo@luxurelax.sk',
        ],
    ];
    return $dict[$lang] ?? $dict['sk'];
}

function luxurelax_pergola_normalize_lang($lang) {
    $lang = strtolower((string) $lang);
    return in_array($lang, ['sk', 'en', 'hu'], true) ? $lang : 'sk';
}

$GLOBALS['luxurelax_pergola_last_mail_error'] = '';

add_action('wp_mail_failed', function ($error) {
    if (is_wp_error($error)) {
        $GLOBALS['luxurelax_pergola_last_mail_error'] = $error->get_error_message();
        error_log('LuxuRelax pergola wp_mail failed: ' . $error->get_error_message());
    }
});

function luxurelax_pergola_send_mail($to, $subject, $message, $reply_to_email = '', $reply_to_name = '', $from_email = '', $from_name = '', $is_html = false) {
    $GLOBALS['luxurelax_pergola_last_mail_error'] = '';

    $active_from_email = is_email($from_email) ? sanitize_email($from_email) : LUXURELAX_PERGOLA_FROM_EMAIL;
    $active_from_name  = sanitize_text_field($from_name ?: LUXURELAX_PERGOLA_FROM_NAME);

    $from_email_filter = function () use ($active_from_email) { return $active_from_email; };
    $from_name_filter = function () use ($active_from_name) { return $active_from_name; };

    add_filter('wp_mail_from', $from_email_filter, 999);
    add_filter('wp_mail_from_name', $from_name_filter, 999);

    $headers = [
        'Content-Type: ' . ($is_html ? 'text/html' : 'text/plain') . '; charset=UTF-8',
        'X-LuxuRelax-Mail: pergola-configurator',
    ];
    if ($reply_to_email && is_email($reply_to_email)) {
        $headers[] = 'Reply-To: ' . sanitize_text_field($reply_to_name ?: LUXURELAX_PERGOLA_FROM_NAME) . ' <' . sanitize_email($reply_to_email) . '>';
    }

    $sent = wp_mail($to, $subject, $message, $headers);

    remove_filter('wp_mail_from', $from_email_filter, 999);
    remove_filter('wp_mail_from_name', $from_name_filter, 999);

    return [
        'sent'  => (bool) $sent,
        'error' => $sent ? '' : ($GLOBALS['luxurelax_pergola_last_mail_error'] ?: 'wp_mail() returned false without a detailed error'),
        'to' => $to,
        'from' => $active_from_name . ' <' . $active_from_email . '>',
        'subject' => $subject,
    ];
}

/**
 * Render branded HTML email (LuxuRelax dark/amber theme).
 *
 * $rows: array of ['label' => '...', 'value' => '...']
 * $opts: ['intro' => '', 'outro' => '', 'greeting' => '', 'lang' => 'sk']
 */
function luxurelax_pergola_render_email_html($title, $rows, $opts = []) {
    $intro     = $opts['intro']     ?? '';
    $outro     = $opts['outro']     ?? '';
    $greeting  = $opts['greeting']  ?? '';
    $signature = $opts['signature'] ?? '';
    $footer    = $opts['footer']    ?? 'LuxuRelax · info@luxurelax.sk · www.luxurelax.sk';

    $rows_html = '';
    foreach ($rows as $r) {
        $label = esc_html($r['label']);
        $value = esc_html($r['value']);
        $rows_html .= '<tr>'
            . '<td style="padding:10px 16px;border-bottom:1px solid #2a2520;color:#a8a29e;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;width:42%;vertical-align:top;font-family:Arial,Helvetica,sans-serif;">' . $label . '</td>'
            . '<td style="padding:10px 16px;border-bottom:1px solid #2a2520;color:#f5f5f4;font-size:15px;font-weight:600;vertical-align:top;font-family:Arial,Helvetica,sans-serif;">' . $value . '</td>'
            . '</tr>';
    }

    $intro_html     = $intro     ? '<p style="margin:0 0 18px;color:#d6d3d1;font-size:15px;line-height:1.65;font-family:Arial,Helvetica,sans-serif;">' . nl2br(esc_html($intro)) . '</p>' : '';
    $outro_html     = $outro     ? '<p style="margin:24px 0 0;color:#d6d3d1;font-size:14px;line-height:1.65;font-family:Arial,Helvetica,sans-serif;">' . nl2br(esc_html($outro)) . '</p>' : '';
    $greeting_html  = $greeting  ? '<p style="margin:0 0 8px;color:#f5f5f4;font-size:16px;font-family:Arial,Helvetica,sans-serif;">' . esc_html($greeting) . '</p>' : '';
    $signature_html = $signature ? '<p style="margin:24px 0 0;color:#a8a29e;font-size:13px;line-height:1.6;font-family:Arial,Helvetica,sans-serif;">' . nl2br(esc_html($signature)) . '</p>' : '';

    $title_html = esc_html($title);

    return '<!DOCTYPE html><html lang="sk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . $title_html . '</title></head>'
        . '<body style="margin:0;padding:0;background:#f5f3f0;font-family:Arial,Helvetica,sans-serif;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f3f0;padding:32px 12px;">'
        . '<tr><td align="center">'
        . '<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#14110d;border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.25);">'
        // Header
        . '<tr><td style="background:linear-gradient(135deg,#d99936 0%,#b8761f 100%);padding:28px 32px;text-align:center;">'
        . '<div style="font-family:Georgia,\'Times New Roman\',serif;font-size:28px;font-weight:700;color:#14110d;letter-spacing:0.08em;">LuxuRelax</div>'
        . '<div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#14110d;letter-spacing:0.3em;text-transform:uppercase;margin-top:6px;opacity:0.75;">Pergola Konfigurátor</div>'
        . '</td></tr>'
        // Body
        . '<tr><td style="padding:32px;">'
        . $greeting_html
        . '<h1 style="margin:0 0 18px;font-family:Georgia,\'Times New Roman\',serif;font-size:22px;font-weight:600;color:#f5f5f4;line-height:1.3;">' . $title_html . '</h1>'
        . $intro_html
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1c1814;border:1px solid #2a2520;border-radius:10px;overflow:hidden;margin-top:8px;">'
        . $rows_html
        . '</table>'
        . $outro_html
        . $signature_html
        . '</td></tr>'
        // Accent strip
        . '<tr><td style="height:4px;background:linear-gradient(90deg,#d99936,#b8761f,#d99936);font-size:0;line-height:0;">&nbsp;</td></tr>'
        // Footer
        . '<tr><td style="background:#0e0c09;padding:18px 32px;text-align:center;color:#78716c;font-size:12px;font-family:Arial,Helvetica,sans-serif;letter-spacing:0.04em;">'
        . esc_html($footer)
        . '</td></tr>'
        . '</table>'
        . '</td></tr></table></body></html>';
}

/**
 * Stĺpová logika podľa technickej tabuľky (musí byť identické s frontendom!).
 *  ≤ 506 cm  → 2 stĺpy
 *  ≤ 606 cm  → 2 stĺpy + výstuha
 *  ≤ 906 cm  → 3 stĺpy
 *  > 906 cm  → 4 stĺpy
 */
function luxurelax_pergola_compute_post_layout($width_cm) {
    $w = (int) $width_cm;
    if ($w <= 506) return ['posts' => 2, 'reinforcement' => false];
    if ($w <= 606) return ['posts' => 2, 'reinforcement' => true];
    if ($w <= 906) return ['posts' => 3, 'reinforcement' => false];
    return ['posts' => 4, 'reinforcement' => false];
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

function luxurelax_pergola_calculate_price($cfg, $lang = 'sk') {
    $lang = luxurelax_pergola_normalize_lang($lang);
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

    $post_layout = luxurelax_pergola_compute_post_layout($width);
    $extra_posts = max(0, $post_layout['posts'] - 2);
    if ($extra_posts > 0)               $price += $extra_posts * $p['extra_post_price'];
    if ($post_layout['reinforcement'])  $price += $p['reinforcement_price'];

    return [
        'price'        => round($price),
        'area_m2'      => round($area, 2),
        'color_label'  => luxurelax_pergola_t($p['colors'][$color_key]['label'], $lang),
        'roof_label'   => luxurelax_pergola_t($p['roofs'][$roof_key]['label'], $lang),
        'trans_label'  => luxurelax_pergola_t($p['transparencies'][$trans_key], $lang),
        'posts'        => $post_layout['posts'],
        'reinforcement'=> $post_layout['reinforcement'],
        'normalized'   => [
            'width'        => $width,
            'depth'        => $depth,
            'height'       => $height,
            'color'        => $color_key,
            'roof'         => $roof_key,
            'transparency' => $trans_key,
            'mounting'     => !empty($cfg['mounting']),
            'led'          => !empty($cfg['led']),
            'posts'        => $post_layout['posts'],
            'reinforcement'=> $post_layout['reinforcement'],
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
    $lang     = luxurelax_pergola_normalize_lang($body['lang'] ?? 'sk');
    $s        = luxurelax_pergola_strings($lang);

    $name  = sanitize_text_field($customer['name']  ?? '');
    $phone = sanitize_text_field($customer['phone'] ?? '');
    $email = sanitize_email($customer['email']      ?? '');
    $city  = sanitize_text_field($customer['city']  ?? '');
    $note  = sanitize_textarea_field($customer['note'] ?? '');

    if ($name === '' || $phone === '' || !is_email($email) || $city === '') {
        return new WP_REST_Response(['error' => 'Missing or invalid fields'], 422);
    }

    $calc = luxurelax_pergola_calculate_price($cfg, $lang);

    $post_id = wp_insert_post([
        'post_type'   => 'pergola_inquiry',
        'post_status' => 'publish',
        'post_title'  => sprintf('Pergola dopyt – %s (%s €)', $name, $calc['price']),
        'post_content'=> $note,
    ]);
    if ($post_id && !is_wp_error($post_id)) {
        update_post_meta($post_id, '_pergola_config', $calc['normalized']);
        update_post_meta($post_id, '_pergola_price',  $calc['price']);
        update_post_meta($post_id, '_pergola_lang',   $lang);
        update_post_meta($post_id, '_pergola_customer', [
            'name' => $name, 'phone' => $phone, 'email' => $email, 'city' => $city,
        ]);
    }

    $cfg_n = $calc['normalized'];
    $lines = [
        $s['email_heading'],
        "------------------------------------",
        "{$s['email_name']}:    $name",
        "{$s['email_phone']}:   $phone",
        "{$s['email_email']}:   $email",
        "{$s['email_city']}:    $city",
        "{$s['email_note']}:    $note",
        "",
        "{$s['email_config']}:",
        "  {$s['rozmery']}:      {$cfg_n['width']} × {$cfg_n['depth']} × {$cfg_n['height']} cm",
        "  {$s['plocha']}:       {$calc['area_m2']} m²",
        "  {$s['farba']}:        {$calc['color_label']}",
        "  {$s['strecha']}:      {$calc['roof_label']}",
        "  {$s['priehladnost']}: {$calc['trans_label']}",
        "  {$s['montaz']}:       " . ($cfg_n['mounting'] ? $s['yes'] : $s['no']),
        "  {$s['led']}:          " . ($cfg_n['led'] ? $s['yes'] : $s['no']),
    ];
    // 1) Email pre admina (info@luxurelax.sk)
    $admin_mail = luxurelax_pergola_send_mail(
        LUXURELAX_PERGOLA_INQUIRY_EMAIL,
        $s['email_subject'],
        implode("\n", $lines),
        $email,
        $name
    );

    // 2) Potvrdzovací email zákazníkovi
    $cust_lines = [
        str_replace('\n', "\n", $s['cust_hello']) . ' ' . $name . ',',
        '',
        $s['cust_thanks'],
        '',
        $s['cust_your_config'] . ':',
        "  {$s['rozmery']}:      {$cfg_n['width']} × {$cfg_n['depth']} × {$cfg_n['height']} cm",
        "  {$s['plocha']}:       {$calc['area_m2']} m²",
        "  {$s['farba']}:        {$calc['color_label']}",
        "  {$s['strecha']}:      {$calc['roof_label']}",
        "  {$s['priehladnost']}: {$calc['trans_label']}",
        "  {$s['montaz']}:       " . ($cfg_n['mounting'] ? $s['yes'] : $s['no']),
        "  {$s['led']}:          " . ($cfg_n['led'] ? $s['yes'] : $s['no']),
        '',
        str_replace('\n', "\n", $s['cust_signature']),
    ];
    $customer_mail = luxurelax_pergola_send_mail(
        $email,
        $s['cust_subject'],
        implode("\n", $cust_lines),
        LUXURELAX_PERGOLA_FROM_EMAIL,
        LUXURELAX_PERGOLA_FROM_NAME
    );

    if ($post_id && !is_wp_error($post_id)) {
        update_post_meta($post_id, '_pergola_mail_status', [
            'admin' => $admin_mail,
            'customer' => $customer_mail,
            'sent_at' => current_time('mysql'),
        ]);
    }

    return new WP_REST_Response([
        'success' => true,
        'price'   => $calc['price'],
        'inquiry_id' => $post_id ?: null,
        'mail' => [
            'admin' => $admin_mail['sent'],
            'customer' => $customer_mail['sent'],
        ],
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

add_action('add_meta_boxes', function () {
    add_meta_box('luxurelax_pergola_mail_status', 'Stav e-mailov', function ($post) {
        $status = get_post_meta($post->ID, '_pergola_mail_status', true);
        if (!is_array($status)) {
            echo '<p>E-mail ešte nebol zaznamenaný pri tomto dopyte.</p>';
            return;
        }

        foreach (['admin' => 'LuxuRelax', 'customer' => 'Zákazník'] as $key => $label) {
            $mail = $status[$key] ?? ['sent' => false, 'error' => 'Neznámy stav'];
            $sent = !empty($mail['sent']);
            echo '<p><strong>' . esc_html($label) . ':</strong> ';
            echo $sent ? '<span style="color:#008a20">odoslané</span>' : '<span style="color:#b32d2e">neodoslané</span>';
            if (!$sent && !empty($mail['error'])) {
                echo '<br><small>' . esc_html($mail['error']) . '</small>';
            }
            echo '</p>';
        }

        if (!empty($status['sent_at'])) {
            echo '<p><small>Čas: ' . esc_html($status['sent_at']) . '</small></p>';
        }
    }, 'pergola_inquiry', 'side', 'high');
});

// =====================================================================
// 4) WooCommerce – zobrazenie konfigurácie a ceny v košíku/objednávke
// =====================================================================
add_filter('woocommerce_get_item_data', function ($item_data, $cart_item) {
    if (!empty($cart_item['pergola_config']) && is_array($cart_item['pergola_config'])) {
        foreach ($cart_item['pergola_config'] as $k => $v) {
            $item_data[] = ['key' => $k, 'value' => $v];
        }
    }
    return $item_data;
}, 10, 2);

add_action('woocommerce_checkout_create_order_line_item', function ($item, $cart_item_key, $values) {
    if (!empty($values['pergola_config']) && is_array($values['pergola_config'])) {
        foreach ($values['pergola_config'] as $k => $v) {
            $item->add_meta_data($k, $v, true);
        }
    }
    if (!empty($values['pergola_price'])) {
        $item->set_subtotal((float) $values['pergola_price']);
        $item->set_total((float) $values['pergola_price']);
    }
}, 10, 3);

// Premenovanie položky v košíku
add_filter('woocommerce_cart_item_name', function ($name, $cart_item, $cart_item_key) {
    if (!empty($cart_item['pergola_config'])) {
        $lang = luxurelax_pergola_normalize_lang($cart_item['pergola_lang'] ?? 'sk');
        $s = luxurelax_pergola_strings($lang);
        $path = $lang === 'hu' ? '/konfigurator-pergoly-hu/' : ($lang === 'en' ? '/pergola-configurator/' : '/konfigurator-pergoly/');
        return '<a href="' . esc_url(home_url($path)) . '">' . esc_html($s['cart_item_name']) . '</a>';
    }
    return $name;
}, 10, 3);

// Obrázok v košíku berieme z featured image produktu pergoly (nastav v adminovi WC).

// Aplikuj custom cenu na položku v košíku (musí byť globálny hook!)
add_action('woocommerce_before_calculate_totals', function ($cart) {
    if (is_admin() && !defined('DOING_AJAX')) return;
    if (!$cart || !is_object($cart)) return;
    foreach ($cart->get_cart() as $cart_item) {
        if (!empty($cart_item['pergola_price']) && isset($cart_item['data'])) {
            $cart_item['data']->set_price((float) $cart_item['pergola_price']);
        }
    }
}, 20, 1);

// Zachovaj custom dáta pri obnovení košíka zo session
add_filter('woocommerce_get_cart_item_from_session', function ($cart_item, $values) {
    if (!empty($values['pergola_config']))  $cart_item['pergola_config'] = $values['pergola_config'];
    if (!empty($values['pergola_price']))   $cart_item['pergola_price']  = $values['pergola_price'];
    if (!empty($values['pergola_lang']))    $cart_item['pergola_lang']   = $values['pergola_lang'];
    if (!empty($cart_item['pergola_price']) && isset($cart_item['data'])) {
        $cart_item['data']->set_price((float) $cart_item['pergola_price']);
    }
    return $cart_item;
}, 10, 2);

// =====================================================================
// 5) Add-to-cart endpoint
//     REST nemôže spoľahlivo nastaviť WC session cookie (CORS / iný origin),
//     preto uložíme konfiguráciu do transientu a vrátime redirect URL.
//     Pri otvorení URL prebehne klasický page load, kde sa session cookie
//     bezpečne nastaví a produkt sa pridá do košíka.
// =====================================================================
function luxurelax_pergola_handle_add_to_cart(WP_REST_Request $request) {
    if (!class_exists('WooCommerce')) {
        return new WP_REST_Response(['error' => 'WooCommerce is not active'], 500);
    }
    $product_id = (int) LUXURELAX_PERGOLA_PRODUCT_ID;
    if ($product_id <= 0) {
        return new WP_REST_Response(['error' => 'Product ID is not configured'], 500);
    }
    $product = wc_get_product($product_id);
    if (!$product) {
        return new WP_REST_Response(['error' => "Product #$product_id does not exist"], 500);
    }
    if (!$product->is_purchasable()) {
        return new WP_REST_Response([
            'error' => "Product #$product_id is not purchasable. Skontroluj: publikovaný stav, nastavená cena, skladom, typ = Simple/Variable.",
        ], 500);
    }

    $body = $request->get_json_params();
    if (!is_array($body)) {
        return new WP_REST_Response(['error' => 'Invalid payload'], 400);
    }

    $cfg  = $body['config'] ?? [];
    $lang = luxurelax_pergola_normalize_lang($body['lang'] ?? 'sk');
    $s    = luxurelax_pergola_strings($lang);
    $calc = luxurelax_pergola_calculate_price($cfg, $lang);
    $cfg_n = $calc['normalized'];

    $pergola_config = [
        $s['rozmery']      => "{$cfg_n['width']} × {$cfg_n['depth']} × {$cfg_n['height']} cm",
        $s['plocha']       => "{$calc['area_m2']} m²",
        $s['farba']        => $calc['color_label'],
        $s['strecha']      => $calc['roof_label'],
        $s['priehladnost'] => $calc['trans_label'],
        $s['stlpy']        => $calc['posts'] . '× ' . $s['stlp'] . ($calc['reinforcement'] ? ' + ' . $s['vystuha'] : ''),
        $s['montaz']       => $cfg_n['mounting'] ? $s['yes'] : $s['no'],
        $s['led']          => $cfg_n['led'] ? $s['yes'] : $s['no'],
    ];

    $token = wp_generate_password(20, false, false);
    set_transient('luxurelax_pergola_' . $token, [
        'product_id'     => $product_id,
        'pergola_config' => $pergola_config,
        'pergola_price'  => (float) $calc['price'],
        'pergola_lang'   => $lang,
    ], 30 * MINUTE_IN_SECONDS);

    $redirect_url = add_query_arg('luxurelax_pergola_add', $token, home_url('/'));

    return new WP_REST_Response([
        'success'      => true,
        'price'        => $calc['price'],
        'redirect_url' => $redirect_url,
        'cart_url'     => $redirect_url, // backwards compat
    ], 200);
}

// Spracovanie redirect tokenu – beží pri normálnom page load, takže WC session cookie sa nastaví správne.
add_action('template_redirect', function () {
    if (empty($_GET['luxurelax_pergola_add'])) return;
    if (!class_exists('WooCommerce') || !function_exists('WC')) return;

    $token = sanitize_text_field(wp_unslash($_GET['luxurelax_pergola_add']));
    $data  = get_transient('luxurelax_pergola_' . $token);
    $lang  = luxurelax_pergola_normalize_lang($data['pergola_lang'] ?? 'sk');
    $s     = luxurelax_pergola_strings($lang);
    if (!$data || empty($data['product_id'])) {
        wc_add_notice($s['expired'], 'error');
        wp_safe_redirect(wc_get_cart_url());
        exit;
    }
    delete_transient('luxurelax_pergola_' . $token);

    if (null === WC()->cart) WC()->initialize_cart();

    $cart_item_data = [
        'pergola_config' => $data['pergola_config'],
        'pergola_price'  => (float) $data['pergola_price'],
        'pergola_lang'   => $lang,
        'unique_key'     => md5(microtime() . wp_rand()),
    ];

    $added = WC()->cart->add_to_cart((int) $data['product_id'], 1, 0, [], $cart_item_data);
    if (!$added) {
        wc_add_notice($s['add_failed'], 'error');
    }
    wp_safe_redirect(wc_get_cart_url());
    exit;
}, 5);
