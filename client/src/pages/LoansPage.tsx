 
import { ArrowRight } from "lucide-react";
import { useData } from "@/context/DataContext";
import s from "./LoansPage.module.scss";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { LoansHelmet } from "@/helmet";
const whyChoose = [
  { icon: "🎯", title: "Tailored Solutions", desc: "A diverse range of loans designed to meet the unique needs of farmers, entrepreneurs, and families." },
  { icon: "📅", title: "Flexible Repayment", desc: "Loan durations that align with business and farming cycles, easing the repayment burden." },
  { icon: "💎", title: "Transparent Pricing", desc: "Transparent pricing with clear upfront costs and no hidden fees." },
  { icon: "⚡", title: "Easy Access", desc: "Fast approvals and digital loan management for maximum convenience." },
  { icon: "🤝", title: "Community-Focused", desc: "Deep local knowledge and a commitment to empowering communities across Uganda." },
];

type LoanCardData = {
  title: string;
  content: string;
  amount_start: string;
  amount_end: string;
  duration_start: string;
  duration_end: string;
  eligibility: string;
  bg_color: string;
  text_color: string;
};

const LoanCard = ({ card }: { card: LoanCardData }) => (
  <div
    className={s.loanCard}
    style={{
      backgroundColor: card.bg_color || "000000",
      color: card.text_color || "ffffff",
    }}
    data-bg={card.bg_color}
  >
    <div>
      <h3 className={s.loanCardTitle}>{card.title}</h3>
      <p className={s.loanCardDesc}>{card.content}</p>
      <div className={s.loanDetails}>
        <div className={s.loanDetail}>
          <span className={s.detailLabel}>Loan Amount:</span>
          <span className={s.detailValue}>{card.amount_start} – {card.amount_end}</span>
        </div>
        <div className={s.loanDetail}>
          <span className={s.detailLabel}>Duration:</span>
          <span className={s.detailValue}>{card.duration_start} – {card.duration_end}</span>
        </div>
        <div className={s.loanDetail}>
          <span className={s.detailLabel}>Upfront Fee:</span>
          <span className={s.detailValue}>4%</span>
        </div>
      </div>
      <div className={s.eligibility}>
        <strong>Eligibility:</strong> {card.eligibility}
      </div>
    </div>
    <Link to="/contact" className={s.applyLink}>
      Apply Now <ArrowRight className={s.arrowIcon} />
    </Link>
  </div>
);

const LoansPage = () => {
  const { loans } = useData();

  return (
    <>
    <LoansHelmet/>
    <div className={s.page}> 
      <section className={s.hero}>
        <img className={s.heroBgImg} src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Lush green agricultural field" loading="eager" />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <div className={s.heroBadge}>
            <span className={s.badgeDot} />
            Loan Products
          </div>
          <h1 className={s.heroTitle}>Transform Your<br /><span>Future.</span></h1>
          <p className={s.heroSubtitle}>Rwamps FC is committed to helping individuals, businesses, and farmers across Uganda achieve their dreams through affordable, flexible, and easy-to-access financing.</p>
          <div className={s.heroButtons}>
            <Link to="/contact" className={s.btnPrimary}>Apply for Loan →</Link>
            <HashLink smooth to="#loans" className={s.btnOutline}>Explore Loans</HashLink>
          </div>
        </div>
      </section>

      <div id="loans" className={s.loansWrapper}>
        {loans.map((section, i) => (
          <section key={i} className={s.loanSection}>
            <div className={s.loanInner}>
              <div className={s.loanSidebar}>
                <div className={s.sectionTag}>{section.title}</div>
                <h2 className={s.loanTitle}>{section["sub-title"]}</h2>
                <div className={s.underline} />
                <p className={s.loanDesc}>{section.content}</p>
              </div>
              <div>
                <div className={s.loanGrid}>
                  <LoanCard card={{
                    title: section.card_one_title,
                    content: section.card_one_content,
                    amount_start: section.card_one_loan_amount_start,
                    amount_end: section.card_one_loan_amount_end,
                    duration_start: section.card_one_duration_start,
                    duration_end: section.card_one_duration_end,
                    eligibility: section.card_one_eligibility,
                    bg_color: section.card_one_bg_color,
                    text_color: section.card_one_text_color,
                  }} />
                  <LoanCard card={{
                    title: section.card_two_title,
                    content: section.card_two_content,
                    amount_start: section.card_two_loan_amount_start,
                    amount_end: section.card_two_loan_amount_end,
                    duration_start: section.card_two_duration_start,
                    duration_end: section.card_two_duration_end,
                    eligibility: section.card_two_eligibility,
                    bg_color: section.card_two_bg_color,
                    text_color: section.card_two_text_color,
                  }} />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className={s.whySection}>
        <div className={s.sectionCenter}>
          <div className={s.sectionTag}>Why Choose Us</div>
          <h2 className={s.sectionTitle}>Why Rwamps FC?</h2>
          <div className={s.underlineCenter} />
        </div>
        <div className={s.whyGrid}>
          {whyChoose.map((item) => (
            <div key={item.title} className={s.whyCard}>
              <div className={s.whyEmoji}>{item.icon}</div>
              <h3 className={s.whyTitle}>{item.title}</h3>
              <p className={s.whyDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2>Ready to Get Started?</h2>
          <p>Apply for a loan today and let us support your journey to financial growth and prosperity.</p>
          <div className={s.ctaButtons}>
            <Link to="/contact" className={s.ctaBtnWhite}>Apply Now →</Link>
            <a href="tel:+256779135953" className={s.ctaBtnOutline}>Call Us Today</a>
          </div>
        </div>
      </section>
 
    </div></>
  );
};

export default LoansPage;
