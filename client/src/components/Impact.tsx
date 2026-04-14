import { useData } from "@/context/DataContext";
import s from "./Impact.module.scss";
import team from "../assets/team.png";
import placeholder from "../assets/placeholder.png";
import woman from "../assets/woman.png";
import Loader from "./Loader";


const Impact = () => {
  const { stats } = useData();

  if (!stats) return <Loader />

  const statCards = [
    { ico: "🎯", num: `${stats?.total_clients}${stats?.total_clients_initials}`, label: "Farmers  Financed", variant: "cardPrimary" as const },
    { ico: "📊", num: `${stats?.repayment_rate}%`, label: "Loan Repayment Rate", variant: "cardNavy" as const },
    { ico: <img src={woman} alt="Woman" />, num: "45%", label: "Women Borrowers", variant: "cardSage" as const },
    { ico: <img src={team} alt="Team" />, num: `${stats?.active_users}${stats?.active_users_initials}+`, label: "Active users", variant: "cardOrange" as const },
    { ico: "💰", num: "12B+", label: "UGX Total Disbursed", variant: "cardLime" as const },
    { ico:<img src={placeholder} alt="Placeholder" />, num: `${stats?.locations_served}+`, label: "Districts Covered", variant: "cardSecondary" as const },
  ];

  return (
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
            {statCards.map((stat) => (
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
};

export default Impact;
