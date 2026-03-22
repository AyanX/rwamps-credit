import { useData } from "@/context/DataContext";
import s from "./Hero.module.scss";

const Hero = () => {
  const { stats } = useData();

  return (
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
              { num: `${stats?.loans_disbursed ?? "K+"}  ${stats?.loans_disbursed_initials ?? "K"   }+`, label: "Loans Disbursed" },
              { num: stats?.repayment_rate ? `${stats.repayment_rate}%` : "87%", label: "Repayment Rate" },
              { num: stats?.total_disbursed ? `UGX ${stats.total_disbursed}B+` : "UGX 12B+", label: "Total Disbursed" },
              { num: stats?.locations_served ? `${stats.locations_served}+` : "35+", label: "Districts Served" },
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
              <div className={s.featuredTitle}>{stats?.total_clients ?? "850"}+ Agribusiness Clients</div>
            </div>
          </div>

          <div className={s.rightCards}>
            <div className={s.rightCard}>
              <div className={s.rightCardNum}>{stats?.serving_hours ?? "24"}/{stats?.serving_days ?? "7"}</div>
              <div className={s.rightCardLabel}>Digital Support</div>
            </div>
            <div className={s.rightCard}>
              <div className={s.rightCardNum}>{`${stats?.active_users ?? "50"}${stats?.active_users_initials ?? "K"   }+`}</div>
              <div className={s.rightCardLabel}>Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
