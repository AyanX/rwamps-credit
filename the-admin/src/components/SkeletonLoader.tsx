import styles from './SkeletonLoader.module.scss';

interface SkeletonLoaderProps {
  count?: number;
  height?: string;
  width?: string;
  style?: React.CSSProperties;
}

const SkeletonLoader = ({ count = 1, height = '120px', width = '100%', style }: SkeletonLoaderProps) => {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeleton} style={{ height, width, ...style }} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
