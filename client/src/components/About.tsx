import { useData } from "@/context/DataContext";
import s from "./About.module.scss";



const About = () => {
  const { stats } = useData();

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={`reveal ${s.grid}`}>
          <div>
            <div className={s.tag}>Our Mission</div>
            <h2 className={s.title}>
              From Microfinance to <em>Venture Financing</em> in Africa
            </h2>
            <div className={s.underline} />
            <p className={s.text}>
              At the core of Rwamps FC's growth is an unwavering commitment to being part of the solution for our customers and the communities we serve. We provide accessible financing solutions that drive agricultural development and economic improvement across Uganda.
            </p>
            <p className={s.text}>
              Our innovative approach combines traditional microfinance with modern technology to reach farmers and enterprises across Uganda, supporting sustainable agriculture and inclusive growth.
            </p>
            <a href="#" className={s.link}>Discover Our Story →</a>
          </div>

          <div className={s.rightCol}>
            <div className={s.imageWrap}>
              <img
                src="https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="African farmer in field"
              />
              <div className={s.imageOverlay}>
                <div className={s.overlayNum}>{stats?.total_disbursed ? `UGX ${stats.total_disbursed}B+` : "UGX 12B+"}</div>
                <div className={s.overlayLabel}>Total Loans Disbursed</div>
              </div>
            </div>
            <div className={s.statsRow}>
              <div className={s.statCard}>
                <div className={s.statNum}>{stats?.locations_served ? `${stats.locations_served}+` : "35+"}</div>
                <div className={s.statLabel}>Districts served across Uganda</div>
              </div>
              <div className={s.statCard}>
                <div className={s.statNum}>{stats?.serving_hours ?? "24"}/{stats?.serving_days ?? "7"}</div>
                <div className={s.statLabel}>Digital support always on</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
