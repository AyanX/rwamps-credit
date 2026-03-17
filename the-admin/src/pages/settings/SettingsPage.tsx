// Settings admin — change username, email, password, and PIN
import { useState, useEffect, type FormEvent } from 'react';
import { useData } from '../../context/DataContext';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './SettingsPage.module.scss';

const SettingsPage = () => {
  const { settingsEmail, setSettingsEmail, settingsUsername, setSettingsUsername, dataLoading } = useData();

  // username
  const [username, setUsername] = useState(settingsUsername);
  const [usernameSaving, setUsernameSaving] = useState(false);

  // email
  const [email, setEmail] = useState(settingsEmail);
  const [emailSaving, setEmailSaving] = useState(false);

  // password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);

  // PIN
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinSaving, setPinSaving] = useState(false);

  // sync when context values change
  useEffect(() => { setEmail(settingsEmail); }, [settingsEmail]);
  useEffect(() => { setUsername(settingsUsername); }, [settingsUsername]);

  // fetch email on mount
  useEffect(() => {
    api.get.email().then((res) => {
      if (res.data?.email) {
        setEmail(res.data.email);
        setSettingsEmail(res.data.email);
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
        setSettingsEmail(res.data.email);
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
    if (newPassword.length < 6 || newPassword.length > 14) {
      toast.error('Password must be 6-14 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
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
    if (newPin !== confirmPin) {
      toast.error('PINs do not match');
      return;
    }
    setPinSaving(true);
    try {
      const res = await api.put.pin({ new_pin: newPin });
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
        <h2>Email</h2>
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
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>New Password (6-14 chars)</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} maxLength={14} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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
            <label>New PIN</label>
            <input type="password" value={newPin} onChange={(e) => setNewPin(e.target.value)} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Confirm PIN</label>
            <input type="password" value={confirmPin} onChange={(e) => setConfirmPin(e.target.value)} required />
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
