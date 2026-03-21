// Forgot password — enter secret PIN
import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { PuffLoader } from 'react-spinners';
import styles from './ForgotPasswordPage.module.scss';

const ForgotPasswordPage = () => {
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // only allow numbers, 4-10 chars
  const isValid = /^\d{4,10}$/.test(pin);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setLoading(true);
    try {
      const res = await api.post.forgotPassword(pin);
      if (res.status === 200 && res.data?.token) {
        // store token temporarily for reset page
        sessionStorage.setItem('reset_token', res.data.token);
        toast.success(res.data?.message || 'PIN verified!');
        navigate('/reset-password');
      } else {
        toast.error(res.data?.message || 'Invalid PIN');
      }
    } catch  {
      toast.error( 'Request failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Forgot Password</h1>
        <p className={styles.subtitle}>Enter your secret PIN to reset your password.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Secret PIN (4-10 digits)</label>
            <input
              type="text"
              inputMode="numeric"
              pattern="\d*"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter your PIN"
              maxLength={10}
              minLength={4}
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={!isValid || loading}>
            {loading ? <PuffLoader size={22} color="#fff" /> : 'Verify PIN'}
          </button>
        </form>

        <Link to="/login" className={styles.backLink}>← Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
