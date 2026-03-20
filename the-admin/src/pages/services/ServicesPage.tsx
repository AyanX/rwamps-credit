// Services admin — service cards with images and points
import { useState, type FormEvent } from 'react';
import { useData, type Service } from '../../context/DataContext';
import { api } from '../../api/api';
import { toast } from '../../components/Toast';
import { Pencil, Trash2, Plus, Check } from 'lucide-react';
import Modal from '../../components/Modal';
import ConfirmDialog from '../../components/ConfirmDialog';
import DynamicIcon from '../../components/DynamicIcon';
import IconPicker from '../../components/IconPicker/IconPicker';
import SkeletonLoader from '../../components/SkeletonLoader';
import styles from './ServicesPage.module.scss';

const ServicesPage = () => {
  const { services, setServices, dataLoading } = useData();
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, 'id'>>({ image: '', blur_image: '', title: '', content: '', icon: '', points: [''] });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const handleImageLoad = (serviceId: number) => {
    setImageLoaded((prev) => ({ ...prev, [serviceId]: true }));
  };

  const openEdit = (service: Service) => {
    setEditItem(service);
    setForm({ image: service.image, blur_image: service.blur_image, title: service.title, content: service.content, icon: service.icon, points: [...service.points] });
    setImageFile(null);
    setModal(true);
  };

  const openAdd = () => {
    setEditItem(null);
    setForm({ image: '', blur_image: '', title: '', content: '', icon: '', points: [''] });
    setImageFile(null);
    setModal(true);
  };

  const saveService = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      formData.append('icon', form.icon);
      formData.append('points', JSON.stringify(form.points));
      formData.append('blur_image', form.blur_image);
      formData.append('image_url', form.image);
      if (imageFile) formData.append('image', imageFile);

      if (editItem) {
        const res = await api.put.service(editItem.id, formData);
        setServices((prev) => prev.map((s) => (s.id === editItem.id ? (res.data.data || { ...editItem, ...form }) : s)));
        toast.success(res.data?.message || 'Service updated!');
      } else {
        const res = await api.post.service(formData);
        setServices((prev) => [res.data.data || { id: Date.now(), ...form }, ...prev]);
        toast.success(res.data?.message || 'Service added!');
      }
      setModal(false);
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.delete.service(deleteId);
      setServices((prev) => prev.filter((s) => s.id !== deleteId));
      toast.success('Deleted!');
    } catch { toast.error('Delete failed'); }
    finally { setDeleting(false); setDeleteId(null); }
  };

  const DummyLoader = () => <SkeletonLoader count={2} height="200px" />;

  if (dataLoading) return <DummyLoader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Services Management</h1>
          <p className={styles.pageDescription}>Add, edit or remove service cards displayed on the site.</p>
        </div>
        <button className={styles.addBtn} onClick={openAdd}><Plus size={18} /> Add Service</button>
      </div>

     {services.length < 1 && <DummyLoader/>}


      <div className={styles.serviceList}>
        {services.map((service, idx) => (
          <div key={service.id} className={`${styles.serviceRow} ${idx % 2 !== 0 ? styles.reversed : ''}`}>
            <div className={styles.imageCol}>
              {service.blur_image && !imageLoaded[service.id] && (
              <img src={service.blur_image} alt="" className={styles.blurPlaceholder} width={400} height={300} />
            )}
            <img
              src={service.image}
              alt={service.title || 'Service image'}
              loading="lazy"
              width={400}
              height={300}
              onLoad={() => handleImageLoad(service.id)}
              className={imageLoaded[service.id] ? styles.realImage : styles.realImageLoading}
            />
            <div className={styles.imageBadge}><DynamicIcon name={service.icon} size={16} /> {service.title}</div>
            </div>
            <div className={styles.textCol}>
              <DynamicIcon name={service.icon} size={24} />
              <h3>{service.title}</h3>
              <p>{service.content}</p>
              <div className={styles.features}>
                {service.points?.map((point, i) => (
                  <div key={i} className={styles.feature}><Check size={16} /> {point}</div>
                ))}
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => openEdit(service)}><Pencil size={16} /></button>
              <button className={styles.deleteBtn} onClick={() => setDeleteId(service.id)}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editItem ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={saveService} className={styles.form}>
          <div className={styles.fieldGroup}>
            <label>Icon</label>
            <IconPicker value={form.icon} onChange={(iconName) => setForm((prev) => ({ ...prev, icon: iconName }))} />
          </div>
          <div className={styles.fieldGroup}><label>Title</label><input type="text" value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} required /></div>
          <div className={styles.fieldGroup}><label>Description</label><textarea value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))} rows={3} required /></div>
          <div className={styles.fieldGroup}>
            <label>Image</label>
            <input type="file" accept="image/*" placeholder='noop'  onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            <small style={{ color: '#6b7280', fontSize: '0.8rem' }}>
              {imageFile ? 'Image file selected' : editItem?.image || form.image ? 'Image already selected' : 'No image selected'}
            </small>
            {(imageFile || editItem?.image || form.image) && (
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : editItem?.image || form.image}
                alt="Preview"
                className={styles.preview}
              />
            )}
          </div>
          <div className={styles.fieldGroup}>
            <label>Points</label>
            {form.points.map((point, i) => (
              <div key={i} className={styles.pointRow}>
                <input type="text" value={point} onChange={(e) => setForm((prev) => ({ ...prev, points: prev.points.map((x, j) => (j === i ? e.target.value : x)) }))} />
                {form.points.length > 1 && <button type="button" className={styles.removeBtn} onClick={() => setForm((prev) => ({ ...prev, points: prev.points.filter((_, j) => j !== i) }))}>×</button>}
              </div>
            ))}
            <button type="button" className={styles.addPointBtn} onClick={() => setForm((prev) => ({ ...prev, points: [...prev.points, ''] }))}>+ Add Point</button>
          </div>
          <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <ConfirmDialog isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} loading={deleting} />
    </div>
  );
};

export default ServicesPage;
