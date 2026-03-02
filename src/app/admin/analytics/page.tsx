import { Users, BookOpen, Download, Eye, PieChart, Calendar } from 'lucide-react';
import { getAnalyticsSummary, getAnalyticsBreakdowns } from '@/lib/analytics';
import StatCard from '@/components/ui/StatCard';
import HorizontalBarChart from '@/components/ui/HorizontalBarChart';
import DonutChart from '@/components/ui/DonutChart';

const ROLE_COLORS: Record<string, string> = {
  nina: '#f472b6',
  nino: '#3b82f6',
  familia: '#fbbf24',
  docente: '#10b981',
  estudiante: '#06b6d4',
  otro: '#8b5cf6',
};

const GENDER_COLORS: Record<string, string> = {
  femenino: '#fb7185',
  masculino: '#3b82f6',
  otro: '#a78bfa',
  prefiero_no_decir: '#94a3b8',
};

const BOOK_COLORS = ['#00aeef', '#10b981', '#fbbf24', '#f472b6', '#8b5cf6'];

const AGE_COLORS: Record<string, string> = {
  '0-5': '#38bdf8',
  '6-10': '#14b8a6',
  '11+': '#6366f1',
};

type SectionConfig = {
  title: string;
  icon: typeof Users;
  data: { _count: number; [key: string]: unknown }[];
  key: string;
  colors: Record<string, string> | string[];
};

export default async function AnalyticsPage() {
  const [summary, breakdowns] = await Promise.all([
    getAnalyticsSummary(),
    getAnalyticsBreakdowns(),
  ]);

  const { totalSurveys, totalReads, totalDownloads } = summary;
  const { byRole, byGender, byBook, byAgeRange } = breakdowns;

  const sections: SectionConfig[] = [
    { title: 'Por tipo de usuario', icon: Users, data: byRole, key: 'role', colors: ROLE_COLORS },
    { title: 'Por genero', icon: Users, data: byGender, key: 'gender', colors: GENDER_COLORS },
    { title: 'Por libro', icon: BookOpen, data: byBook, key: 'bookTitle', colors: BOOK_COLORS },
    { title: 'Por rango de edad', icon: Calendar, data: byAgeRange, key: 'ageRange', colors: AGE_COLORS },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Estadisticas detalladas de la plataforma</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total interacciones" value={totalSurveys} icon={Users} iconClassName="bg-purple-50 text-purple-600" />
        <StatCard label="Lecturas" value={totalReads} icon={Eye} iconClassName="bg-emerald-50 text-emerald-600" />
        <StatCard label="Descargas" value={totalDownloads} icon={Download} iconClassName="bg-orange-50 text-orange-600" />
        {/* Donut inline */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-3">
            <PieChart size={16} className="text-unicef" />
            <span className="text-sm font-medium text-gray-500">Proporcion</span>
          </div>
          <DonutChart
            size={100}
            segments={[
              { label: 'Lecturas', value: totalReads, color: '#10b981' },
              { label: 'Descargas', value: totalDownloads, color: '#f97316' },
            ]}
          />
        </div>
      </div>

      {/* Breakdown sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-5">
              <section.icon size={18} className="text-unicef" />
              <h2 className="text-lg font-bold text-gray-800">{section.title}</h2>
            </div>
            <HorizontalBarChart
              data={section.data.map((item, i) => {
                const label = (item as Record<string, unknown>)[section.key] as string || 'Sin especificar';
                const colorMap = section.colors;
                const color = Array.isArray(colorMap)
                  ? colorMap[i % colorMap.length]
                  : colorMap[label] ?? '#9ca3af';
                return { label: label.replaceAll('_', ' '), value: item._count, color };
              })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
