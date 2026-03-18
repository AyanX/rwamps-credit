// Loans admin — loan sections with dual cards
import { useState, type FormEvent } from 'react';
import { useData, type Loan } from '../../context/DataContext';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { Pencil, Trash2, Plus, ArrowRight } from 'lucide-react';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './LoansPage.module.scss';

const emptyLoan: Omit<Loan, 'id'> = {
  title: '', 'sub-title': '', content: '',
  card_one_title: '', card_one_content: '', card_one_loan_amount_start: '', card_one_loan_amount_end: '',
  card_one_duration_start: '', card_one_duration_end: '', card_one_eligibility: '', card_one_bg_color: '#22C55E', card_one_text_color: '#FFFFFF',
  card_two_title: '', card_two_content: '', card_two_loan_amount_start: '', card_two_loan_amount_end: '',
  card_two_duration_start: '', card_two_duration_end: '', card_two_eligibility: '', card_two_bg_color: '#0F172A', card_two_text_color: '#FFFFFF',
};

const LoansPage = () => {
  const { loans, setLoans, dataLoading } = useData();
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<Loan | null>(null);
  const [form, setForm] = useState<Omit<Loan, 'id'>>(emptyLoan);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openEdit = (loan: Loan) => { setEditItem(loan); const { id, ...rest } = loan; setForm(rest); setModal(true); };
  const openAdd = () => { setEditItem(null); setForm({ ...emptyLoan }); setModal(true); };
  const handleChange = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const saveLoan = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem?.id) {
        const res = await api.put.loan(editItem.id, form);
        setLoans((prev) => prev.map((l) => (l.id === editItem.id ? (res.data?.data || { ...editItem, ...form }) : l)));
        toast.success(res.data?.message || 'Loan updated!');
      } else {
        const res = await api.post.loan(form);
        setLoans((prev) => [...prev, res.data?.data || { id: Date.now(), ...form }]);
        toast.success(res.data?.message || 'Loan added!');
      }
      setModal(false);
    } catch { toast.error('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete.loan(deleteId);
      setLoans((prev) => prev.filter((l) => l.id !== deleteId));
      toast.success('Deleted!');
    } catch { toast.error('Delete failed'); }
    finally { setDeleting(false); setDeleteId(null); }
  };

  const Loading = () => { 
    return<SkeletonLoader count={2} height="300px" /> 
  };

  const LoanCard = ({ title, content, amountStart, amountEnd, durationStart, durationEnd, eligibility, bgColor, textColor }: Record<string, string>) => (
    <div className={styles.loanCard} style={{ background: bgColor, color: textColor }}>
      <h4>{title}</h4>
      <p className={styles.loanCardDesc}>{content}</p>
      <div className={styles.loanDetails}>
        <div><span className={styles.detailLabel}>Loan Amount:</span><span>{amountStart} – {amountEnd}</span></div>
        <div><span className={styles.detailLabel}>Duration:</span><span>{durationStart} – {durationEnd} months</span></div>
      </div>
      <div className={styles.eligibility}><strong>Eligibility:</strong> {eligibility}</div>
      <span className={styles.applyLink}>Apply Now <ArrowRight size={16} /></span>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Loans Management</h1>
          <p className={styles.pageDescription}>Manage loan sections and their associated cards.</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={18} /> Add Loan Section</button>
      </div>
    { (dataLoading || loans.length === 0) ? <Loading /> : null }

      {loans?.map((loan) => (
        <section key={loan.id} className={styles.loanSection}>
          <div className={styles.loanSidebar}>
            <span className={styles.tag}>{loan.title}</span>
            <h2>{loan['sub-title']}</h2>
            <p>{loan.content}</p>
            <div className={styles.sectionActions}>
              <button className={styles.editSectionBtn} onClick={() => openEdit(loan)}><Pencil size={16} /> Edit</button>
              {loans.length > 0 && (
                <button className={styles.deleteSectionBtn} onClick={() => setDeleteId(loan.id!)}><Trash2 size={16} /> Delete</button>
              )}
            </div>
          </div>
          <div className={styles.loanGrid}>
            <LoanCard title={loan.card_one_title} content={loan.card_one_content} amountStart={loan.card_one_loan_amount_start} amountEnd={loan.card_one_loan_amount_end} durationStart={loan.card_one_duration_start} durationEnd={loan.card_one_duration_end} eligibility={loan.card_one_eligibility} bgColor={loan.card_one_bg_color} textColor={loan.card_one_text_color} />
            <LoanCard title={loan.card_two_title} content={loan.card_two_content} amountStart={loan.card_two_loan_amount_start} amountEnd={loan.card_two_loan_amount_end} durationStart={loan.card_two_duration_start} durationEnd={loan.card_two_duration_end} eligibility={loan.card_two_eligibility} bgColor={loan.card_two_bg_color} textColor={loan.card_two_text_color} />
          </div>
        </section>
      ))}
    
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Loan Section' : 'Add Loan Section'} maxWidth="680px">
        <form onSubmit={saveLoan} className={styles.form}>
          <h4 className={styles.formSection}>Section Info</h4>
          <div className={styles.fieldGroup}><label>Title</label><input type="text" value={form.title} onChange={(e) => handleChange('title', e.target.value)} required /></div>
          <div className={styles.fieldGroup}><label>Sub-title</label><input type="text" value={form['sub-title']} onChange={(e) => handleChange('sub-title', e.target.value)} required /></div>
          <div className={styles.fieldGroup}><label>Content</label><textarea value={form.content} onChange={(e) => handleChange('content', e.target.value)} rows={2} required /></div>

          <h4 className={styles.formSection}>Card One</h4>
          <div className={styles.twoCol}>
            <div className={styles.fieldGroup}><label>Title</label><input type="text" value={form.card_one_title} onChange={(e) => handleChange('card_one_title', e.target.value)} required /></div>
            <div className={styles.fieldGroup}><label>Content</label><input type="text" value={form.card_one_content} onChange={(e) => handleChange('card_one_content', e.target.value)} required /></div>
          </div>
          <div className={styles.twoCol}>
            <div className={styles.fieldGroup}><label>Amount Start</label><input type="text" value={form.card_one_loan_amount_start} onChange={(e) => handleChange('card_one_loan_amount_start', e.target.value)} required /></div>
            <div className={styles.fieldGroup}><label>Amount End</label><input type="text" value={form.card_one_loan_amount_end} onChange={(e) => handleChange('card_one_loan_amount_end', e.target.value)} required /></div>
          </div>
          <div className={styles.twoCol}>
            <div className={styles.fieldGroup}><label>Duration Start</label><input type="text" value={form.card_one_duration_start} onChange={(e) => handleChange('card_one_duration_start', e.target.value)} required /></div>
            <div className={styles.fieldGroup}><label>Duration End</label><input type="text" value={form.card_one_duration_end} onChange={(e) => handleChange('card_one_duration_end', e.target.value)} required /></div>
          </div>
          <div className={styles.fieldGroup}><label>Eligibility</label><input type="text" value={form.card_one_eligibility} onChange={(e) => handleChange('card_one_eligibility', e.target.value)} required /></div>
          <div className={styles.twoCol}>
            <div className={styles.fieldGroup}><label>BG Color</label><div className={styles.colorRow}><input type="color" value={form.card_one_bg_color} onChange={(e) => handleChange('card_one_bg_color', e.target.value)} /><span>{form.card_one_bg_color}</span></div></div>
            <div className={styles.fieldGroup}><label>Text Color</label><div className={styles.colorRow}><input type="color" value={form.card_one_text_color} onChange={(e) => handleChange('card_one_text_color', e.target.value)} /><span>{form.card_one_text_color}</span></div></div>
          </div>

          <h4 className={styles.formSection}>Card Two</h4>
          <div className={styles.twoCol}>
            <div className={styles.fieldGroup}><label>Title</label><input type="text" value={form.card_two_title} onChange={(e) => handleChange('card_two_title', e.target.value)} required /></div>
            <div className={styles.fieldGroup}><label>Content</label><input type="text" value={form.card_two_content} onChange={(e) => handleChange('card_two_content', e.target.value)} required /></div>
          </div>
          <div className={styles.twoCol}>
            <div className={styles.fieldGroup}><label>Amount Start</label><input type="text" value={form.card_two_loan_amount_start} onChange={(e) => handleChange('card_two_loan_amount_start', e.target.value)} required /></div>
            <div className={styles.fieldGroup}><label>Amount End</label><input type="text" value={form.card_two_loan_amount_end} onChange={(e) => handleChange('card_two_loan_amount_end', e.target.value)} required /></div>
          </div>
          <div className={styles.twoCol}>
            <div className={styles.fieldGroup}><label>Duration Start</label><input type="text" value={form.card_two_duration_start} onChange={(e) => handleChange('card_two_duration_start', e.target.value)} required /></div>
            <div className={styles.fieldGroup}><label>Duration End</label><input type="text" value={form.card_two_duration_end} onChange={(e) => handleChange('card_two_duration_end', e.target.value)} required /></div>
          </div>
          <div className={styles.fieldGroup}><label>Eligibility</label><input type="text" value={form.card_two_eligibility} onChange={(e) => handleChange('card_two_eligibility', e.target.value)} required /></div>
          <div className={styles.twoCol}>
            <div className={styles.fieldGroup}><label>BG Color</label><div className={styles.colorRow}><input type="color" value={form.card_two_bg_color} onChange={(e) => handleChange('card_two_bg_color', e.target.value)} /><span>{form.card_two_bg_color}</span></div></div>
            <div className={styles.fieldGroup}><label>Text Color</label><div className={styles.colorRow}><input type="color" value={form.card_two_text_color} onChange={(e) => handleChange('card_two_text_color', e.target.value)} /><span>{form.card_two_text_color}</span></div></div>
          </div>

          <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving...' : 'Save Loan Section'}</button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
};

export default LoansPage;
