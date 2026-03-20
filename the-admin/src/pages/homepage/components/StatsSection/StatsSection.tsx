import { useState, type FormEvent } from 'react';
import { useData } from '../../../../context/DataContext';
import { api } from '../../../../api/api';
import { toast } from '../../../../components/Toast';
import styles from './StatsSection.module.scss';

const StatsSection = () => {
  const { stats, setStats } = useData();
  const [statsForm, setStatsForm] = useState({ ...stats });
  const [saving, setSaving] = useState(false);

  const handleChange = (key: string, value: string | number) => {
    setStatsForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put.stats(statsForm);
      setStats(res.data?.data || statsForm);
      toast.success(res.data?.message || 'Stats updated!');
    } catch {
      toast.error('Failed to update stats');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Hero Stats</h2>
      <form onSubmit={handleSave} className={styles.statsGrid}>
        <div className={styles.fieldGroup}>
          <label>Loans Disbursed</label>
          <div className={styles.fieldRow}>
            <input type="number" value={statsForm?.loans_disbursed || ""} onChange={(e) => handleChange('loans_disbursed', +e.target.value)} className={styles.input} />
            <select value={statsForm?.loans_disbursed_initials} onChange={(e) => handleChange('loans_disbursed_initials', e.target.value)} className={styles.select}>
              <option value="K">K</option><option value="M">M</option>
            </select>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label>Repayment Rate (%)</label>
          <input type="number" value={statsForm?.repayment_rate || ""} onChange={(e) => handleChange('repayment_rate', +e.target.value)} className={styles.input} />
        </div>

        <div className={styles.fieldGroup}>
          <label>Total Disbursed (B)</label>
          <input type="number" value={statsForm?.total_disbursed || ""} onChange={(e) => handleChange('total_disbursed', +e.target.value)} className={styles.input} />
        </div>

        <div className={styles.fieldGroup}>
          <label>Locations Served</label>
          <input type="number" value={statsForm?.locations_served || ""} onChange={(e) => handleChange('locations_served', +e.target.value)} className={styles.input} />
        </div>

        <div className={styles.fieldGroup}>
          <label>Serving Hours</label>
          <input type="text" value={statsForm?.serving_hours || ""} onChange={(e) => handleChange('serving_hours', e.target.value)} className={styles.input} />
        </div>

        <div className={styles.fieldGroup}>
          <label>Serving Days</label>
          <input type="text" value={statsForm?.serving_days || ""} onChange={(e) => handleChange('serving_days', e.target.value)} className={styles.input} />
        </div>

        <div className={styles.fieldGroup}>
          <label>Active Users</label>
          <div className={styles.fieldRow}>
            <input type="number" value={statsForm?.active_users || ""} onChange={(e) => handleChange('active_users', +e.target.value)} className={styles.input} />
            <select value={statsForm?.active_users_initials || ""} onChange={(e) => handleChange('active_users_initials', e.target.value)} className={styles.select}>
              <option value="K">K</option><option value="M">M</option><option value="+">+</option>
            </select>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label>Total Clients</label>
          <div className={styles.fieldRow}>
            <input type="number" value={statsForm?.total_clients || ""} onChange={(e) => handleChange('total_clients', +e.target.value)} className={styles.input} />
            <select value={statsForm?.total_clients_initials || ""} onChange={(e) => handleChange('total_clients_initials', e.target.value)} className={styles.select}>
              <option value="K">K</option><option value="M">M</option><option value="+">+</option>
            </select>
          </div>
        </div>

        <div className={styles.fullWidth}>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'Saving...' : 'Save Stats'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default StatsSection;
