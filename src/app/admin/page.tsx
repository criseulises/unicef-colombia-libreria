import { BookOpen, Download, Users, Eye, TrendingUp, BarChart3 } from 'lucide-react';
import { getAnalyticsSummary, getAnalyticsBreakdowns, getRecentActivity } from '@/lib/analytics';
import StatCard from '@/components/ui/StatCard';
import ProgressBar from '@/components/ui/ProgressBar';
import StatusBadge from '@/components/ui/StatusBadge';

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
    { label: 'Lecturas', value: totalReads, icon: Eye, iconClassName: 'bg-green-50 text-green-600' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Books */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-unicef" />
            <h2 className="text-lg font-bold text-gray-800">Libros más populares</h2>
          </div>
          <div className="space-y-3">
            {byBook.map((item, i) => (
              <div key={item.bookTitle} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-400 w-6">{i + 1}.</span>
                  <span className="text-sm font-medium text-gray-700">{item.bookTitle}</span>
                </div>
                <span className="text-sm font-bold text-unicef">{item._count} interacciones</span>
              </div>
            ))}
          </div>
        </div>

        {/* By Role */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-unicef" />
            <h2 className="text-lg font-bold text-gray-800">Por tipo de usuario</h2>
          </div>
          <div className="space-y-3">
            {byRole.map((item) => (
              <ProgressBar
                key={item.role}
                label={item.role}
                count={item._count}
                total={totalSurveys}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Actividad reciente</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Libro</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Rol</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Género</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Acción</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {recentSurveys.map((survey) => (
                <tr key={survey.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-2.5 px-3 font-medium text-gray-700">{survey.bookTitle}</td>
                  <td className="py-2.5 px-3 text-gray-600 capitalize">{survey.role}</td>
                  <td className="py-2.5 px-3 text-gray-600 capitalize">{survey.gender.replaceAll('_', ' ')}</td>
                  <td className="py-2.5 px-3">
                    <StatusBadge
                      label={survey.action}
                      variant={survey.action === 'leer' ? 'success' : 'warning'}
                      icon={survey.action === 'leer' ? Eye : Download}
                    />
                  </td>
                  <td className="py-2.5 px-3 text-gray-500">
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
