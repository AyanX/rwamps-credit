// Settings admin — change username, email, password, and PIN
import { useState, useEffect, type FormEvent } from 'react';
import { useData } from '../../context/DataContext';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { Eye, EyeOff } from 'lucide-react';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  const { settingsEmail, setSettingsEmail, settingsUsername, setSettingsUsername, dataLoading } = useData();

  // username
  const [username, setUsername] = useState('');
  const [usernameSaving, setUsernameSaving] = useState(false);

  // email
  const [email, setEmail] = useState('');
  const [emailSaving, setEmailSaving] = useState(false);

  // password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);

  // PIN
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinSaving, setPinSaving] = useState(false);
  const [showPin, setShowPin] = useState(false);

  useEffect(() => { setUsername(settingsUsername); }, [settingsUsername]);

  // fetch email on mount
  useEffect(() => {
    api.get.email().then((res) => {
      if (res.data?.email) {
        setEmail(res.data.email);
      }
    }).catch(() => {});
  }, []);

  const saveUsername = async (e: FormEvent) => {
    e.preventDefault();
    setUsernameSaving(true);
    try {
      const res = await api.put.settings({ username });
      setSettingsUsername(res.data?.username || username);
      toast.success(res.data?.message || 'Username updated!');
    } catch {
      toast.error('Failed to update username');
    } finally {
      setUsernameSaving(false);
    }
  };

  const saveEmail = async (e: FormEvent) => {
    e.preventDefault();
    setEmailSaving(true);
    try {
      const res = await api.post.email({ email });
      if (res.data?.email) {
        setEmail(res.data.email);
      }
      toast.success(res.data?.message || 'Email updated!');
    } catch {
      toast.error('Failed to update email');
    } finally {
      setEmailSaving(false);
    }
  };

  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6 || newPassword.length > 20) {
      toast.error('Password must be 6-20 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      console.log(` new pass :  ${newPassword} vs confirm : ${confirmPassword}`);
      toast.error('Passwords do not match');
      return;
    }
    setPasswordSaving(true);
    try {
      const res = await api.put.password({ current_password: currentPassword, new_password: newPassword });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success(res.data?.message || 'Password updated!');
    } catch {
      toast.error('Failed to update password');
    } finally {
      setPasswordSaving(false);
    }
  };

  const savePin = async (e: FormEvent) => {
    e.preventDefault();
    if (!/^\d{4,10}$/.test(currentPin)) {
      toast.error('Current PIN must be 4-10 digits');
      return;
    }
    if (!/^\d{4,10}$/.test(newPin)) {
      toast.error('New PIN must be 4-10 digits');
      return;
    }
    if (!/^\d{4,10}$/.test(confirmPin)) {
      toast.error('Confirm PIN must be 4-10 digits');
      return;
    }
    if (newPin !== confirmPin) {
      toast.error('PINs do not match');
      return;
    }
    setPinSaving(true);
    try {
      const res = await api.put.pin({ current_pin: currentPin, new_pin: newPin });
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      toast.success(res.data?.message || 'PIN updated!');
    } catch {
      toast.error('Failed to update PIN');
    } finally {
      setPinSaving(false);
    }
  };

  if (dataLoading) return <SkeletonLoader count={1} height="300px" />;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Settings</h1>
      <p className={styles.pageDescription}>Manage your account credentials and security settings.</p>

      {/* Username */}
      <div className={styles.card}>
        <h2>Username</h2>
        <form onSubmit={saveUsername} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <button type="submit" className={styles.saveBtn} disabled={usernameSaving}>
            {usernameSaving ? 'Saving...' : 'Update Username'}
          </button>
        </form>
      </div>

      {/* Email */}
      <div className={styles.card}>
        <h2>Login Email</h2>
        <form onSubmit={saveEmail} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button type="submit" className={styles.saveBtn} disabled={emailSaving}>
            {emailSaving ? 'Saving...' : 'Update Email'}
          </button>
        </form>
      </div>

      {/* Password */}
      <div className={styles.card}>
        <h2>Change Password</h2>
        <form onSubmit={savePassword} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Current Password</label>
            <input type="password" placeholder='******' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>New Password (6-20 chars)</label>
            <input type="password" placeholder='******' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} maxLength={20} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Confirm New Password</label>
            <input type="password" placeholder='******' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>
          <button type="submit" className={styles.saveBtn} disabled={passwordSaving}>
            {passwordSaving ? 'Saving...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* PIN */}
      <div className={styles.card}>
        <h2>Update PIN</h2>
        <form onSubmit={savePin} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Current PIN</label>
            <div className={styles.inputWrap}>
              <input type={showPin ? 'text' : 'password'} placeholder='******' value={currentPin} onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ''))} required />
              <button type="button" className={styles.eyeBtn} onClick={() => setShowPin((v) => !v)}>
                {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>New PIN (4-10 digits)</label>
            <div className={styles.inputWrap}>
              <input type={showPin ? 'text' : 'password'} placeholder='******' value={newPin} onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))} required />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Confirm PIN</label>
            <div className={styles.inputWrap}>
              <input type={showPin ? 'text' : 'password'} placeholder='******' value={confirmPin} onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))} required />
            </div>
          </div>

          <button type="submit" className={styles.saveBtn} disabled={pinSaving}>
            {pinSaving ? 'Saving...' : 'Update PIN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
