import { useData } from "@/context/DataContext";
import s from "./Partners.module.scss";
import { Link } from "react-router-dom";

const Partners = () => {
  const { partners } = useData();

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={`reveal ${s.grid}`}>
          <div className={s.textCol}>
            <h2>Our Investors & Partners</h2>
            <p>Join a network of investors and financial institutions shaping Africa's future.</p>
            <Link to="/contact" className={s.btnPrimary}><button className={s.btn}>Become a Partner</button></Link>
          </div>

          <div className={s.logoGrid}>
            {partners.map((p) => (
              <div key={p.id} className={s.logoItem}>
                <span className={s.logoText}>{p.client}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
