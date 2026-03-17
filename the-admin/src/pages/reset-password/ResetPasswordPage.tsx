// Reset password — set new password after PIN verification
import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { PuffLoader } from 'react-spinners';
import styles from './ResetPasswordPage.module.scss';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('reset_token');
    if (!storedToken) {
      toast.error('No reset token found. Please verify your PIN first.');
      navigate('/forgot-password');
      return;
    }
    setToken(storedToken);
  }, [navigate]);

  const passwordsMatch = password.length >= 6 && password === confirmPassword;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) return;

    setLoading(true);
    try {
      const res = await api.post.resetPassword({ password, new_password: confirmPassword, token });
      if (res.status === 200) {
        sessionStorage.removeItem('reset_token');
        toast.success(res.data?.message || 'Password reset successfully!');
        navigate('/login');
      } else {
        toast.error(res.data?.message || 'Reset failed');
      }
    } catch {
      toast.error('Request failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Reset Password</h1>
        <p className={styles.subtitle}>Enter your new password below.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" minLength={6} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Must match" required />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={!passwordsMatch || loading}>
            {loading ? <PuffLoader size={22} color="#fff" /> : 'Reset Password'}
          </button>
        </form>

        <Link to="/login" className={styles.backLink}>← Back to Login</Link>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
