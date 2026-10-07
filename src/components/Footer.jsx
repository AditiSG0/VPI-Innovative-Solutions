import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";


export default function Footer() {
  return (
    <footer className="site-footer site-footer-vpi page-pad" data-theme="black" data-testid="site-footer">
      <div className="footer-vision-panel footer-compact-brand">
        <div>
          <span className="footer-kicker">VPI INNOVATIVE SOLUTIONS</span>
          <p>Precision engineering, CNC machining and manufacturing solutions built for demanding applications.</p>
        </div>
        <Link to="/" className="footer-brand" aria-label="VPI Innovative Solutions home">
          <img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/vpi_logo_transparent_highres.png" alt="VPI Innovative Solutions" className="footer-logo-image" />
        </Link>
      </div>
      <div className="footer-main-grid">
        <div className="footer-column">
          <span className="footer-kicker">CONTACT</span>
          <a href="tel:+919900911202"><Phone size={14} />+91 9900911202</a>
          <a href="tel:08212411905"><Phone size={14} />0821 2411905</a>
          <a href="mailto:vpisolutions@gmail.com"><Mail size={14} />vpisolutions@gmail.com</a>
          <a href="mailto:tech@vpisolutions.net"><Mail size={14} />tech@vpisolutions.net</a>
        </div>
        <div className="footer-column footer-sitemap">
          <span className="footer-kicker">COMPANY</span>
          <Link to="/about">About Us</Link><Link to="/management">Management</Link><Link to="/csr">CSR</Link><Link to="/vision">Company Vision</Link><Link to="/history">Company History</Link><Link to="/why-us">Why Us</Link><Link to="/rd">R&amp;D</Link>
        </div>
        <div className="footer-column footer-sitemap">
          <span className="footer-kicker">EXPLORE</span>
          <Link to="/industries">Industries</Link><Link to="/services">Services</Link><Link to="/products">Products</Link><Link to="/media">Media</Link><Link to="/career">Career</Link><Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-column footer-note">
          <span className="footer-kicker">PRECISION / INNOVATION / QUALITY</span>
          <p>Built around precision manufacturing, technical expertise and dependable customer support.</p>
        </div>
      </div>
      <div className="footer-lower">
        <div className="make-in-india-card"><img src="/vpi/make-in-india.png" alt="Make in India" /></div>
        <div className="footer-socials"><span className="footer-kicker">FOLLOW VPI ON</span><div><a href="https://in.linkedin.com/company/vpi-innovative-solutions-mysore" target="_blank" rel="noreferrer" aria-label="VPI on LinkedIn">in</a><a href="https://wa.me/919900911202" target="_blank" rel="noreferrer" aria-label="VPI on WhatsApp">wa</a></div></div>
      </div>
      <div className="footer-copyright"><span>VPI</span><span>|</span><span>Copyright©2025 VPI Innovative Solutions PVT. LTD. All rights reserved.</span></div>
    </footer>
  );
}
