import { useData } from "@/context/DataContext";
import s from "./Stories.module.scss";

const Stories = () => {
  const { testimonies } = useData();
  if (!testimonies.length) return null;

  return (
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
          <div
            className={s.featured}
            style={{
              background: testimonies[0].card_color,
              color: testimonies[0].text_color || "#ffffff",
            }}
          >
            <div>
              <div className={s.featuredHeader}>
                <div className={s.quoteIcon}>"</div>
                <span
                  className={s.tagBadge}
                  style={{
                    color: testimonies[0].loan_purpose_text_color || "#ffffff",
                    borderColor: testimonies[0].loan_purpose_text_color || "#ffffff",
                  }}
                >
                  {testimonies[0].loan_purpose}
                </span>
              </div>
              <p className={`${s.quoteText} ${s.featuredQuote}`}>{testimonies[0].bio}</p>
            </div>
            <div className={s.author}>
              <div
                className={s.avatar}
                style={{
                  background: testimonies[0].initials_bg_color || testimonies[0].card_color,
                  color: testimonies[0].text_color || "#ffffff",
                }}
              >
                {testimonies[0].initials}
              </div>
              <div>
                <div className={`${s.authorName} ${s.featuredName}`}>{testimonies[0].name}</div>
                <div className={`${s.authorBiz} ${s.featuredBiz}`}>{testimonies[0].occupation}</div>
              </div>
            </div>
          </div>

          {testimonies.slice(1).map((story) => (
            <div
              key={story.id}
              className={s.card}
              style={{
                color: story.text_color || "#000000",
              }}
            >
              <div>
                <div className={s.cardHeader}>
                  <div className={s.quoteIconSm}>"</div>
                  <span
                    className={s.tagBadgeOutline}
                    style={{
                      color: story.loan_purpose_text_color || "#000000",
                      borderColor: story.loan_purpose_text_color || "#000000",
                    }}
                  >
                    {story.loan_purpose}
                  </span>
                </div>
                <p className={`${s.quoteText} ${s.normalQuote}`}>{story.bio}</p>
              </div>
              <div className={s.authorNormal}>
                <div
                  className={s.avatar}
                  style={{
                    background: story.initials_bg_color || story.card_color,
                    color: story.text_color || "#ffffff",
                  }}
                >
                  {story.initials}
                </div>
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
};

export default Stories;
