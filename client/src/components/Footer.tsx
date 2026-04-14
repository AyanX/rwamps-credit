import { Link } from "react-router-dom";
import { useData } from "@/context/DataContext";
import s from "./Footer.module.scss";
import Loader from "./Loader";
import location from "../assets/map.png";
import mail from "../assets/email.png";
import phone from "../assets/telephone.png";
import { Facebook, Twitter, Linkedin } from "lucide-react";
const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Our Products", to: "/products" },
  { label: "Loans", to: "/loans" },
  { label: "Contact", to: "/contact" },
];
const legalLinks = ["Privacy Policy", "Terms & Conditions", "Licenses", "Data Policy"];

const Footer = () => {
  const { footerSocials, contactInfo } = useData();

  if (!footerSocials) return <Loader />

  const socialItems = [
    { icon: <Twitter />, url: footerSocials?.twitter ?? "#" },
    { icon: <Linkedin />, url: footerSocials?.linkedin ?? "#" },
    { icon: <Facebook />, url: footerSocials?.facebook ?? "#" },
  ];

  return (
    <footer className={s.footer}>
      <div className={s.topBar} />

      <div className={s.inner}>
        <div className={s.grid}>
          <div>
            <Link to="/" className={s.logo}>
              <img
                src="https://ik.imagekit.io/59p9lo9mv/rwamps%20finance/ll.png"
                alt="Rwamps Credit Finance"
                className={s.logoImg}
              />
              <span>Rwamps <em>FC</em></span>
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
            <h4 className={s.colTitle}>Contact</h4>
            <ul className={s.contactList}>
              <li> <img src={location} alt="Location" className={s.contactIcon} /> {contactInfo?.address}</li>
              <li> <img src={phone} alt="Phone" className={s.contactIcon} /> {contactInfo?.phone}</li>
              <li> <img src={mail} alt="Email" className={s.contactIcon} /> {contactInfo?.email}</li>
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
              <Link key={l} to="#" className={s.legalLink}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
