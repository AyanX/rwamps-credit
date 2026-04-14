import { useData } from "@/context/DataContext";
import s from "./AgriBand.module.scss";
import Loader from "./Loader";

const AgriBand = () => {
  const { whatWeDo } = useData();

  if (whatWeDo.length === 0) return <Loader />

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <div className={`reveal ${s.grid}`}>
          {whatWeDo?.map((c, i) => (
            <div key={c?.id} className={`${s.card} ${i === 0 ? s.tall : ""}`}>
              <img
                src={c?.image}
                alt={c?.title}
                style={{ background: `url(${c?.blur_image}) center/cover no-repeat` }}
              />
              <div className={s.cardOverlay} />
              <div className={s.cardLabel}>
                <span className={s.labelBadge}>{c?.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgriBand;
