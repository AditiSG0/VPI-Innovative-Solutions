import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return <footer className="site-footer page-pad" data-theme="black" data-testid="site-footer"><Link to="/" className="logo" data-testid="footer-logo"><img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/vpi_logo_transparent_highres.png" alt="VPI Innovative Solutions" className="logo-img" /></Link><span>PRECISION EMPOWERED. INNOVATION DELIVERED.</span><Link to="/contact" className="footer-contact-link" data-testid="footer-contact-link">GET INSTANT QUOTE <ArrowUpRight size={13} /></Link><span>© 2025 VPI INNOVATIVE SOLUTIONS PVT. LTD.</span></footer>;
}