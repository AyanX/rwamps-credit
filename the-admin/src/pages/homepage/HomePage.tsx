// Homepage admin — manages stats, what-we-do cards, testimonies, partners, footer socials
import { useState, type FormEvent } from 'react';
import { useData, type WhatWeDoItem, type Testimony, type Partner } from '../../context/DataContext';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const {
    stats, setStats, whatWeDo, setWhatWeDo, testimonies, setTestimonies,
    partners, setPartners, footerSocials, setFooterSocials, dataLoading,
  } = useData();

  // ========== Stats ==========
  const [statsForm, setStatsForm] = useState({ ...stats });
  const [statsSaving, setStatsSaving] = useState(false);

  const handleStatsChange = (key: string, value: string | number) => {
    setStatsForm((prev) => ({ ...prev, [key]: value }));
  };

  const saveStats = async (e: FormEvent) => {
    e.preventDefault();
    setStatsSaving(true);
    try {
      const res = await api.put.stats(statsForm);
      setStats(res.data || statsForm);
      toast.success(res.data?.message || 'Stats updated!');
    } catch {
      toast.error('Failed to update stats');
    } finally {
      setStatsSaving(false);
    }
  };

  // ========== What We Do ==========
  const [whatWeDoModalOpen, setWhatWeDoModalOpen] = useState(false);
  const [whatWeDoEdit, setWhatWeDoEdit] = useState<WhatWeDoItem | null>(null);
  const [whatWeDoForm, setWhatWeDoForm] = useState({ title: '', image: '', blur_image: '' });
  const [whatWeDoFile, setWhatWeDoFile] = useState<File | null>(null);
  const [whatWeDoSaving, setWhatWeDoSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: string; id: number } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openWhatWeDoEdit = (item: WhatWeDoItem) => {
    setWhatWeDoEdit(item);
    setWhatWeDoForm({ title: item.title, image: item.image, blur_image: item.blur_image });
    setWhatWeDoFile(null);
    setWhatWeDoModalOpen(true);
  };

  const openWhatWeDoAdd = () => {
    setWhatWeDoEdit(null);
    setWhatWeDoForm({ title: '', image: '', blur_image: '' });
    setWhatWeDoFile(null);
    setWhatWeDoModalOpen(true);
  };

  const saveWhatWeDoCard = async (e: FormEvent) => {
    e.preventDefault();
    setWhatWeDoSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', whatWeDoForm.title);
      if (whatWeDoFile) formData.append('image', whatWeDoFile);

      if (whatWeDoEdit) {
        const res = await api.put.whatWeDo(whatWeDoEdit.id, formData);
        setWhatWeDo((prev) => prev.map((w) => (w.id === whatWeDoEdit.id ? (res.data || { ...w, ...whatWeDoForm }) : w)));
        toast.success(res.data?.message || 'Card updated!');
      } else {
        const res = await api.post.whatWeDo(formData);
        setWhatWeDo((prev) => [...prev, res.data || { id: Date.now(), ...whatWeDoForm }]);
        toast.success(res.data?.message || 'Card added!');
      }
      setWhatWeDoModalOpen(false);
    } catch {
      toast.error('Failed to save card');
    } finally {
      setWhatWeDoSaving(false);
    }
  };

  // ========== Testimonies ==========
  const [testimonyModalOpen, setTestimonyModalOpen] = useState(false);
  const [testimonyEdit, setTestimonyEdit] = useState<Testimony | null>(null);
  const [testimonyForm, setTestimonyForm] = useState<Omit<Testimony, 'id'>>({ name: '', bio: '', occupation: '', loan_purpose: '', initials: '', card_color: '#22C55E' });
  const [testimonySaving, setTestimonySaving] = useState(false);

  const openTestimonyEdit = (testimony: Testimony) => {
    setTestimonyEdit(testimony);
    setTestimonyForm({ name: testimony.name, bio: testimony.bio, occupation: testimony.occupation, loan_purpose: testimony.loan_purpose, initials: testimony.initials, card_color: testimony.card_color });
    setTestimonyModalOpen(true);
  };

  const openTestimonyAdd = () => {
    setTestimonyEdit(null);
    setTestimonyForm({ name: '', bio: '', occupation: '', loan_purpose: '', initials: '', card_color: '#22C55E' });
    setTestimonyModalOpen(true);
  };

  const saveTestimony = async (e: FormEvent) => {
    e.preventDefault();
    setTestimonySaving(true);
    try {
      if (testimonyEdit) {
        const res = await api.put.testimony(testimonyEdit.id, testimonyForm);
        const updated = res.data || { ...testimonyEdit, ...testimonyForm };
        setTestimonies((prev) => prev.map((t) => (t.id === testimonyEdit.id ? updated : t)));
        toast.success(res.data?.message || 'Testimony updated!');
      } else {
        const res = await api.post.testimony(testimonyForm);
        setTestimonies((prev) => [...prev, res.data || { id: Date.now(), ...testimonyForm }]);
        toast.success(res.data?.message || 'Testimony added!');
      }
      setTestimonyModalOpen(false);
    } catch {
      toast.error('Failed to save testimony');
    } finally {
      setTestimonySaving(false);
    }
  };

  // ========== Partners ==========
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerEdit, setPartnerEdit] = useState<Partner | null>(null);
  const [partnerName, setPartnerName] = useState('');
  const [partnerSaving, setPartnerSaving] = useState(false);

  const openPartnerEdit = (partner: Partner) => {
    setPartnerEdit(partner);
    setPartnerName(partner.client);
    setPartnerModalOpen(true);
  };

  const savePartner = async (e: FormEvent) => {
    e.preventDefault();
    setPartnerSaving(true);
    try {
      if (partnerEdit) {
        const res = await api.put.partner(partnerEdit.id, { client: partnerName });
        setPartners((prev) => prev.map((p) => (p.id === partnerEdit.id ? (res.data || { ...p, client: partnerName }) : p)));
        toast.success(res.data?.message || 'Partner updated!');
      } else {
        const res = await api.post.partner({ client: partnerName });
        setPartners((prev) => [...prev, res.data || { id: Date.now(), client: partnerName }]);
        toast.success(res.data?.message || 'Partner added!');
      }
      setPartnerModalOpen(false);
    } catch {
      toast.error('Failed to save partner');
    } finally {
      setPartnerSaving(false);
    }
  };

  // ========== Footer Socials ==========
  const [socialsForm, setSocialsForm] = useState({ ...footerSocials });
  const [socialsSaving, setSocialsSaving] = useState(false);

  const saveSocials = async (e: FormEvent) => {
    e.preventDefault();
    setSocialsSaving(true);
    try {
      const res = await api.put.footerSocials(socialsForm);
      setFooterSocials(res.data || socialsForm);
      toast.success(res.data?.message || 'Socials updated!');
    } catch {
      toast.error('Failed to update socials');
    } finally {
      setSocialsSaving(false);
    }
  };

  // ========== Delete handler ==========
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const { type, id } = deleteTarget;
      if (type === 'whatwedo') {
        await api.delete.whatWeDo(id);
        setWhatWeDo((prev) => prev.filter((w) => w.id !== id));
      } else if (type === 'testimony') {
        await api.delete.testimony(id);
        setTestimonies((prev) => prev.filter((t) => t.id !== id));
      } else if (type === 'partner') {
        await api.delete.partner(id);
        setPartners((prev) => prev.filter((p) => p.id !== id));
      }
      toast.success('Deleted successfully');
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (dataLoading) return <SkeletonLoader count={4} height="200px" />;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Homepage Management</h1>
      <p className={styles.pageDescription}>Manage hero stats, what we do cards, testimonies, partners, and social links.</p>

      {/* Stats Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Hero Stats</h2>
        <form onSubmit={saveStats} className={styles.statsGrid}>
          <div className={styles.fieldGroup}>
            <label>Loans Disbursed</label>
            <div className={styles.fieldRow}>
              <input type="number" value={statsForm.loans_disbursed} onChange={(e) => handleStatsChange('loans_disbursed', +e.target.value)} className={styles.input} />
              <select value={statsForm.loans_disbursed_initials} onChange={(e) => handleStatsChange('loans_disbursed_initials', e.target.value)} className={styles.select}>
                <option value="K">K</option>
                <option value="M">M</option>
              </select>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Repayment Rate (%)</label>
            <input type="number" value={statsForm.repayment_rate} onChange={(e) => handleStatsChange('repayment_rate', +e.target.value)} className={styles.input} />
          </div>

          <div className={styles.fieldGroup}>
            <label>Total Disbursed (B)</label>
            <input type="number" value={statsForm.total_disbursed} onChange={(e) => handleStatsChange('total_disbursed', +e.target.value)} className={styles.input} />
          </div>

          <div className={styles.fieldGroup}>
            <label>Locations Served</label>
            <input type="number" value={statsForm.locations_served} onChange={(e) => handleStatsChange('locations_served', +e.target.value)} className={styles.input} />
          </div>

          <div className={styles.fieldGroup}>
            <label>Serving Hours</label>
            <input type="text" value={statsForm.serving_hours} onChange={(e) => handleStatsChange('serving_hours', e.target.value)} className={styles.input} />
          </div>

          <div className={styles.fieldGroup}>
            <label>Serving Days</label>
            <input type="text" value={statsForm.serving_days} onChange={(e) => handleStatsChange('serving_days', e.target.value)} className={styles.input} />
          </div>

          <div className={styles.fieldGroup}>
            <label>Active Users</label>
            <div className={styles.fieldRow}>
              <input type="number" value={statsForm.active_users} onChange={(e) => handleStatsChange('active_users', +e.target.value)} className={styles.input} />
              <select value={statsForm.active_users_initials} onChange={(e) => handleStatsChange('active_users_initials', e.target.value)} className={styles.select}>
                <option value="K">K</option>
                <option value="M">M</option>
                <option value="+">+</option>
              </select>
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label>Total Clients</label>
            <div className={styles.fieldRow}>
              <input type="number" value={statsForm.total_clients} onChange={(e) => handleStatsChange('total_clients', +e.target.value)} className={styles.input} />
              <select value={statsForm.total_clients_initials} onChange={(e) => handleStatsChange('total_clients_initials', e.target.value)} className={styles.select}>
                <option value="K">K</option>
                <option value="M">M</option>
                <option value="+">+</option>
              </select>
            </div>
          </div>

          <div className={styles.fullWidth}>
            <button type="submit" className={styles.saveBtn} disabled={statsSaving}>
              {statsSaving ? 'Saving...' : 'Save Stats'}
            </button>
          </div>
        </form>
      </section>

      {/* What We Do */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What We Do</h2>
          {whatWeDo.length < 5 && (
            <button className={styles.addBtn} onClick={openWhatWeDoAdd}><Plus size={18} /> Add</button>
          )}
        </div>
        <div className={styles.cardGrid}>
          {whatWeDo.map((item) => (
            <div key={item.id} className={styles.whatWeDoCard}>
              {/* show blur image as placeholder before real image loads */}
              {item.blur_image && <img src={item.blur_image} alt="" className={styles.blurPlaceholder} width={300} height={200} />}
              <img src={item.image} alt={item.title || 'What we do card'} loading="lazy" width={300} height={200} />
              <div className={styles.whatWeDoOverlay}>
                <span className={styles.whatWeDoLabel}>{item.title}</span>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.editBtn} onClick={() => openWhatWeDoEdit(item)}><Pencil size={16} /></button>
                {whatWeDo.length > 3 && (
                  <button className={styles.deleteBtn} onClick={() => setDeleteTarget({ type: 'whatwedo', id: item.id })}><Trash2 size={16} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonies */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Success Stories</h2>
          {testimonies.length < 5 && (
            <button className={styles.addBtn} onClick={openTestimonyAdd}><Plus size={18} /> Add</button>
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
                <button className={styles.editBtnLight} onClick={() => openTestimonyEdit(testimony)}><Pencil size={16} /></button>
                {testimonies.length > 3 && (
                  <button className={styles.deleteBtnLight} onClick={() => setDeleteTarget({ type: 'testimony', id: testimony.id })}><Trash2 size={16} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Our Investors & Partners</h2>
          <button className={styles.addBtn} onClick={() => { setPartnerEdit(null); setPartnerName(''); setPartnerModalOpen(true); }}>
            <Plus size={18} /> Add
          </button>
        </div>
        <div className={styles.partnerGrid}>
          {partners.map((partner) => (
            <div key={partner.id} className={styles.partnerCard}>
              <span>{partner.client}</span>
              <div className={styles.partnerActions}>
                <button onClick={() => openPartnerEdit(partner)}><Pencil size={14} /></button>
                <button className={styles.deleteIcon} onClick={() => setDeleteTarget({ type: 'partner', id: partner.id })}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Socials */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Footer Socials</h2>
        <form onSubmit={saveSocials} className={styles.socialsForm}>
          <div className={styles.fieldGroup}>
            <label>Email</label>
            <input type="email" value={socialsForm.email || ''} onChange={(e) => setSocialsForm((prev) => ({ ...prev, email: e.target.value }))} className={styles.input} placeholder="contact@example.com" />
          </div>
          <div className={styles.fieldGroup}>
            <label>Twitter</label>
            <input type="url" value={socialsForm.twitter} onChange={(e) => setSocialsForm((prev) => ({ ...prev, twitter: e.target.value }))} className={styles.input} />
          </div>
          <div className={styles.fieldGroup}>
            <label>LinkedIn</label>
            <input type="url" value={socialsForm.linkedin} onChange={(e) => setSocialsForm((prev) => ({ ...prev, linkedin: e.target.value }))} className={styles.input} />
          </div>
          <div className={styles.fieldGroup}>
            <label>Facebook</label>
            <input type="url" value={socialsForm.facebook} onChange={(e) => setSocialsForm((prev) => ({ ...prev, facebook: e.target.value }))} className={styles.input} />
          </div>
          <button type="submit" className={styles.saveBtn} disabled={socialsSaving}>
            {socialsSaving ? 'Saving...' : 'Save Socials'}
          </button>
        </form>
      </section>

      {/* ===== Modals ===== */}

      {/* What We Do Modal */}
      <Modal isOpen={whatWeDoModalOpen} onClose={() => setWhatWeDoModalOpen(false)} title={whatWeDoEdit ? 'Edit Card' : 'Add Card'}>
        <form onSubmit={saveWhatWeDoCard} className={styles.modalForm}>
          <div className={styles.fieldGroup}>
            <label>Title</label>
            <input type="text" value={whatWeDoForm.title} onChange={(e) => setWhatWeDoForm((prev) => ({ ...prev, title: e.target.value }))} className={styles.input} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Image</label>
            <input type="file" accept="image/*" onChange={(e) => setWhatWeDoFile(e.target.files?.[0] || null)} className={styles.input} />
            {(whatWeDoEdit?.image || whatWeDoForm.image) && <img src={whatWeDoEdit?.image || whatWeDoForm.image} alt="Preview" className={styles.preview} />}
          </div>
          <button type="submit" className={styles.saveBtn} disabled={whatWeDoSaving}>
            {whatWeDoSaving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </Modal>

      {/* Testimony Modal */}
      <Modal isOpen={testimonyModalOpen} onClose={() => setTestimonyModalOpen(false)} title={testimonyEdit ? 'Edit Testimony' : 'Add Testimony'}>
        <form onSubmit={saveTestimony} className={styles.modalForm}>
          <div className={styles.fieldGroup}>
            <label>Name</label>
            <input type="text" value={testimonyForm.name} onChange={(e) => setTestimonyForm((prev) => ({ ...prev, name: e.target.value }))} className={styles.input} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Initials</label>
            <input type="text" value={testimonyForm.initials} maxLength={2} onChange={(e) => setTestimonyForm((prev) => ({ ...prev, initials: e.target.value.toUpperCase() }))} className={styles.input} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Occupation</label>
            <input type="text" value={testimonyForm.occupation} onChange={(e) => setTestimonyForm((prev) => ({ ...prev, occupation: e.target.value }))} className={styles.input} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Loan Purpose</label>
            <input type="text" value={testimonyForm.loan_purpose} onChange={(e) => setTestimonyForm((prev) => ({ ...prev, loan_purpose: e.target.value }))} className={styles.input} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Bio / Quote</label>
            <textarea value={testimonyForm.bio} onChange={(e) => setTestimonyForm((prev) => ({ ...prev, bio: e.target.value }))} className={styles.textarea} rows={3} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Card Color</label>
            <div className={styles.colorPicker}>
              <input type="color" value={testimonyForm.card_color} onChange={(e) => setTestimonyForm((prev) => ({ ...prev, card_color: e.target.value }))} />
              <span>{testimonyForm.card_color}</span>
            </div>
          </div>
          <button type="submit" className={styles.saveBtn} disabled={testimonySaving}>
            {testimonySaving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </Modal>

      {/* Partner Modal */}
      <Modal isOpen={partnerModalOpen} onClose={() => setPartnerModalOpen(false)} title={partnerEdit ? 'Edit Partner' : 'Add Partner'}>
        <form onSubmit={savePartner} className={styles.modalForm}>
          <div className={styles.fieldGroup}>
            <label>Partner / Client Name</label>
            <input type="text" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} className={styles.input} required />
          </div>
          <button type="submit" className={styles.saveBtn} disabled={partnerSaving}>
            {partnerSaving ? 'Saving...' : 'Save'}
          </button>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
};

export default HomePage;
