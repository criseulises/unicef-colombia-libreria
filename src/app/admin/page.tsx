import { BookOpen, Download, Users, Eye, TrendingUp, BarChart3, PieChart } from 'lucide-react';
import { getAnalyticsSummary, getAnalyticsBreakdowns, getRecentActivity } from '@/lib/analytics';
import StatCard from '@/components/ui/StatCard';
import HorizontalBarChart from '@/components/ui/HorizontalBarChart';
import StatusBadge from '@/components/ui/StatusBadge';
import DonutChart from '@/components/ui/DonutChart';

const ROLE_COLORS: Record<string, string> = {
  nina: '#f472b6',
  nino: '#3b82f6',
  familia: '#fbbf24',
  docente: '#10b981',
  estudiante: '#06b6d4',
  otro: '#8b5cf6',
};

const BOOK_COLORS = ['#00aeef', '#10b981', '#fbbf24', '#f472b6', '#8b5cf6'];

export default async function AdminDashboard() {
  const [summary, breakdowns, recentSurveys] = await Promise.all([
    getAnalyticsSummary(),
    getAnalyticsBreakdowns(),
    getRecentActivity(10),
  ]);

  const { totalBooks, totalSurveys, totalReads, totalDownloads } = summary;
  const { byRole, byBook } = breakdowns;

  const stats = [
    { label: 'Libros publicados', value: totalBooks, icon: BookOpen, iconClassName: 'bg-blue-50 text-blue-600' },
    { label: 'Total interacciones', value: totalSurveys, icon: Users, iconClassName: 'bg-purple-50 text-purple-600' },
    { label: 'Lecturas', value: totalReads, icon: Eye, iconClassName: 'bg-emerald-50 text-emerald-600' },
    { label: 'Descargas', value: totalDownloads, icon: Download, iconClassName: 'bg-orange-50 text-orange-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Resumen general de la plataforma</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Middle row: Donut + Popular Books + By Role */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Reads vs Downloads donut */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <PieChart size={18} className="text-unicef" />
            <h2 className="text-lg font-bold text-gray-800">Lecturas vs Descargas</h2>
          </div>
          <DonutChart
            segments={[
              { label: 'Lecturas', value: totalReads, color: '#10b981' },
              { label: 'Descargas', value: totalDownloads, color: '#f97316' },
            ]}
          />
        </div>

        {/* Top Books */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-unicef" />
            <h2 className="text-lg font-bold text-gray-800">Libros mas populares</h2>
          </div>
          <HorizontalBarChart
            data={byBook.map((item, i) => ({
              label: item.bookTitle,
              value: item._count,
              color: BOOK_COLORS[i % BOOK_COLORS.length],
            }))}
          />
        </div>

        {/* By Role */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 size={18} className="text-unicef" />
            <h2 className="text-lg font-bold text-gray-800">Por tipo de usuario</h2>
          </div>
          <HorizontalBarChart
            data={byRole.map((item) => ({
              label: item.role,
              value: item._count,
              color: ROLE_COLORS[item.role] ?? '#9ca3af',
            }))}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Actividad reciente</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Libro</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Genero</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Accion</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentSurveys.map((survey, i) => (
                <tr key={survey.id} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                  <td className="py-3 px-3 font-medium text-gray-700">{survey.bookTitle}</td>
                  <td className="py-3 px-3 text-gray-600 capitalize">{survey.role}</td>
                  <td className="py-3 px-3 text-gray-600 capitalize">{survey.gender.replaceAll('_', ' ')}</td>
                  <td className="py-3 px-3">
                    <StatusBadge
                      label={survey.action}
                      variant={survey.action === 'leer' ? 'success' : 'warning'}
                      icon={survey.action === 'leer' ? Eye : Download}
                    />
                  </td>
                  <td className="py-3 px-3 text-gray-500">
                    {survey.timestamp.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
