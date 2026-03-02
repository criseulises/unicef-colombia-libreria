import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: string;
}

export default function StatCard({ label, value, icon: Icon, iconClassName = 'bg-blue-50 text-blue-600', trend }: Readonly<StatCardProps>) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className={`p-2.5 rounded-xl ${iconClassName} group-hover:scale-110 transition-transform duration-200`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
      {trend && (
        <p className="text-xs font-medium text-emerald-600 mt-1.5">{trend}</p>
      )}
    </div>
  );
}
