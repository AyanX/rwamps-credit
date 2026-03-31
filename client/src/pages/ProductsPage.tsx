 
import { ArrowRight, Wheat, Beef, Tractor, Building2, Briefcase, Package } from "lucide-react";
import { useData } from "@/context/DataContext";
import s from "./ProductsPage.module.scss";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';
import { ProductsHelmet } from "@/helmet";
const iconMap: Record<string, React.ElementType> = { Wheat, Beef, Tractor, Building2, Briefcase, Package };

const ventureProducts = [
  { emoji: "🚀", title: "Venture Financing", desc: "Scalable funding for high-growth African businesses ready to expand operations." },
  { emoji: "📈", title: "Growth & Expansion Loans", desc: "Supporting enterprises looking to scale operations across East Africa." },
  { emoji: "⚖️", title: "Trade & Asset Financing", desc: "Unlocking capital for businesses needing liquidity or equipment to grow." },
  { emoji: "♻️", title: "Impact & Sustainable Finance", desc: "Funding ventures with a strong economic and social footprint." },
];

const ProductsPage = () => {
  const { products } = useData();

  return (
    <>
    <ProductsHelmet/>
    <div className={s.page}> 
      <section className={s.hero}>
        <img className={s.heroBgImg} src="https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Agricultural landscape" loading="eager" />
        <div className={s.heroOverlay} />
        <div className={s.heroContent}>
          <div className={s.heroBadge}>
            <span className={s.badgeDot} />
            Our Products
          </div>
          <h1 className={s.heroTitle}>Agricultural<br /><span>Loan Products.</span></h1>
          <p className={s.heroSubtitle}>Comprehensive financing solutions designed specifically for Uganda's agricultural sector and growing enterprises.</p>
          <div className={s.heroButtons}>
            <Link to="/contact" className={s.btnPrimary}>Apply Now →</Link>
            <HashLink smooth to="#products" className={s.btnOutline}>View Products</HashLink>
          </div>
        </div>
      </section>

      <section id="products" className={s.agriSection}>
        <div className={s.sectionHeader}>
          <div className={s.sectionTag}>Agricultural Finance</div>
          <h2 className={s.sectionTitle}>Farm & Agri Loans</h2>
          <div className={s.underline} />
        </div>
        <div className={s.masonry}>
          {products.map((product) => {
            const IconComp = iconMap[product.icon];
            const textColor = product.text_color || "#ffffff";
            const iconColor = "#ffffff";

            return (
              <div
                key={product.id}
                className={s.productCard}
                style={{
                  backgroundColor: product.bg_color?.startsWith("#") || product.bg_color?.startsWith("hsl") || product.bg_color?.startsWith("rgb") ? product.bg_color : undefined,
                  color: textColor,
                }}
                data-bg={product.bg_color}
              >
                <div>
                  <div className={s.cardIconWrap}>
                    {IconComp && <IconComp size={28} color={iconColor} />}
                  </div>
                  <h3 className={s.cardTitle} style={{ color: textColor }}>{product.title}</h3>
                  <p className={s.cardDesc} style={{ color: textColor }}>{product.content}</p>
                  <ul className={s.featureList}>
                    {product.points.map((f) => (
                      <li key={f} className={s.featureItem} style={{ color: textColor }}>
                        <span className={s.featureDot} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={s.applyLink} style={{ color: textColor }}>
                  Apply Now <ArrowRight className={s.arrowIcon} color={textColor} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className={s.ventureSection}>
        <div className={s.sectionHeader}>
          <div className={s.sectionTag}>Enterprise Finance</div>
          <h2 className={s.sectionTitle}>Venture & Growth Products</h2>
          <div className={s.underline} />
        </div>
        <div className={s.masonryTwo}>
          {ventureProducts.map((vp) => (
            <div key={vp.title} className={s.ventureCard}>
              <div className={s.ventureHeader}>
                <div className={s.ventureEmoji}>{vp.emoji}</div>
                <ArrowRight className={s.ventureArrow} />
              </div>
              <h3 className={s.ventureTitle}>{vp.title}</h3>
              <p className={s.ventureDesc}>{vp.desc}</p>
              <Link to="/contact" className={s.ventureLink}>Apply Now →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2>Ready to Grow Your Business?</h2>
          <p>Apply for a loan today and let us support your agricultural or business ambitions.</p>
          <div className={s.ctaButtons}>
            <Link to="/contact" className={s.ctaBtnWhite}>Apply Now →</Link>
            <a href="tel:+256779135953" className={s.ctaBtnOutline}>Call Us Today</a>
          </div>
        </div>
      </section>

    </div></>
  );
};

export default ProductsPage;
