import { siteStats } from "@/data/siteData";
import s from "./Hero.module.scss";

const Hero = () => (
  <section className={s.hero}>
    <img
      className={s.bgImg}
      src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1920"
      alt="Lush green agricultural field"
      loading="eager"
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
          <button className={s.btnPrimary}>Get Started →</button>
          <button className={s.btnOutline}>Learn More</button>
        </div>

        <div className={s.statsBar}>
          {[
            { num: siteStats.loans_disbursed, label: "Loans Disbursed" },
            { num: siteStats.repayment_rate, label: "Repayment Rate" },
            { num: siteStats.total_disbursed, label: "Total Disbursed" },
            { num: siteStats.locations_served, label: "Districts Served" },
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
            <div className={s.featuredTitle}>{siteStats.total_clients}+ Agribusiness Clients</div>
          </div>
        </div>

        <div className={s.rightCards}>
          <div className={s.rightCard}>
            <div className={s.rightCardNum}>{siteStats.serving_hours}</div>
            <div className={s.rightCardLabel}>Digital Support</div>
          </div>
          <div className={s.rightCard}>
            <div className={s.rightCardNum}>{siteStats.active_users}</div>
            <div className={s.rightCardLabel}>Active Users</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
