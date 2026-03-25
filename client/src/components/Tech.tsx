import s from "./Tech.module.scss";

const widgets = [
  { ico: "📱", title: "Mobile Access", desc: "Apply and manage loans from your phone, anytime, anywhere in Uganda." },
  { ico: "⚡", title: "Fast Processing", desc: "Loan decisions in hours, not weeks. Streamlined, fully digital workflow." },
  { ico: "🔐", title: "Secure Platform", desc: "Bank-grade security for all your data, transactions, and financial identity." },
  { ico: "📊", title: "Smart Analytics", desc: "Data-driven credit scoring that's fair and inclusive for every farmer." },
];

const Tech = () => (
  <section className={s.section}>
    <div className={s.inner}>
      <div className={s.grid}>
        <div className={`reveal ${s.textCol}`}>
          <div className={s.tag}>Technology</div>
          <h2 className={s.title}>Tech-Driven Finance for Every Farmer</h2>
          <div className={s.underline} />
          <p className={s.desc}>
            By leveraging mobile money, real-time loan processing and data-driven insights, Rwamps FC delivers financial services anywhere. Our tech stack fuels embedded financial services, offering access to finance through a cutting-edge digital-first approach while making it accessible to smallholder farmers across Uganda.
          </p>
        </div>

        <div className={`reveal ${s.widgets}`}>
          {widgets.map((w) => (
            <div key={w.title} className={s.widget}>
              <div className={s.widgetIcon}>{w.ico}</div>
              <h4 className={s.widgetTitle}>{w.title}</h4>
              <p className={s.widgetDesc}>{w.desc}</p>
            </div>
          ))}
          <div className={s.fullCard}>
            <div className={s.fullCardInner}>
              <div className={s.fullCardIcon}>✅</div>
              <div>
                <h4 className={s.fullCardTitle}>100% Digital Process</h4>
                <p className={s.fullCardDesc}>
                  From application to disbursement — fully paperless, fully connected. No branch visits required. Access your entire financial journey from your phone or computer, wherever you are in Uganda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Tech;
