// Homepage admin — composed from section components
import { useData } from '../../context/DataContext';
import SkeletonLoader from '../../components/SkeletonLoader';
import StatsSection from './components/StatsSection/StatsSection';
import WhatWeDoSection from './components/WhatWeDoSection/WhatWeDoSection';
import TestimoniesSection from './components/TestimoniesSection/TestimoniesSection';
import PartnersSection from './components/PartnersSection/PartnersSection';
import FooterSocialsSection from './components/FooterSocialsSection/FooterSocialsSection';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { dataLoading } = useData();

  if (dataLoading) return <SkeletonLoader count={4} height="200px" />;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Homepage Management</h1>
      <p className={styles.pageDescription}>Manage hero stats, what we do cards, testimonies, partners, and social links.</p>

      <StatsSection />
      <WhatWeDoSection />
      <TestimoniesSection />
      <PartnersSection />
      <FooterSocialsSection />
    </div>
  );
};

export default HomePage;
