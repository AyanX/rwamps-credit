import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Users, Clock, Shield, Lightbulb, Heart, Award } from "lucide-react";
import { siteStats, aboutMissionVision } from "@/data/siteData";
import s from "./AboutPage.module.scss";
import { Link } from "react-router-dom";

const values = [
  { icon: Users, title: "Team Work", desc: "Collaborative approach to solving financial challenges together." },
  { icon: Clock, title: "Responsiveness", desc: "Quick turnaround on applications and customer inquiries." },
  { icon: Shield, title: "Integrity", desc: "Transparent and ethical practices in all our dealings." },
  { icon: Lightbulb, title: "Innovativeness", desc: "Leveraging technology to deliver modern financial solutions." },
  { icon: Award, title: "Professionalism", desc: "Experienced team with deep understanding of client needs." },
  { icon: Heart, title: "Community Focus", desc: "Committed to uplifting the communities we serve." },
];

const reasons = [
  { icon: "⚡", title: "Fast Executions", desc: "We're committed to providing fast, quality executions with the highest level of transparency." },
  { icon: "🤝", title: "Guide & Support", desc: "We guide and support clients with a better customer service experience throughout their journey." },
  { icon: "🔒", title: "Financial Security", desc: "We seek consistent growth opportunities with strategic investments & partnerships." },
  { icon: "💰", title: "No Hidden Costs", desc: "We are aligned to the unique needs of our East African communities with transparent pricing." },
  { icon: "👥", title: "Dedicated Team", desc: "We have a dedicated team for financing and supporting small and medium-sized enterprises." },
  { icon: "🕐", title: "24/7 Available", desc: "We offer live chat and social media customer service 24 hours a day, 7 days a week." },
];

const AboutPage = () => (
  <div className={s.page}>
    <Navbar />

    {/* Hero */}
    <section className={s.hero}>
      <img className={s.heroBgImg} src="https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="African farmer in field" loading="eager" />
      <div className={s.heroOverlay} />
      <div className={s.heroContent}>
        <div className={s.heroBadge}>
          <span className={s.badgeDot} />
          About Us
        </div>
        <h1 className={s.heroTitle}>
          Your Financial<br />
          <span>Stress-Free</span><br />
          Partners.
        </h1>
        <p className={s.heroSubtitle}>
          Transforming the financial landscape for MSMEs and farmers in Western Uganda since inception.
        </p>
        <div className={s.heroButtons}>
          <Link to="/contact" className={s.btnPrimary}> Contact Us</Link>
          <a href="#about-content" className={s.btnOutline}>Learn More</a>
        </div>
        <div className={s.heroStats}>
          {[
            { num: siteStats.total_disbursed, label: "Total Disbursed" },
            { num: siteStats.loans_disbursed, label: "Loans Disbursed" },
            { num: siteStats.locations_served, label: "Districts Served" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div className={s.statNum}>{stat.num}</div>
              <div className={s.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* About Content */}
    <section id="about-content" className={s.aboutSection}>
      <div className={s.aboutInner}>
        <div className={s.aboutGrid}>
          <div>
            <div className={s.sectionTag}>Who We Are</div>
            <h2 className={s.sectionTitle}>Bridging the <span>Credit Gap</span></h2>
            <div className={s.underline} />
            <p className={s.text}>
              <strong className={s.textStrong}>Rwamps Credit Finance Ltd</strong> is a dynamic and innovative credit finance institution dedicated to transforming the financial landscape for micro, small and medium-sized enterprises (MSMEs) and farmers in Western Uganda.
            </p>
            <p className={s.text}>
              Established as a subsidiary of Rwamps Youth Farmers Group with a clear mission to bridge the credit gap and provide accessible and affordable financial solutions tailored to the unique needs of our target market.
            </p>
            <p className={s.text}>
              Our initial focus is on Western Uganda, a region characterized by its agricultural richness and great entrepreneurial spirit. By establishing a strong local presence, we address the specific financial challenges faced by MSMEs and farmers in this area.
            </p>
          </div>
          <div className={s.aboutImage}>
            <img src="https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg?auto=compress&cs=tinysrgb&w=800" alt="African farmer in field" />
            <div className={s.aboutImageOverlay}>
              <div className={s.overlayNum}>{siteStats.total_disbursed}</div>
              <div className={s.overlayLabel}>Total Loans Disbursed</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className={s.missionSection}>
      <div className={s.missionGrid}>
        <div className={`${s.missionCard} ${s.missionPrimary}`}>
          <div className={s.emoji}>🎯</div>
          <h3>{aboutMissionVision.mission.title}</h3>
          <p>{aboutMissionVision.mission.content}</p>
        </div>
        <div className={`${s.missionCard} ${s.missionNavy}`}>
          <div className={s.emoji}>🔭</div>
          <h3>{aboutMissionVision.vision.title}</h3>
          <p>{aboutMissionVision.vision.content}</p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className={s.valuesSection}>
      <div className={s.sectionHeader}>
        <div className={s.sectionTag}>Our Values</div>
        <h2 className={s.sectionTitle}>What Drives Us</h2>
        <div className={s.underline} />
      </div>
      <div className={s.masonry}>
        {values.map((v) => (
          <div key={v.title} className={s.valueCard}>
            <div className={s.valueIcon}>
              <v.icon style={{ width: "1.5rem", height: "1.5rem" }} />
            </div>
            <h3 className={s.valueTitle}>{v.title}</h3>
            <p className={s.valueDesc}>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Why Choose Us */}
    <section className={s.whySection}>
      <div className={s.sectionHeader}>
        <div className={s.sectionTag}>Why Us</div>
        <h2 className={s.sectionTitle}>Why People Choose Us</h2>
        <div className={s.underline} style={{ marginBottom: "1.5rem" }} />
        <p className={s.headerDesc}>
          Our strategy includes leveraging local knowledge to tailor our credit products, providing personalized customer service, and implementing robust risk management practices.
        </p>
      </div>
      <div className={s.masonry}>
        {reasons.map((r) => (
          <div key={r.title} className={s.whyCard}>
            <div className={s.whyEmoji}>{r.icon}</div>
            <h3 className={s.whyTitle}>{r.title}</h3>
            <p className={s.whyDesc}>{r.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className={s.cta}>
      <div className={s.ctaInner}>
        <h2>Ready to Start Your Journey?</h2>
        <p>Join thousands of farmers and entrepreneurs who trust Rwamps FC for their financial growth.</p>
        <button className={s.ctaBtn}>Apply Now →</button>
      </div>
    </section>

    <Footer />
  </div>
);

export default AboutPage;
