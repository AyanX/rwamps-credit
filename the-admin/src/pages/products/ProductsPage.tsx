
import { useState, type FormEvent } from 'react';
import { useData, type Product } from '../../context/DataContext';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { Pencil, Trash2, Plus, ArrowRight } from 'lucide-react';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import DynamicIcon from '../../components/DynamicIcon';
import IconPicker from '../../components/IconPicker/IconPicker';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './ProductsPage.module.scss';

const ProductsPage = () => {
  const { products, setProducts, dataLoading } = useData();
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>({ icon: '', title: '', content: '', points: [''], bg_color: '#22C55E', text_color: '#FFFFFF' });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const openEdit = (product: Product) => {
    setEditItem(product);
    setForm({ icon: product.icon, title: product.title, content: product.content, points: [...product.points], bg_color: product.bg_color, text_color: product.text_color || '#FFFFFF' });
    setModal(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ icon: '', title: '', content: '', points: [''], bg_color: '#22C55E', text_color: '#FFFFFF' });
    setModal(true);
  };

  const handlePointChange = (index: number, value: string) => {
    setForm((prev) => ({ ...prev, points: prev.points.map((point, i) => (i === index ? value : point)) }));
  };

  const addPoint = () => setForm((prev) => ({ ...prev, points: [...prev.points, ''] }));
  const removePoint = (index: number) => setForm((prev) => ({ ...prev, points: prev.points.filter((_, i) => i !== index) }));

  const saveProduct = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editItem) {
        const res = await api.put.product(editItem.id, form);
        setProducts((prev) => prev.map((p) => (p.id === editItem.id ? (res.data?.data || { ...editItem, ...form }) : p)  ));
        toast.success(res.data?.message || 'Product updated!');
      } else {
        const res = await api.post.product(form);
        setProducts((prev) => [...prev, res.data?.data || { id: Date.now(), ...form }]);
        toast.success(res.data?.message || 'Product added!');
      }
      setModal(false);
    } catch {
      toast.error('Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete.product(deleteId);
      setProducts((prev) => prev.filter((p) => p.id !== deleteId));
      toast.success('Product deleted!');
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };
  
  const DummyLoader = () => <SkeletonLoader count={3} height="250px" />;


  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Products Management</h1>
          <p className={styles.pageDescription}>Add, edit or remove product cards displayed on the site.</p>
        </div>
        {products.length < 6 && (
          <button className={styles.addBtn} onClick={openAdd}><Plus size={18} /> Add Product</button>
        )}
      </div>

      {dataLoading || products.length < 1 ? <DummyLoader /> : null}


      <div className={styles.grid}>
        {products?.map((product) => (
          <div key={product.id} className={styles.card} style={{ background: product.bg_color }}>
            <div className={styles.cardInner}>
              <div className={styles.cardIcon}>
                <DynamicIcon name={product.icon} size={28} color='white'/>
              </div>
              <h3 className={styles.cardTitle} style={{ color: product.text_color || '#FFFFFF' }}>{product.title}</h3>
              <p className={styles.cardDesc} style={{ color: product.text_color || '#FFFFFF' }}>{product.content}</p>
              <ul className={styles.pointsList}>
                {product?.points?.map((point, i) => (
                  <li key={i} style={{ color: product.text_color || '#FFFFFF' }}><span className={styles.dot} />{point}</li>
                ))}
              </ul>
              <span className={styles.applyLink} style={{ color: product.text_color || '#FFFFFF' }}>Apply Now <ArrowRight size={16} /></span>
            </div>
            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => openEdit(product)}><Pencil size={16} /></button>
              {products.length > 2 && (
                <button className={styles.deleteBtn} onClick={() => setDeleteId(product.id)}><Trash2 size={16} /></button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      <Modal isOpen={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Product' : 'Add Product'}>
        <form onSubmit={saveProduct} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Icon</label>
            <IconPicker value={form.icon} onChange={(iconName) => setForm((prev) => ({ ...prev, icon: iconName }))} />
          </div>
          <div className={styles.fieldGroup}>
            <label>Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Description</label>
            <textarea value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} rows={3} required />
          </div>
          <div className={styles.fieldGroup}>
            <label>Background Color</label>
            <div className={styles.colorRow}>
              <input type="color" value={form.bg_color} onChange={(e) => setForm((prev) => ({ ...prev, bg_color: e.target.value }))} />
              <span>{form.bg_color}</span>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Text Color</label>
            <div className={styles.colorRow}>
              <input type="color" value={form.text_color} onChange={(e) => setForm((prev) => ({ ...prev, text_color: e.target.value }))} />
              <span>{form.text_color}</span>
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label>Features / Points</label>
            {form.points.map((point, i) => (
              <div key={i} className={styles.pointRow}>
                <input type="text" value={point} onChange={(e) => handlePointChange(i, e.target.value)} placeholder={`Point ${i + 1}`} />
                {form.points.length > 1 && (
                  <button type="button" className={styles.removePointBtn} onClick={() => removePoint(i)}>×</button>
                )}
              </div>
            ))}
            <button type="button" className={styles.addPointBtn} onClick={addPoint}>+ Add Point</button>
          </div>
          <button type="submit" className={styles.saveBtn} disabled={saving}>
            {saving ? 'Saving...' : 'Save Product'}
          </button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
};

export default ProductsPage;
