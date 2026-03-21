import { useState, type FormEvent } from 'react';
import { useData, type Testimony } from '../../../../context/DataContext';
import { api } from '../../../../api/api';
import { toast } from '../../../../components/Toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Modal from '../../../../components/Modal';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import styles from './TestimoniesSection.module.scss';

const TestimoniesSection = () => {
  const { testimonies, setTestimonies } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimony | null>(null);
  const [form, setForm] = useState<Omit<Testimony, 'id'>>({ name: '', bio: '', occupation: '', loan_purpose: '', initials: '', card_color: '#22C55E' });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openEdit = (t: Testimony) => {
    setEditItem(t);
    setForm({ name: t.name, bio: t.bio, occupation: t.occupation, loan_purpose: t.loan_purpose, initials: t.initials, card_color: t.card_color });
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ name: '', bio: '', occupation: '', loan_purpose: '', initials: '', card_color: '#22C55E' });
    setModalOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        const res = await api.put.testimony(editItem.id, form);
        setTestimonies((prev) => prev.map((t) => (t.id === editItem.id ? (res.data.data || { ...editItem, ...form }) : t)));
        toast.success(res.data?.message || 'Testimony updated!');
      } else {
        const res = await api.post.testimony(form);
        setTestimonies((prev) => [...prev, res.data.data || { id: Date.now(), ...form }]);
        toast.success(res.data?.message || 'Testimony added!');
      }
      setModalOpen(false);
    } catch {
      toast.error('Failed to save testimony');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete.testimony(deleteId);
      setTestimonies((prev) => prev.filter((t) => t.id !== deleteId));
      toast.success('Deleted successfully');
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Success Stories</h2>
        {testimonies.length < 5 && (
          <button className={styles.addBtn} onClick={openAdd}><Plus size={18} /> Add</button>
        )}
      </div>
      <div className={styles.testimonyGrid}>
        {testimonies.map((testimony) => (
          <div key={testimony.id} className={styles.testimonyCard} style={{ background: testimony.card_color || '#22C55E' }}>
            <div className={styles.testimonyHeader}>
              <span className={styles.quoteIcon}>"</span>
              <span className={styles.loanBadge}>{testimony.loan_purpose}</span>
            </div>
            <p className={styles.testimonyBio}>{testimony.bio}</p>
            <div className={styles.testimonyAuthor}>
              <div className={styles.avatar}>{testimony.initials}</div>
              <div>
                <div className={styles.authorName}>{testimony.name}</div>
                <div className={styles.authorOccupation}>{testimony.occupation}</div>
              </div>
            </div>
            <div className={styles.cardActions}>
              <button className={styles.editBtnLight} onClick={() => openEdit(testimony)}><Pencil size={16} /></button>
              {testimonies.length > 3 && (
                <button className={styles.deleteBtnLight} onClick={() => setDeleteId(testimony.id)}><Trash2 size={16} /></button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Testimony' : 'Add Testimony'}>
        <form onSubmit={handleSave} className={styles.modalForm}>
          <div className={styles.fieldGroup}>
            <label>Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className={styles.input} required />
          </div>
          
          <div className={styles.fieldGroup}>
            <label>Occupation</label>
            <input type="text" value={form.occupation} onChange={(e) => setForm((prev) => ({ ...prev, occupation: e.target.value }))} className={styles.input} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Loan Purpose</label>
            <input type="text" value={form.loan_purpose} onChange={(e) => setForm((prev) => ({ ...prev, loan_purpose: e.target.value }))} className={styles.input} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Bio / Quote</label>
            <textarea value={form.bio} onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))} className={styles.textarea} rows={3} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Card Color</label>
            <div className={styles.colorPicker}>
              <input type="color" value={form.card_color} onChange={(e) => setForm((prev) => ({ ...prev, card_color: e.target.value }))} />
              <span>{form.card_color}</span>
            </div>
          </div>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </section>
  );
};

export default TestimoniesSection;
