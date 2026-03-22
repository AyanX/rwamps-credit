import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import s from "./Navbar.module.scss";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Our Products", to: "/products" },
  { label: "Loans", to: "/loans" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className={s.nav}>
      <div className={s.inner}>
        <Link to="/" className={s.logo}>
          <img
            src="https://ik.imagekit.io/59p9lo9mv/rwamps%20finance/ll.png"
            alt="Rwamps Credit Finance"
            className={s.logoImg}
          />
          <span className={s.logoText}>Rwamps <em>FC</em></span>
        </Link>
        <div className={s.links}>
          {navLinks.map((item) => (
            <Link key={item.label} to={item.to} className={s.link}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className={s.actions}>
          <Link to="/contact" className={s.cta}>
            Apply Now →
          </Link>
          <button className={s.hamburger} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className={s.mobileMenu}>
          {navLinks.map((item) => (
            <Link key={item.label} to={item.to} className={s.mobileLink} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link to="/contact" className={s.mobileCta} onClick={() => setOpen(false)}>
            Apply Now →
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
