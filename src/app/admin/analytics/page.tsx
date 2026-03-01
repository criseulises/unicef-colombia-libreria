import { BarChart3, Users, BookOpen, Download, Eye } from 'lucide-react';
import { getAnalyticsSummary, getAnalyticsBreakdowns } from '@/lib/analytics';
import StatCard from '@/components/ui/StatCard';
import ProgressBar from '@/components/ui/ProgressBar';

export default async function AnalyticsPage() {
  const [summary, breakdowns] = await Promise.all([
    getAnalyticsSummary(),
    getAnalyticsBreakdowns(),
  ]);

  const { totalSurveys, totalReads, totalDownloads } = summary;
  const { byRole, byGender, byBook, byAgeRange } = breakdowns;

  const sections = [
    { title: 'Por tipo de usuario', icon: Users, data: byRole, key: 'role' as const },
    { title: 'Por género', icon: Users, data: byGender, key: 'gender' as const },
    { title: 'Por libro', icon: BookOpen, data: byBook, key: 'bookTitle' as const },
    { title: 'Por rango de edad', icon: BarChart3, data: byAgeRange, key: 'ageRange' as const },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Estadísticas detalladas de la plataforma</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Total interacciones" value={totalSurveys} icon={Users} iconClassName="bg-purple-50 text-purple-600" />
        <StatCard label="Lecturas" value={totalReads} icon={Eye} iconClassName="bg-green-50 text-green-600" />
        <StatCard label="Descargas" value={totalDownloads} icon={Download} iconClassName="bg-orange-50 text-orange-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <section.icon size={18} className="text-unicef" />
              <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
            </div>
            <div className="space-y-3">
              {section.data.map((item) => {
                const label = (item as Record<string, unknown>)[section.key] as string || 'Sin especificar';
                return (
                  <ProgressBar
                    key={label}
                    label={label}
                    count={item._count}
                    total={totalSurveys}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
