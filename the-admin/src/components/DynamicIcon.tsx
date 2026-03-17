// Renders a Lucide icon by name — used for dynamic icon display
import { icons } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const Icon = (icons as Record<string, React.ComponentType<LucideProps>>)[name];

  if (!Icon) {
    // fallback if icon name doesn't match
    return <span style={{ fontSize: props.size || 24 }}>⚙️</span>;
  }

  return <Icon {...props} />;
};

export default DynamicIcon;
