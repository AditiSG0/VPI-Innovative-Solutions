import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "@/App.css";
import SiteLayout from "@/components/SiteLayout";
import {
  AboutPage, ArticlePage, AutomotivePage, CareerPage, CNCColletChucksPage, ContactPage, CriticalRDPage, CSRPage,
  DieMouldPage, ElectronicsPage, EnergyPage, FoodPage, HistoryPage, HomePage, ManagementPage, MedicalPage,
  MediaPage, ProductsPage, QuickChangeColletsPage, RDPage, RevolvingCentresPage, RoboticsPage, ServicesPage, TelecomPage, VisionPage, WhyUsPage,
} from "@/pages/SitePages";

function App() {
  return <div className="site-shell"><Toaster position="bottom-right" theme="dark" /><BrowserRouter><Routes><Route element={<SiteLayout />}><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/management" element={<ManagementPage />} /><Route path="/csr" element={<CSRPage />} /><Route path="/vision" element={<VisionPage />} /><Route path="/history" element={<HistoryPage />} /><Route path="/why-us" element={<WhyUsPage />} /><Route path="/rd" element={<RDPage />} /><Route path="/industries/automotive" element={<AutomotivePage />} /><Route path="/industries/electronics" element={<ElectronicsPage />} /><Route path="/industries/robotics" element={<RoboticsPage />} /><Route path="/industries/medical" element={<MedicalPage />} /><Route path="/industries/die-mould" element={<DieMouldPage />} /><Route path="/industries/energy" element={<EnergyPage />} /><Route path="/industries/food" element={<FoodPage />} /><Route path="/industries/critical-rd" element={<CriticalRDPage />} /><Route path="/industries/telecom" element={<TelecomPage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/products" element={<ProductsPage />} /><Route path="/products/cnc-collet-chucks" element={<CNCColletChucksPage />} /><Route path="/products/revolving-centres" element={<RevolvingCentresPage />} /><Route path="/products/quick-change-collets" element={<QuickChangeColletsPage />} /><Route path="/media" element={<MediaPage />} /><Route path="/media/:slug" element={<ArticlePage />} /><Route path="/career" element={<CareerPage />} /><Route path="/contact" element={<ContactPage />} /></Route></Routes></BrowserRouter></div>;
}

export default App;