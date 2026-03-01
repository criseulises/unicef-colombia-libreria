import { prisma } from '@/lib/prisma';

export async function getAnalyticsSummary() {
  const [totalBooks, totalSurveys, totalReads, totalDownloads] = await Promise.all([
    prisma.book.count(),
    prisma.surveyResponse.count(),
    prisma.surveyResponse.count({ where: { action: 'leer' } }),
    prisma.surveyResponse.count({ where: { action: 'descargar' } }),
  ]);

  return { totalBooks, totalSurveys, totalReads, totalDownloads };
}

export async function getAnalyticsBreakdowns() {
  const [byRole, byGender, byAction, byBook, byAgeRange] = await Promise.all([
    prisma.surveyResponse.groupBy({ by: ['role'], _count: true, orderBy: { _count: { role: 'desc' } } }),
    prisma.surveyResponse.groupBy({ by: ['gender'], _count: true, orderBy: { _count: { gender: 'desc' } } }),
    prisma.surveyResponse.groupBy({ by: ['action'], _count: true }),
    prisma.surveyResponse.groupBy({ by: ['bookTitle'], _count: true, orderBy: { _count: { bookTitle: 'desc' } } }),
    prisma.surveyResponse.groupBy({ by: ['ageRange'], _count: true, orderBy: { _count: { ageRange: 'desc' } } }),
  ]);

  return { byRole, byGender, byAction, byBook, byAgeRange };
}

export async function getRecentActivity(limit = 10) {
  return prisma.surveyResponse.findMany({
    orderBy: { timestamp: 'desc' },
    take: limit,
  });
}
