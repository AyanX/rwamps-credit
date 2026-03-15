import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Check } from "lucide-react";
import { servicesData } from "@/data/siteData";
import s from "./ServicesPage.module.scss";

const ServicesPage = () => (
  <div className={s.page}>
    <Navbar />

    <section className={s.hero}>
      <img className={s.heroBgImg} src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Business meeting" loading="eager" />
      <div className={s.heroOverlay} />
      <div className={s.heroContent}>
        <div className={s.heroBadge}>
          <span className={s.badgeDot} />
          Our Services
        </div>
        <h1 className={s.heroTitle}>
          Forex & Money<br />
          <span>Remittance.</span>
        </h1>
        <p className={s.heroSubtitle}>
          Comprehensive financial services including foreign exchange, money transfers, mobile money, and agent banking — all under one roof.
        </p>
        <div className={s.heroButtons}>
          <a href="/contact" className={s.btnPrimary}>Get Started →</a>
          <a href="#services" className={s.btnOutline}>Explore Services</a>
        </div>
      </div>
    </section>

    <section id="services" className={s.servicesSection}>
      <div className={s.servicesInner}>
        {servicesData.map((service, i) => (
          <div key={service.id} className={i % 2 === 1 ? s.serviceRowReverse : s.serviceRow}>
            <div className={s.imageCol}>
              <img src={service.image} alt={service.title} />
            </div>
            <div className={s.textCol}>
              <h2 className={s.serviceTitle}>{service.title}</h2>
              <div className={s.underline} />
              <p className={s.serviceDesc}>{service.content}</p>
              <div className={s.featuresGrid}>
                {service.points.map((f) => (
                  <div key={f} className={s.feature}>
                    <Check className={s.checkIcon} />
                    {f}
                  </div>
                ))}
              </div>
              <button className={s.serviceBtn}>
                Learn More <ArrowRight style={{ width: "1rem", height: "1rem" }} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className={s.cta}>
      <div className={s.ctaInner}>
        <h2>Need Our Services?</h2>
        <p>Visit any of our branches or contact us to get started with our financial services.</p>
        <div className={s.ctaButtons}>
          <a href="/contact" className={s.ctaBtnWhite}>Contact Us →</a>
          <a href="tel:+256779135953" className={s.ctaBtnOutline}>Call +256 779 135 953</a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ServicesPage;
