interface ProgressBarProps {
  label: string;
  count: number;
  total: number;
}

export default function ProgressBar({ label, count, total }: ProgressBarProps) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700 capitalize">{label.replaceAll('_', ' ')}</span>
        <span className="text-gray-500">{count} ({percentage}%)</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-unicef rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
