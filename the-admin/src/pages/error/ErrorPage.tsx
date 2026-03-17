// 404 error page
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className={styles.actions}>
          <Link to="/" className={styles.homeBtn}>
            <Home size={18} /> Go Home
          </Link>
          <button className={styles.backBtn} onClick={() => window.history.back()}>
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
