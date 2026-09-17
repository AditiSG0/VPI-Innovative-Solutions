import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";

const address = '#13 P-A, “kSetra Tech Park”, KIADB 1st Main Road Phase-3, Koorgalli Industrial Area, Mysore, India - 570018.';
const mapSrc = 'https://www.google.com/maps?q=Ksetra+Tech+Park+Koorgalli+Industrial+Area+Mysore+570018&output=embed';

export default function Footer() {
  return (
    <footer className="site-footer site-footer-vpi page-pad" data-theme="black" data-testid="site-footer">
      <div className="footer-brand-panel">
        <Link to="/" className="footer-brand" aria-label="VPI Innovative Solutions home">
          <img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/vpi_logo_transparent_highres.png" alt="VPI Innovative Solutions" className="footer-logo-image" />
          <span>VPI Innovative Solutions</span>
        </Link>
      </div>

      <div className="footer-main-grid">
        <div className="footer-column">
          <span className="footer-kicker">ADDRESS</span>
          <p className="footer-address"><MapPin size={14} />{address}</p>
        </div>
        <div className="footer-column">
          <span className="footer-kicker">CONTACT US</span>
          <a href="tel:+919900911202"><Phone size={14} />+91 9900911202 (mob)</a>
          <a href="tel:08212411905"><Phone size={14} />0821 2411905 (ph)</a>
          <a href="mailto:vpisolutions@gmail.com"><Mail size={14} />vpisolutions@gmail.com</a>
          <a href="mailto:tech@vpisolutions.net"><Mail size={14} />tech@vpisolutions.net</a>
        </div>
        <div className="footer-column footer-sitemap">
          <span className="footer-kicker">SITEMAP</span>
          <Link to="/services">Services</Link>
          <Link to="/media">Media</Link>
          <Link to="/career">Career</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-map-card">
          <div className="footer-map-head"><span className="footer-kicker">LOCATION</span><a href="https://www.google.com/maps/search/?api=1&query=Ksetra+Tech+Park+Koorgalli+Industrial+Area+Mysore+570018" target="_blank" rel="noreferrer">OPEN MAP <ArrowUpRight size={13} /></a></div>
          <iframe title="VPI Innovative Solutions location" src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>

      <div className="footer-lower">
        <div className="make-in-india-card">
          <img src="/vpi/make-in-india.png" alt="Make in India" />
        </div>
        <div className="footer-socials">
          <span className="footer-kicker">FOLLOW VPI ON</span>
          <div>
            <a href="https://in.linkedin.com/company/vpi-innovative-solutions-mysore" target="_blank" rel="noreferrer" aria-label="VPI on LinkedIn">in</a>
            <a href="https://wa.me/919900911202" target="_blank" rel="noreferrer" aria-label="VPI on WhatsApp">wa</a>
          </div>
        </div>
      </div>

      <div className="footer-copyright"><span>SMW</span><span>|</span><span>Copyright©2025 VPI Innovative Solutions PVT. LTD. All rights reserved.</span></div>
    </footer>
  );
}
