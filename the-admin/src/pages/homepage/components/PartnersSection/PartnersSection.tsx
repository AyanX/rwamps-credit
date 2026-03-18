import { useState, type FormEvent } from 'react';
import { useData, type Partner } from '../../../../context/DataContext';
import { api } from '../../../../api/api';
import { toast } from '../../../../components/Toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Modal from '../../../../components/Modal';
import ConfirmDialog from '../../../../components/ConfirmDialog';
import styles from './PartnersSection.module.scss';

const PartnersSection = () => {
  const { partners, setPartners } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Partner | null>(null);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openEdit = (partner: Partner) => {
    setEditItem(partner);
    setName(partner.client);
    setModalOpen(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setName('');
    setModalOpen(true);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        const res = await api.put.partner(editItem.id, { client: name });
        setPartners((prev) => prev.map((p) => (p.id === editItem.id ? (res.data || { ...p, client: name }) : p)));
        toast.success(res.data?.message || 'Partner updated!');
      } else {
        const res = await api.post.partner({ client: name });
        setPartners((prev) => [...prev, res.data || { id: Date.now(), client: name }]);
        toast.success(res.data?.message || 'Partner added!');
      }
      setModalOpen(false);
    } catch {
      toast.error('Failed to save partner');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete.partner(deleteId);
      setPartners((prev) => prev.filter((p) => p.id !== deleteId));
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
        <h2 className={styles.sectionTitle}>Our Investors & Partners</h2>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={18} /> Add</button>
      </div>
      <div className={styles.partnerGrid}>
        {partners.map((partner) => (
          <div key={partner.id} className={styles.partnerCard}>
            <span>{partner.client}</span>
            <div className={styles.partnerActions}>
              <button onClick={() => openEdit(partner)}><Pencil size={14} /></button>
              <button className={styles.deleteIcon} onClick={() => setDeleteId(partner.id)}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? 'Edit Partner' : 'Add Partner'}>
        <form onSubmit={handleSave} className={styles.modalForm}>
          <div className={styles.fieldGroup}>
            <label>Partner / Client Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
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

export default PartnersSection;
