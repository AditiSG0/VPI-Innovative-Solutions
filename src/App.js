import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "@/App.css";
import SiteLayout from "@/components/SiteLayout";
import React from "react";
import {
  AboutPage, ArticlePage, AutomotivePage, CareerPage, CompanyPage, CNCColletChucksPage, ContactPage, CSRPage,
  ElectronicsPage, HistoryPage, HomePage, ManagementPage, MedicalPage, IndustriesPage,
  MediaPage, ProductsPage, QuickChangeColletsPage, RDPage, RevolvingCentresPage, RoboticsPage, ServicesPage, VisionPage, WhyUsPage, AerospacePage,
} from "@/pages/SitePages";

class RouteErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  render() {
    if (this.state.hasError) {
      return <div className="route-error"><span className="eyebrow">VPI / PAGE ERROR</span><h1>This page could not be displayed.</h1><p>Please return to the homepage and open the section again. If this message appears, the browser console will contain the exact technical error.</p><a href="/">RETURN HOME</a></div>;
    }
    return this.props.children;
  }
}

function App() {
  return <div className="site-shell"><Toaster position="bottom-right" theme="dark" /><BrowserRouter><RouteErrorBoundary><Routes><Route element={<SiteLayout />}><Route path="/" element={<HomePage />} /><Route path="/company" element={<CompanyPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/about-us" element={<AboutPage />} /><Route path="/management" element={<ManagementPage />} /><Route path="/management-2" element={<ManagementPage />} /><Route path="/management-2/" element={<ManagementPage />} /><Route path="/csr" element={<CSRPage />} /><Route path="/corporate-social-responsibility" element={<CSRPage />} /><Route path="/vision" element={<VisionPage />} /><Route path="/company-vision" element={<VisionPage />} /><Route path="/history" element={<HistoryPage />} /><Route path="/company-history" element={<HistoryPage />} /><Route path="/why-us" element={<WhyUsPage />} /><Route path="/rd" element={<RDPage />} /><Route path="/industries" element={<IndustriesPage />} /><Route path="/industries/automotive" element={<AutomotivePage />} /><Route path="/automotive-industry" element={<AutomotivePage />} /><Route path="/industries/electronics" element={<ElectronicsPage />} /><Route path="/industries/robotics" element={<RoboticsPage />} /><Route path="/industries/medical" element={<MedicalPage />} /><Route path="/medical-industry" element={<MedicalPage />} /><Route path="/aerospace-industry" element={<AerospacePage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/products" element={<ProductsPage />} /><Route path="/products/cnc-collet-chucks" element={<CNCColletChucksPage />} /><Route path="/products/revolving-centres" element={<RevolvingCentresPage />} /><Route path="/products/quick-change-collets" element={<QuickChangeColletsPage />} /><Route path="/media" element={<MediaPage />} /><Route path="/media/:slug" element={<ArticlePage />} /><Route path="/career" element={<CareerPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/contact-us" element={<ContactPage />} /></Route></Routes></RouteErrorBoundary></BrowserRouter></div>;
}

export default App;