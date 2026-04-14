import { useData } from "@/context/DataContext";
import s from "./Hero.module.scss";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import heroBlur from "../assets/hero-home.jpeg"
import Loader from "./Loader";


const Hero = () => {
  const { stats } = useData();

  if (!stats) return <Loader />

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
    <section className={s.hero}>
      <img
        ref={imgRef}
        className={s.bgImg}
        src="https://ik.imagekit.io/59p9lo9mv/rwamps%20finance/herr.jpeg"
        alt="Lush green agricultural field"
        loading="eager"
        onLoad={handleImageLoad}
        style={{
          backgroundImage: imageLoaded ? 'none' : `url(${heroBlur})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.1s ease-out',
        }}
      />
      <div className={s.overlay} />

      <div className={s.content}>
        <div className={s.left}>
          <div className={s.badge}>
            <span className={s.badgeDot} />
            Uganda's Premier Agricultural Finance
          </div>

          <h1 className={s.title}>
            Crop<br />
            <span>Production</span><br />
            Loans.
          </h1>

          <p className={s.subtitle}>
            Empowering farmers and agricultural enterprises across Uganda with accessible, sustainable financing solutions to drive economic growth and food security.
          </p>

          <div className={s.buttons}>
            <Link to="/products" className={s.btnPrimary}>Explore Products →</Link>
            <Link to="/contact" className={s.btnOutline}>Contact Us</Link>
          </div>
          

          <div className={s.statsBar}>
            {[
              { num: `${stats?.loans_disbursed}${stats?.loans_disbursed_initials}+`, label: "Loans Disbursed" },
              { num: `${stats?.repayment_rate}%`, label: "Repayment Rate" },
              { num: `UGX ${stats?.total_disbursed}B+`, label: "Total Disbursed" },
              { num: `${stats?.locations_served}+`, label: "Districts Served" },
            ].map((stat) => (
              <div key={stat.label} className={s.stat}>
                <div className={s.statNum}>{stat.num}</div>
                <div className={s.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.right}>
          <div className={s.rightImage}>
            <img
              src="https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Farmer harvesting crops in Uganda"
            />
            <div className={s.rightImageOverlay} />
            <div className={s.rightImageContent}>
              <span className={s.featuredBadge}>Featured</span>
              <div className={s.featuredTitle}>{stats?.total_clients}+ Agribusiness Clients</div>
            </div>
          </div>

          <div className={s.rightCards}>
            <div className={s.rightCard}>
              <div className={s.rightCardNum}>{stats?.serving_hours}/{stats?.serving_days}</div>
              <div className={s.rightCardLabel}>Digital Support</div>
            </div>
            <div className={s.rightCard}>
              <div className={s.rightCardNum}>{`${stats?.active_users}${stats?.active_users_initials}+`}</div>
              <div className={s.rightCardLabel}>Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
