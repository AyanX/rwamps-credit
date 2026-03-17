// Grid-based icon picker using lucide-react
import { useState, useMemo } from 'react';
import { icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import styles from './IconPicker.module.scss';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

const allIconNames = Object.keys(icons);

const IconPicker = ({ value, onChange }: IconPickerProps) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredIcons = useMemo(() => {
    const query = search.toLowerCase();
    return allIconNames.filter((name) => name.toLowerCase().includes(query)).slice(0, 60);
  }, [search]);

  const SelectedIcon = value ? (icons as Record<string, React.ComponentType<LucideProps>>)[value] : null;

  return (
    <div className={styles.picker}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {SelectedIcon ? <SelectedIcon size={20} /> : <span className={styles.placeholder}>Pick icon</span>}
        <span className={styles.iconName}>{value || 'None'}</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search icons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          <div className={styles.grid}>
            {filteredIcons.map((name) => {
              const Icon = (icons as Record<string, React.ComponentType<LucideProps>>)[name];
              return (
                <button
                  key={name}
                  type="button"
                  className={`${styles.iconBtn} ${name === value ? styles.active : ''}`}
                  onClick={() => { onChange(name); setIsOpen(false); setSearch(''); }}
                  title={name}
                >
                  <Icon size={18} />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
