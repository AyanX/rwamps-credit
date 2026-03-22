import s from "./Services.module.scss";
import tractor from "../assets/tractor.png";
import salary from "../assets/salary.png";
import finance from "../assets/finance.png";
import agribusiness from "../assets/agrics.png";

const Services = () => (
  <section className={s.section}>
    <div className={s.inner}>
      <div className={`reveal ${s.header}`}>
        <div>
          <div className={s.tag}>What We Do</div>
          <h2 className={s.title}>
            Tailored Finance.<br />Transformative Impact.
          </h2>
          <div className={s.underline} />
        </div>
        <p className={s.headerDesc}>
          Discover Rwamps FC's innovative financial products and services, designed to support inclusive development and prosperity across Uganda's agricultural sector. financial products and services, designed to support inclusive development and prosperity across Uganda's agricultural sector.
        </p>
      </div>

      <div className={`reveal ${s.grid}`}>
        {/* Venture */}
        <div className={s.venture}>
          <div className={s.cardHeader}>
            <span className={s.emojiLg}><img style={{height:"24px", width:"24px", objectFit:"contain"}} src={salary} alt="Finance" /></span>
            <span className={s.arrow}>↗</span>
          </div>
          <div>
            <h3 className={`${s.cardTitle} ${s.cardTitleLg}`}>Venture Financing</h3>
            <p className={s.cardDesc}>Scalable funding for high-growth African businesses ready to expand operations across East Africa.</p>
            <span className={s.cardLink}>Apply Now →</span>
          </div>
        </div>

        {/* Agri */}
        <div className={s.agri}>
          <img src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Uganda agribusiness" />
          <div className={s.agriOverlay} />
          <div className={s.agriContent}>
             <span className={s.emojiLg}><img style={{height:"32px", marginLeft:"0.5rem", width:"32px", objectFit:"cover"}} src={agribusiness} alt="Agribusiness" /></span>
            <h3 className={s.cardTitleMd} style={{ color: 'white' }}>Agribusiness Financing</h3>
            <p className={s.cardDesc} style={{ color: 'rgba(255,255,255,0.7)' }}>Funding Africa's food security through smart investments in agribusiness.</p>
            <span className={s.cardLink} style={{ color: 'rgba(255,255,255,0.8)' }}>Learn More →</span>
          </div>
        </div>

        {/* Navy */}
        <div className={s.navyCard}>
          <div className={s.cardHeader}>
            <span className={s.emoji}>⚖️</span>
            <span className={s.arrow}>↗</span>
          </div>
          <div>
            <h3 className={`${s.cardTitle} ${s.cardTitleMd}`}>Trade & Asset Financing</h3>
            <p className={s.cardDesc}>Unlocking capital for businesses needing liquidity or equipment to grow.</p>
            <span className={s.cardLink}>Learn More →</span>
          </div>
        </div>

        {/* Growth */}
        <div className={s.growthCard}>
          <div className={s.cardHeader}>
            <span className={s.emoji}>📈</span>
            <span className={s.arrow}>↗</span>
          </div>
          <div>
            <h3 className={`${s.cardTitle} ${s.cardTitleMd}`}>Growth & Expansion Loans</h3>
            <p className={s.cardDesc}>Fast-growth capital solutions for businesses looking to scale operations across Uganda and East Africa.</p>
            <span className={s.cardLink}>Learn More →</span>
          </div>
        </div>

        {/* Impact */}
        <div className={s.impactCard}>
          <div className={s.cardHeader}>
            <span className={s.emoji}>♻️</span>
            <span className={s.arrow}>↗</span>
          </div>
          <div>
            <h3 className={`${s.cardTitle} ${s.cardTitleMd}`}>Impact & Sustainable Finance</h3>
            <p className={s.cardDesc}>Funding initiatives with a strong economic and social footprint.</p>
            <span className={s.cardLink}>Learn More →</span>
          </div>
        </div>

        {/* Equipment */}
        <div className={s.equipCard}>
          <div className={s.cardHeader}>
            <span className={s.emoji}><img style={{height:"20px", width:"20px", objectFit:"contain"}} src={tractor} alt="Tractor" /></span>
            <span className={s.arrow}>↗</span>
          </div>
          <div>
            <h3 className={`${s.cardTitle} ${s.cardTitleMd}`}>Equipment & Infrastructure Financing</h3>
            <p className={s.cardDesc}>Financing the tools and infrastructure that power Uganda's agricultural and industrial growth forward.</p>
            <span className={s.cardLink}>Learn More →</span>
          </div>
        </div>

        {/* Green */}
        <div className={s.greenCard}>
          <div className={s.cardHeader}>
            <span className={s.emoji}><img style={{height:"20px", width:"20px", objectFit:"contain"}} src={finance} alt="Green Finance" /></span>
            <span className={s.arrow}>↗</span>
          </div>
          <div>
            <h3 className={`${s.cardTitle} ${s.cardTitleMd}`}>Green Finance</h3>
            <p className={s.cardDesc}>Eco-aligned funding for climate-smart farming.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
