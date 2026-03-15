import { siteStats } from "@/data/siteData";
import s from "./Impact.module.scss";

const stats = [
  { ico: "🎯", num: siteStats.loans_disbursed, label: "Farmers & Businesses Financed", variant: "cardPrimary" as const },
  { ico: "📊", num: siteStats.repayment_rate, label: "Loan Repayment Rate", variant: "cardNavy" as const },
  { ico: "👩‍🌾", num: "45%", label: "Women Borrowers", variant: "cardSage" as const },
  { ico: "🌾", num: siteStats.total_clients, label: "Agribusiness Enterprises", variant: "cardOrange" as const },
  { ico: "💰", num: "12B+", label: "UGX Total Disbursed", variant: "cardLime" as const },
  { ico: "📍", num: siteStats.locations_served, label: "Districts Covered", variant: "cardSecondary" as const },
];

const Impact = () => (
  <section className={s.section}>
    <div className={s.inner}>
      <div className="reveal">
        <div className={s.header}>
          <div>
            <div className={s.tagRow}>
              <span className={s.tagLine} />
              Our Impact
            </div>
            <h2 className={s.title}>
              Committed to<br /><em>Transforming</em> Lives.
            </h2>
            <div className={s.underline} />
          </div>
          <p className={s.headerDesc}>
            At Rwamps FC, we are committed to promoting financial inclusion among smallholder farmers and agricultural enterprises across Uganda and beyond.
          </p>
        </div>

        <div className={s.grid}>
          {stats.map((stat) => (
            <div key={stat.label} className={s[stat.variant]}>
              <div className={s.cardEmoji}>{stat.ico}</div>
              <div className={s.cardNum}>{stat.num}</div>
              <div className={s.cardLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Impact;
