import { type LucideIcon } from 'lucide-react';

const variants = {
  success: 'text-green-700 bg-green-50',
  warning: 'text-orange-700 bg-orange-50',
  neutral: 'text-gray-500 bg-gray-100',
} as const;

interface StatusBadgeProps {
  label: string;
  variant?: keyof typeof variants;
  icon?: LucideIcon;
}

export default function StatusBadge({ label, variant = 'neutral', icon: Icon }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${variants[variant]}`}>
      {Icon && <Icon size={12} />}
      {label}
    </span>
  );
}
