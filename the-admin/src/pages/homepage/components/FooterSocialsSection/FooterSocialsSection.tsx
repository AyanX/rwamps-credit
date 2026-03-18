import { useState, type FormEvent } from 'react';
import { useData } from '../../../../context/DataContext';
import { api } from '../../../../api/api';
import { toast } from '../../../../components/Toast';
import styles from './FooterSocialsSection.module.scss';

const FooterSocialsSection = () => {
  const { footerSocials, setFooterSocials } = useData();
  const [form, setForm] = useState({ ...footerSocials });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put.footerSocials(form);
      setFooterSocials(res.data || form);
      toast.success(res.data?.message || 'Socials updated!');
    } catch {
      toast.error('Failed to update socials');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Footer Socials</h2>
      <form onSubmit={handleSave} className={styles.socialsForm}>
        <div className={styles.fieldGroup}>
          <label>Email</label>
          <input type="email" value={form.email || ''} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className={styles.input} placeholder="contact@example.com" />
        </div>
        <div className={styles.fieldGroup}>
          <label>Twitter</label>
          <input type="url" value={form.twitter} onChange={(e) => setForm((prev) => ({ ...prev, twitter: e.target.value }))} className={styles.input} />
        </div>
        <div className={styles.fieldGroup}>
          <label>LinkedIn</label>
          <input type="url" value={form.linkedin} onChange={(e) => setForm((prev) => ({ ...prev, linkedin: e.target.value }))} className={styles.input} />
        </div>
        <div className={styles.fieldGroup}>
          <label>Facebook</label>
          <input type="url" value={form.facebook} onChange={(e) => setForm((prev) => ({ ...prev, facebook: e.target.value }))} className={styles.input} />
        </div>
        <button type="submit" className={styles.saveBtn} disabled={saving}>
          {saving ? 'Saving...' : 'Save Socials'}
        </button>
      </form>
    </section>
  );
};

export default FooterSocialsSection;
