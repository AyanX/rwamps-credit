import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { toast } from '../../components/Toast';
import { PuffLoader } from 'react-spinners';
import styles from './Login.module.scss';
import logo_blur from "../../assets/ll.png"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back!');
        navigate('/');
      } else {
        toast.error('Invalid credentials');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            {!logoLoaded && (
              <img
                style={{ width: '120px', height: 'auto', opacity: 0.5 }}
                src={logo_blur}
                alt="Loading logo"
                className={styles.logo}
              />
            )}
            <img
              style={{ width: '120px', height: 'auto', display: logoLoaded ? 'block' : 'none' }}
              src="https://ik.imagekit.io/59p9lo9mv/rwamps%20finance/ll.png"
              alt="Logo"
              className={styles.logo}
              onLoad={() => setLogoLoaded(true)}
            />
          </div>
          <p>Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Email</label>
            <div className={styles.inputWrap}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@rwampsfc.com"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Password</label>
            <div className={styles.inputWrap}>
              <Lock size={18} className={styles.inputIcon} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <PuffLoader size={22} color="#fff" /> : 'Sign In'}
          </button>

          <Link to="/forgot-password" className={styles.forgotLink}>Forgot Password?</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
