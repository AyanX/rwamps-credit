// About admin — mission & vision cards
import { useState, type FormEvent } from "react";
import { useData } from "../../context/DataContext";
import { api } from "../../api/api";
import { toast } from "../../components/Toast";
import { Pencil, Trash2 } from "lucide-react";
import Modal from "../../components/Modal";
import DynamicIcon from "../../components/DynamicIcon";
import IconPicker from "../../components/IconPicker/IconPicker";
import SkeletonLoader from "../../components/SkeletonLoader";
import styles from "./AboutPage.module.scss";
import ConfirmDialog from "@/components/ConfirmDialog";

const AboutPage = () => {
  const { about, setAbout, dataLoading } = useData();
  const [modal, setModal] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [form, setForm] = useState({
    id: 0,
    name: "",
    icon: "",
    title: "",
    content: "",
    bg_color: "#22C55E",
    text_color: "#FFFFFF",
  });
  const [saving, setSaving] = useState(false);

    //Delete handler ==========
    const [deleteTarget, setDeleteTarget] = useState<
      { id: number }
      | null
    >(null);

  const openEdit = (item: {
    id: number;
    name: string;
    icon: string;
    title: string;
    content: string;
    bg_color: string;
    text_color: string;
  }) => {
    setEditItemId(item.id);
    setForm({ ...item });
    setModal(true);
  };

  const saveAbout = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updatedItem = { ...form, id: editItemId ?? form.id };
      const res = await api.put.about(updatedItem);
      setAbout((prev) =>
        prev.map((item) =>
          item.id === updatedItem.id ? res.data?.data || updatedItem : item,
        ),
      );
      toast.success(
        res.data?.message || `${updatedItem.name || "Section"} updated!`,
      );
      setModal(false);
    } catch {
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if(!deleteTarget) return;
setSaving(true);
    try {
      
      await api.delete.about(deleteTarget.id);
      setAbout((prev) => prev.filter((item) => item.id !== deleteTarget.id));
      toast.success("Section deleted!");
    } catch (error) {
      toast.error("Failed to delete section");
    } finally {
      setSaving(false);
      setDeleteTarget(null);
    }
  };

  const DummyLoader = () => <SkeletonLoader count={2} height="200px" />;

  if (dataLoading) return DummyLoader();

  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>About Management</h1>
      <p className={styles.pageDescription}>
        Edit the vision, mission, and other about sections.
      </p>

      {about.length === 0 && DummyLoader()}

      <div className={styles.cardGrid}>
        {about.map((item) => (
          <div
            key={item.id}
            className={styles.card}
            style={{ background: item.bg_color || "#22C55E" }}
          >
            <div className={styles.cardIcon}>
              <DynamicIcon name={item.icon || "Target"} size={28} />
            </div>
            <h3 style={{ color: item.text_color || '#FFFFFF' }}>{item.title}</h3>
            <p style={{ color: item.text_color || '#FFFFFF' }}>{item.content}</p>
            <div className={styles.btnActions}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => openEdit(item)}
              >
                <Pencil size={16} />
              </button>
              <button
                type="button"
                className={styles.editBtn}
                onClick={() => setDeleteTarget({ id: item.id })}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modal}
        onClose={() => setModal(false)}
        title={`Edit ${form.name || "Section"}`}
      >
        <form onSubmit={saveAbout} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Icon</label>
            <IconPicker
              value={form.icon}
              onChange={(iconName) =>
                setForm((prev) => ({ ...prev, icon: iconName }))
              }
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Content</label>
            <textarea
              value={form.content}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={4}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label>Background Color</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={form.bg_color}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, bg_color: e.target.value }))
                }
              />
              <span>{form.bg_color}</span>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Text Color</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={form.text_color}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, text_color: e.target.value }))
                }
              />
              <span>{form.text_color}</span>
            </div>
          </div>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </Modal>


            <ConfirmDialog
              isOpen={!!deleteTarget}
              onClose={() => setDeleteTarget(null)}
              onConfirm={handleDelete}
              loading={saving}
            />
         
    </div>
  );
};

export default AboutPage;
