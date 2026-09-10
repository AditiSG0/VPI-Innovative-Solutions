import { useEffect, useState } from "react";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion";

const companyLinks = [["About us", "/about"], ["Management", "/management"], ["CSR", "/csr"], ["Company vision", "/vision"], ["Company history", "/history"], ["Why us", "/why-us"], ["R&D", "/rd"]];
const industryLinks = [["Automotive", "/industries/automotive"], ["Electronics", "/industries/electronics"], ["Robotics", "/industries/robotics"], ["Medical", "/industries/medical"], ["Die & mould", "/industries/die-mould"], ["Energy", "/industries/energy"], ["Food", "/industries/food"], ["Advanced critical R&D", "/industries/critical-rd"], ["Telecom", "/industries/telecom"]];

function Dropdown({ label, links, menuKey, openMenu, setOpenMenu }) {
  const isOpen = openMenu === menuKey;
  return <div className="nav-dropdown-wrap"><button className="nav-link" data-testid={`${menuKey}-menu-button`} onClick={() => setOpenMenu(isOpen ? null : menuKey)}>{label} <ChevronDown size={13} /></button>{isOpen && <div className={`nav-dropdown ${menuKey === "industries" ? "industries-dropdown" : ""}`} data-testid={`${menuKey}-menu`}><span className="dropdown-kicker">{menuKey === "company" ? "VPI / COMPANY" : "SECTORS / 09"}</span>{links.map(([item, path]) => <NavLink key={path} to={path} data-testid={`${menuKey}-link-${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</NavLink>)}</div>}</div>;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const closeMenus = () => { setMenuOpen(false); setOpenMenu(null); };
  const navLink = (label, path, id) => <NavLink className="nav-link" to={path} onClick={closeMenus} data-testid={id}>{label}</NavLink>;
  return <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} data-testid="site-header"><Link to="/" className="logo" data-testid="site-logo" aria-label="VPI Innovative Solutions home" onClick={closeMenus}><img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/vpi_logo_transparent_highres.png" alt="VPI Innovative Solutions" className="logo-img" /></Link><nav className={`main-nav ${menuOpen ? "is-open" : ""}`} data-testid="main-navigation"><Dropdown label="Company" links={companyLinks} menuKey="company" openMenu={openMenu} setOpenMenu={setOpenMenu} /><Dropdown label="Industries" links={industryLinks} menuKey="industries" openMenu={openMenu} setOpenMenu={setOpenMenu} />{navLink("Services", "/services", "services-nav-link")}{navLink("Products", "/products", "products-nav-link")}{navLink("Media", "/media", "media-nav-link")}{navLink("Career", "/career", "career-nav-link")}{navLink("Contact us", "/contact", "contact-nav-link")}</nav><Magnetic className="header-quote-wrap"><Button asChild data-testid="header-quote-button" className="quote-button header-quote"><Link to="/contact">GET INSTANT QUOTE <ArrowUpRight size={15} /></Link></Button></Magnetic><button className="mobile-trigger" data-testid="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button></header>;
}