import { testimonies } from "@/data/siteData";
import s from "./Stories.module.scss";

const Stories = () => (
  <section className={s.section}>
    <div className={s.inner}>
      <div className={`reveal ${s.header}`}>
        <div>
          <div className={s.tag}>Success Stories</div>
          <h2 className={s.title}>
            Real People.<br />Real Impact.
          </h2>
        </div>
        <a href="#" className={s.viewAll}>View All Stories →</a>
      </div>

      <div className={`reveal ${s.grid}`}>
        {/* Featured */}
        <div className={s.featured}>
          <div>
            <div className={s.featuredHeader}>
              <div className={s.quoteIcon}>"</div>
              <span className={s.tagBadge}>{testimonies[0].loan_purpose}</span>
            </div>
            <p className={`${s.quoteText} ${s.featuredQuote}`}>{testimonies[0].bio}</p>
          </div>
          <div className={s.author}>
            <div className={s.avatar} style={{ background: testimonies[0].card_color }}>{testimonies[0].initials}</div>
            <div>
              <div className={`${s.authorName} ${s.featuredName}`}>{testimonies[0].name}</div>
              <div className={`${s.authorBiz} ${s.featuredBiz}`}>{testimonies[0].occupation}</div>
            </div>
          </div>
        </div>

        {/* Rest */}
        {testimonies.slice(1).map((story) => (
          <div key={story.id} className={s.card}>
            <div>
              <div className={s.cardHeader}>
                <div className={s.quoteIconSm}>"</div>
                <span className={s.tagBadgeOutline}>{story.loan_purpose}</span>
              </div>
              <p className={`${s.quoteText} ${s.normalQuote}`}>{story.bio}</p>
            </div>
            <div className={s.authorNormal}>
              <div className={s.avatar} style={{ background: story.card_color }}>{story.initials}</div>
              <div>
                <div className={`${s.authorName} ${s.normalName}`}>{story.name}</div>
                <div className={`${s.authorBiz} ${s.normalBiz}`}>{story.occupation}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stories;
