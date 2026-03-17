// About admin — mission & vision cards
import { useState, type FormEvent } from 'react';
import { useData } from '../../context/DataContext';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { Pencil } from 'lucide-react';
import Modal from '../../components/Modal';
import DynamicIcon from '../../components/DynamicIcon';
import IconPicker from '../../components/IconPicker/IconPicker';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './AboutPage.module.scss';

const AboutPage = () => {
  const { about, setAbout, dataLoading } = useData();
  const [modal, setModal] = useState(false);
  const [editKey, setEditKey] = useState<'mission' | 'vision'>('mission');
  const [form, setForm] = useState({ icon: '', title: '', content: '', bg_color: '' });
  const [saving, setSaving] = useState(false);

  const openEdit = (key: 'mission' | 'vision') => {
    const item = about[key];
    setEditKey(key);
    setForm({ icon: item.icon, title: item.title, content: item.content, bg_color: item.bg_color });
    setModal(true);
  };

  const saveAbout = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = { ...about, [editKey]: { ...about[editKey], ...form } };
      const res = await api.put.about(updated);
      setAbout(res.data || updated);
      toast.success(res.data?.message || `${editKey} updated!`);
      setModal(false);
    } catch {
      toast.error('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  if (dataLoading) return <SkeletonLoader count={2} height="200px" />;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>About Management</h1>
      <p className={styles.pageDescription}>Edit the mission and vision sections shown on the about page.</p>

      <div className={styles.cardGrid}>
        {(['mission', 'vision'] as const).map((key) => {
          const item = about[key];
          return (
            <div key={key} className={styles.card} style={{ background: item?.bg_color || '#22C55E' }}>
              <div className={styles.cardIcon}><DynamicIcon name={item?.icon || 'Target'} size={28} /></div>
              <h3>{item?.title}</h3>
              <p>{item?.content}</p>
              <button className={styles.editBtn} onClick={() => openEdit(key)}><Pencil size={16} /></button>
            </div>
          );
        })}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={`Edit ${editKey}`}>
        <form onSubmit={saveAbout} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Icon</label>
            <IconPicker value={form.icon} onChange={(iconName) => setForm((prev) => ({ ...prev, icon: iconName }))} />
          </div>
          <div className={styles.fieldGroup}><label>Title</label><input type="text" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required /></div>
          <div className={styles.fieldGroup}><label>Content</label><textarea value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} rows={4} required /></div>
          <div className={styles.fieldGroup}>
            <label>Background Color</label>
            <div className={styles.colorRow}>
              <input type="color" value={form.bg_color} onChange={(e) => setForm((prev) => ({ ...prev, bg_color: e.target.value }))} />
              <span>{form.bg_color}</span>
            </div>
          </div>
          <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default AboutPage;
