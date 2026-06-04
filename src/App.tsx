import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Configurator from "./pages/Configurator";
import PergolaConfigurator from "./pages/PergolaConfigurator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/konfigurator" replace />} />
            <Route path="/konfigurator" element={<Configurator />} />
            <Route path="/konfigurator/pergoly" element={<PergolaConfigurator />} />
            <Route path="/konfigurator/pergoly-hu" element={<PergolaConfigurator />} />
            <Route path="/konfigurator/pergola-configurator" element={<PergolaConfigurator />} />
            <Route path="/konfigurator/:modelSlug" element={<Configurator />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/configurator/pergola" element={<PergolaConfigurator />} />
            <Route path="/configurator/:modelSlug" element={<Configurator />} />
            <Route path="/konfigurator-hu" element={<Configurator />} />
            <Route path="/konfigurator-hu/pergoly" element={<PergolaConfigurator />} />
            <Route path="/konfigurator-hu/:modelSlug" element={<Configurator />} />
            <Route path="/konfigurator-pergoly" element={<PergolaConfigurator />} />
            <Route path="/pergola-configurator" element={<PergolaConfigurator />} />
            <Route path="/konfigurator-pergoly-hu" element={<PergolaConfigurator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
