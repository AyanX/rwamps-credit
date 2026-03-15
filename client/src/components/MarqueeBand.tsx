import s from "./MarqueeBand.module.scss";

const items = [
  "Venture Financing",
  "Growth & Expansion Loans",
  "Agribusiness Financing",
  "Trade & Asset Financing",
  "Impact & Sustainable Finance",
  "Equipment & Infrastructure",
];

const MarqueeBand = () => (
  <div className={s.band}>
    <div className={s.track}>
      {[...items, ...items].map((item, i) => (
        <span key={i} className={s.item}>
          <span className={s.dot} />
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBand;
