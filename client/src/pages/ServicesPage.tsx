 
import { ArrowRight, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useData } from "@/context/DataContext";
import s from "./ServicesPage.module.scss";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";
import servicesBlur from "../assets/services-blur.jpg"
import { ServicesHelmet } from "@/helmet";

const ServicesPage = () => {
  const { services , branches} = useData();
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      setImageLoaded(true);
    }
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
    <ServicesHelmet/>
    <div className={s.page}> 
      <section className={s.hero}>
        <img 
          ref={imgRef}
          className={s.heroBgImg} 
          src="https://ik.imagekit.io/59p9lo9mv/rwamps%20finance/services.jpg" 
          alt="Business meeting" 
          loading="eager" 
          onLoad={handleImageLoad}
          style={{ 
            backgroundImage: imageLoaded ? 'none' : `url(${servicesBlur})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            opacity: imageLoaded ? 1 : 0, 
            transition: 'opacity 0.25s ease-out' 
          }}
        />
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
             <Link to="/contact" className={s.btnPrimary}>Get Started →</Link> 
            <HashLink smooth to="#services" className={s.btnOutline}>Explore Services</HashLink>
          </div>
        </div>
      </section>

      <section id="services" className={s.servicesSection}>
        <div className={s.servicesInner}>
          {services.map((service, i) => (
            <div key={service.id} className={i % 2 === 1 ? s.serviceRowReverse : s.serviceRow}>
              <div className={s.imageCol}>
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ background: service.blur_image ? `url(${service.blur_image}) center/cover no-repeat` : undefined }}
                />
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
                <button >
                  <HashLink smooth to="/contact" className={s.btnPrimary} >
                  Contact Us
                  <ArrowRight className={s.arrowIcon} />
                  </HashLink>
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
            <Link to="/contact" className={s.ctaBtnWhite}>Contact Us →</Link>
            <a href={`tel:${branches[0]?.phone_number}`} className={s.ctaBtnOutline}>Call {branches[0]?.phone_number}</a>
          </div>
        </div>
      </section>
 
    </div></>
  );
};

export default ServicesPage;
