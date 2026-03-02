interface ProgressBarProps {
  label: string;
  count: number;
  total: number;
  color?: string;
}

export default function ProgressBar({ label, count, total, color }: Readonly<ProgressBarProps>) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700 capitalize">{label.replaceAll('_', ' ')}</span>
        <span className="text-gray-500 tabular-nums">{count} ({percentage}%)</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color ?? 'bg-unicef'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
