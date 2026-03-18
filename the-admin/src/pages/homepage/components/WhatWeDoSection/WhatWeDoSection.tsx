import { useState, type FormEvent } from 'react';
import { useData, type WhatWeDoItem } from '../../../../context/DataContext';
import { api } from '../../../../api/api';
import { toast } from '../../../../components/Toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Modal from '../../../../components/Modal';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import styles from './WhatWeDoSection.module.scss';

const WhatWeDoSection = () => {
  const { whatWeDo, setWhatWeDo } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<WhatWeDoItem | null>(null);
  const [form, setForm] = useState({ title: '', image: '', blur_image: '' });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openEdit = (item: WhatWeDoItem) => {
    setEditItem(item);
    setForm({ title: item.title, image: item.image, blur_image: item.blur_image });
    setFile(null);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ title: '', image: '', blur_image: '' });
    setFile(null);
    setModalOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      if (file) formData.append('image', file);

      if (editItem) {
        const res = await api.put.whatWeDo(editItem.id, formData);
        setWhatWeDo((prev) => prev.map((w) => (w.id === editItem.id ? (res.data || { ...w, ...form }) : w)));
        toast.success(res.data?.message || 'Card updated!');
      } else {
        const res = await api.post.whatWeDo(formData);
        setWhatWeDo((prev) => [...prev, res.data || { id: Date.now(), ...form }]);
        toast.success(res.data?.message || 'Card added!');
      }
      setModalOpen(false);
    } catch {
      toast.error('Failed to save card');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete.whatWeDo(deleteId);
      setWhatWeDo((prev) => prev.filter((w) => w.id !== deleteId));
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
        <h2 className={styles.sectionTitle}>What We Do</h2>
        {whatWeDo.length < 5 && (
          <button className={styles.addBtn} onClick={openAdd}><Plus size={18} /> Add</button>
        )}
      </div>
      <div className={styles.cardGrid}>
        {whatWeDo.map((item) => (
          <div key={item.id} className={styles.whatWeDoCard}>
            {item.blur_image && <img src={item.blur_image} alt="" className={styles.blurPlaceholder} width={300} height={200} />}
            <img src={item.image} alt={item.title || 'What we do card'} loading="lazy" width={300} height={200} />
            <div className={styles.whatWeDoOverlay}>
              <span className={styles.whatWeDoLabel}>{item.title}</span>
            </div>
            <div className={styles.cardActions}>
              <button className={styles.editBtn} onClick={() => openEdit(item)}><Pencil size={16} /></button>
              {whatWeDo.length > 3 && (
                <button className={styles.deleteBtn} onClick={() => setDeleteId(item.id)}><Trash2 size={16} /></button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Card' : 'Add Card'}>
        <form onSubmit={handleSave} className={styles.modalForm}>
          <div className={styles.fieldGroup}>
            <label>Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} className={styles.input} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Image</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className={styles.input} />
            {(editItem?.image || form.image) && <img src={editItem?.image || form.image} alt="Preview" className={styles.preview} />}
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

export default WhatWeDoSection;
