import { Link } from "react-router-dom";

export default function Footer() {
  return <footer className="site-footer page-pad" data-theme="black" data-testid="site-footer">
    <Link to="/" className="logo" data-testid="footer-logo"><img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/vpi_logo_transparent_highres.png" alt="VPI Innovative Solutions" className="logo-img" /></Link>
    <div><span>OUR VISION</span><p>We empower industries with smart, sustainable, and forward-thinking solutions.</p></div>
    <div><span>ADDRESS</span><p>#13 P-A, “kSetra Tech Park”, KIADB 1ST Main Road Phase-3, Koorgalli Industrial Area, Mysore, India - 570018.</p></div>
    <div><span>CONTACT US</span><p>‪+91 9900911202‬<br />0821 2411905<br />vpisolutions@gmail.com<br />tech@vpisolutions.net</p></div>
    <span>SMW | Copyright©2025 VPI Innovative Solutions PVT. LTD. All rights reserved.</span>
  </footer>;
}
