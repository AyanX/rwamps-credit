
import { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './Toast.module.scss';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let toastListeners: ((toasts: ToastItem[]) => void)[] = [];
let toasts: ToastItem[] = [];
let nextId = 1;

const updateToasts = (newToasts: ToastItem[]) => {
  toasts = newToasts;
  toastListeners.forEach((listener) => listener(toasts));
};

export const toast = {
  success: (message: string) => {
    const id = nextId++;
    updateToasts([...toasts, { id, message, type: 'success' }]);
    setTimeout(() => updateToasts(toasts.filter((t) => t.id !== id)), 4000);
  },
  error: (message: string) => {
    const id = nextId++;
    updateToasts([...toasts, { id, message, type: 'error' }]);
    setTimeout(() => updateToasts(toasts.filter((t) => t.id !== id)), 5000);
  },
  info: (message: string) => {
    const id = nextId++;
    updateToasts([...toasts, { id, message, type: 'info' }]);
    setTimeout(() => updateToasts(toasts.filter((t) => t.id !== id)), 4000);
  },
};

const ToastIcon = ({ type }: { type: ToastType }) => {
  if (type === 'success') return <CheckCircle size={18} />;
  if (type === 'error') return <AlertCircle size={18} />;
  return <Info size={18} />;
};

const ToastContainer = () => {
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    toastListeners.push(setItems);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setItems);
    };
  }, []);

  const dismiss = useCallback((id: number) => {
    updateToasts(toasts.filter((t) => t.id !== id));
  }, []);

  return (
    <div className={styles.container}>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className={`${styles.toast} ${styles[item.type]}`}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ToastIcon type={item.type} />
            <span className={styles.message}>{item.message}</span>
            <button className={styles.closeBtn} onClick={() => dismiss(item.id)} aria-label="Close">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
