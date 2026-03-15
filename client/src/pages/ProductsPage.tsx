import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Wheat, Beef, Tractor, Building2, Briefcase, Package } from "lucide-react";
import { agriculturalFinanceProducts } from "@/data/siteData";
import s from "./ProductsPage.module.scss";

const iconMap: Record<string, React.ElementType> = { Wheat, Beef, Tractor, Building2, Briefcase, Package };

const ventureProducts = [
  { emoji: "🚀", title: "Venture Financing", desc: "Scalable funding for high-growth African businesses ready to expand operations." },
  { emoji: "📈", title: "Growth & Expansion Loans", desc: "Supporting enterprises looking to scale operations across East Africa." },
  { emoji: "⚖️", title: "Trade & Asset Financing", desc: "Unlocking capital for businesses needing liquidity or equipment to grow." },
  { emoji: "♻️", title: "Impact & Sustainable Finance", desc: "Funding ventures with a strong economic and social footprint." },
];

const ProductsPage = () => (
  <div className={s.page}>
    <Navbar />

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
          <a href="/contact" className={s.btnPrimary}>Apply Now →</a>
          <a href="#products" className={s.btnOutline}>View Products</a>
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
        {agriculturalFinanceProducts.map((product) => {
          const IconComp = iconMap[product.icon];
          return (
            <div key={product.id} className={`${s.productCard} ${s[product.bg_color]}`}>
              <div>
                <div className={s.cardIconWrap}>
                  {IconComp && <IconComp size={28} />}
                </div>
                <h3 className={s.cardTitle}>{product.title}</h3>
                <p className={s.cardDesc}>{product.content}</p>
                <ul className={s.featureList}>
                  {product.points.map((f) => (
                    <li key={f} className={s.featureItem}>
                      <span className={s.featureDot} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button className={s.applyLink}>
                Apply Now <ArrowRight className={s.arrowIcon} />
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
            <a href="/contact" className={s.ventureLink}>Apply Now →</a>
          </div>
        ))}
      </div>
    </section>

    <section className={s.cta}>
      <div className={s.ctaInner}>
        <h2>Ready to Grow Your Business?</h2>
        <p>Apply for a loan today and let us support your agricultural or business ambitions.</p>
        <div className={s.ctaButtons}>
          <a href="/contact" className={s.ctaBtnWhite}>Apply Now →</a>
          <a href="tel:+256779135953" className={s.ctaBtnOutline}>Call Us Today</a>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default ProductsPage;
