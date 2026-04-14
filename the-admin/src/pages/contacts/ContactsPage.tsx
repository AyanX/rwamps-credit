
import { useState, type FormEvent } from "react";
import { useData, type Branch, type Faq } from "../../context/DataContext";
import { api } from "../../api/api";
import { toast } from "../../components/Toast";
import {
  Pencil,
  Trash2,
  Plus,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  ChevronDown,
} from "lucide-react";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import SkeletonLoader from "../../components/SkeletonLoader";
import styles from "./ContactsPage.module.scss";

const ContactsPage = () => {
  const { branches, setBranches, faqs, setFaqs, dataLoading } = useData();

  const [branchModal, setBranchModal] = useState(false);
  const [branchEdit, setBranchEdit] = useState<Branch | null>(null);
  const [branchForm, setBranchForm] = useState<Omit<Branch, "id">>({
    branch_name: "",
    location: "",
    phone_number: "",
    email: "",
    website: "",
    open_time: "",
    close_time: "",
  });
  const [branchSaving, setBranchSaving] = useState(false);

  const openBranchEdit = (branch: Branch) => {
    setBranchEdit(branch);
    setBranchForm({
      branch_name: branch.branch_name,
      location: branch.location,
      phone_number: branch.phone_number,
      email: branch.email,
      website: branch.website,
      open_time: branch.open_time || '09:00',
      close_time: branch.close_time || '18:00',
    });
    setBranchModal(true);
  };

  const saveBranch = async (e: FormEvent) => {
    e.preventDefault();
    setBranchSaving(true);
    try {
      if (branchEdit) {
        const res = await api.put.branch(branchEdit.id, branchForm);
        setBranches((prev) =>
          prev.map((b) =>
            b.id === branchEdit.id ? res.data?.data || { ...b, ...branchForm } : b,
          ),
        );
        toast.success(res.data?.message || "Branch updated!");
      } else {
        const res = await api.post.branch(branchForm);
        setBranches((prev) => [
          ...prev,
          res.data?.data || { id: Date.now(), ...branchForm },
        ]);
        toast.success(res.data?.message || "Branch added!");
      }
      setBranchModal(false);
    } catch {
      toast.error("Failed to save branch");
    } finally {
      setBranchSaving(false);
    }
  };

  const [faqModal, setFaqModal] = useState(false);
  const [faqEdit, setFaqEdit] = useState<Faq | null>(null);
  const [faqForm, setFaqForm] = useState({ title: "", content: "" });
  const [faqSaving, setFaqSaving] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const openFaqEdit = (faq: Faq) => {
    setFaqEdit(faq);
    setFaqForm({ title: faq.title, content: faq.content });
    setFaqModal(true);
  };

  const saveFaq = async (e: FormEvent) => {
    e.preventDefault();
    setFaqSaving(true);
    try {
      if (faqEdit) {
        const res = await api.put.faq(faqEdit.id, faqForm);
        setFaqs((prev) =>
          prev.map((f) =>
            f.id === faqEdit.id ? res.data.data || { ...f, ...faqForm } : f,
          ),
        );
        toast.success(res.data?.message || "FAQ updated!");
      } else {
        const res = await api.post.faq(faqForm);
        setFaqs((prev) => [
          ...prev,
          res.data.data || { id: Date.now(), ...faqForm },
        ]);
        toast.success(res.data?.message || "FAQ added!");
      }
      setFaqModal(false);
    } catch {
      toast.error("Failed to save FAQ");
    } finally {
      setFaqSaving(false);
    }
  };

  const [deleteTarget, setDeleteTarget] = useState<{
    type: string;
    id: number;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.type === "branch") {
        await api.delete.branch(deleteTarget.id);
        setBranches((prev) => prev.filter((b) => b.id !== deleteTarget.id));
      } else if (deleteTarget.type === "faq") {
        await api.delete.faq(deleteTarget.id);
        setFaqs((prev) => prev.filter((f) => f.id !== deleteTarget.id));
      }
      toast.success("Deleted!");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const DummyLoader = () => <SkeletonLoader count={3} height="200px" />;

  if (dataLoading) return <DummyLoader />;

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Contacts Management</h1>
      <p className={styles.pageDescription}>
        Manage branch locations and frequently asked questions.
      </p>

      {/* Branches */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Branches</h2>
          {branches.length < 2 && (
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => {
                setBranchEdit(null);
                setBranchForm({
                  branch_name: "",
                  location: "",
                  phone_number: "",
                  email: "",
                  website: "",
                  open_time: "09:00",
                  close_time: "21:00",
                });
                setBranchModal(true);
              }}
            >
              <Plus size={18} /> Add Branch
            </button>
          )}
        </div>

        {branches && branches.length > 0 ? null : (
          <p>No branches found. Please add a branch.</p>
        )}

        <div className={styles.branchGrid}>
          {branches?.map((branch) => (
            <div key={branch.id} className={styles.branchCard}>
              <h3 className={styles.branchName}>{branch.branch_name}</h3>
              <div className={styles.branchDetails}>
                <div className={styles.branchDetail}>
                  <MapPin size={18} />
                  <p>{branch.location}</p>
                </div>
                <div className={styles.branchDetail}>
                  <Phone size={18} />
                  <p>{branch.phone_number}</p>
                </div>
                <div className={styles.branchDetail}>
                  <Mail size={18} />
                  <p>{branch.email}</p>
                </div>
                <div className={styles.branchDetail}>
                  <Globe size={18} />
                  <p>{branch.website}</p>
                </div>
                <div className={styles.branchDetail}>
                  <Clock size={18} />
                  <p>
                    {branch.open_time} - {branch.close_time}
                  </p>
                </div>
              </div>
              <div className={styles.branchActions}>
                <button type="button" onClick={() => openBranchEdit(branch)}>
                  <Pencil size={16} />
                </button>
              
                  <button
                    type="button"
                    className={styles.dangerIcon}
                    onClick={() =>
                      setDeleteTarget({ type: "branch", id: branch.id })
                    }
                  >
                    <Trash2 size={16} />
                  </button>
              
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>FAQs</h2>
          {faqs.length < 10 && (
            <button
              type="button"
              className={styles.addBtn}
              onClick={() => {
                setFaqEdit(null);
                setFaqForm({ title: "", content: "" });
                setFaqModal(true);
              }}
            >
              <Plus size={18} /> Add FAQ
            </button>
          )}
        </div>
        {dataLoading || faqs.length < 1 ? <DummyLoader /> : null}
        <div className={styles.faqList}>
          {faqs?.map((faq) => (
            <div
              key={faq.id}
              className={styles.faqItem}
              data-open={openFaqId === faq.id}
            >
              <div
                className={styles.faqTrigger}
                role="button"
                tabIndex={0}
                onClick={() =>
                  setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenFaqId(openFaqId === faq.id ? null : faq.id);
                  }
                }}
              >
                <span>{faq.title}</span>
                <div className={styles.faqActions}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openFaqEdit(faq);
                    }}
                  >
                    <Pencil size={14} />
                  </button>
                
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget({ type: "faq", id: faq.id });
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  
                  <ChevronDown size={18} className={styles.chevron} />
                </div>
              </div>
              {openFaqId === faq.id && (
                <div className={styles.faqContent}>
                  <p>{faq.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <Modal
        isOpen={branchModal}
        onClose={() => setBranchModal(false)}
        title={branchEdit ? "Edit Branch" : "Add Branch"}
      >
        <form onSubmit={saveBranch} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Branch Name</label>
            <input
              type="text"
              value={branchForm.branch_name}
              onChange={(e) =>
                setBranchForm((prev) => ({
                  ...prev,
                  branch_name: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Location</label>
            <textarea
              value={branchForm.location}
              onChange={(e) =>
                setBranchForm((prev) => ({ ...prev, location: e.target.value }))
              }
              rows={3}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Phone Number</label>
            <input
              type="text"
              value={branchForm.phone_number}
              onChange={(e) =>
                setBranchForm((prev) => ({
                  ...prev,
                  phone_number: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Email</label>
            <input
              type="email"
              value={branchForm.email}
              onChange={(e) =>
                setBranchForm((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Website</label>
            <input
              type="text"
              value={branchForm.website}
              onChange={(e) =>
                setBranchForm((prev) => ({ ...prev, website: e.target.value }))
              }
            />
          </div>
          <div className={styles.timeRow}>
            <div className={styles.fieldGroup}>
              <label>Open Time (24h)</label>
              <input
                type="time"
                value={branchForm.open_time}
                onChange={(e) =>
                  setBranchForm((prev) => ({
                    ...prev,
                    open_time: e.target.value,
                  }))
                }
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label>Close Time (24h)</label>
              <input
                type="time"
                value={branchForm.close_time}
                onChange={(e) =>
                  setBranchForm((prev) => ({
                    ...prev,
                    close_time: e.target.value,
                  }))
                }
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className={styles.saveBtn}
            disabled={branchSaving}
          >
            {branchSaving ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>

      <Modal
        isOpen={faqModal}
        onClose={() => setFaqModal(false)}
        title={faqEdit ? "Edit FAQ" : "Add FAQ"}
      >
        <form onSubmit={saveFaq} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Question</label>
            <input
              type="text"
              value={faqForm.title}
              onChange={(e) =>
                setFaqForm((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Answer</label>
            <textarea
              value={faqForm.content}
              onChange={(e) =>
                setFaqForm((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={4}
              required
            />
          </div>
          <button type="submit" className={styles.saveBtn} disabled={faqSaving}>
            {faqSaving ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
};

export default ContactsPage;
