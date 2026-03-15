import { agriBandCards } from "@/data/siteData";
import s from "./AgriBand.module.scss";

const AgriBand = () => (
  <section className={s.section}>
    <div className={s.inner}>
      <div className={`reveal ${s.grid}`}>
        {agriBandCards.map((c, i) => (
          <div key={c.id} className={`${s.card} ${i === 0 ? s.tall : ""}`}>
            <img src={c.image} alt={c.title} />
            <div className={s.cardOverlay} />
            <div className={s.cardLabel}>
              <span className={s.labelBadge}>{c.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AgriBand;
