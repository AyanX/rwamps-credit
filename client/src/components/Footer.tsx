import { Link } from "react-router-dom";
import { footerSocials, contactInfo } from "@/data/siteData";
import s from "./Footer.module.scss";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Our Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];
const legalLinks = ["Privacy Policy", "Terms & Conditions", "Licenses", "Data Policy"];

const socialItems = [
  { icon: "𝕏", url: footerSocials.twitter },
  { icon: "in", url: footerSocials.linkedin },
  { icon: "f", url: footerSocials.facebook },
];

const Footer = () => (
  <footer className={s.footer}>
    <div className={s.topBar} />

    <div className={s.inner}>
      <div className={s.grid}>
        <div>
          <Link to="/" className={s.logo}>
            Rw<span>amps</span> FC
          </Link>
          <p className={s.desc}>
            Financing Africa's growth through accessible, innovative, and sustainable financial solutions that empower communities.
          </p>
          <div className={s.socials}>
            {socialItems.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className={s.socialIcon}>{item.icon}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className={s.colTitle}>Quick Links</h4>
          <ul className={s.linkList}>
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={s.linkItem}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={s.colTitle}>Legal</h4>
          <ul className={s.linkList}>
            {legalLinks.map((link) => (
              <li key={link}>
                <a href="#" className={s.linkItem}>{link}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={s.colTitle}>Contact</h4>
          <ul className={s.contactList}>
            <li>📍 {contactInfo.address}</li>
            <li>📞 {contactInfo.phone}</li>
            <li>✉️ {contactInfo.email}</li>
            <li>
              <Link to="/contact" className={s.applyLink}>Apply Now →</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className={s.bottom}>
      <div className={s.bottomInner}>
        <p className={s.copyright}>
          © 2026 Rwamps Credit Finance Limited. All rights reserved.
        </p>
        <div className={s.legalLinks}>
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a key={l} href="#" className={s.legalLink}>{l}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
