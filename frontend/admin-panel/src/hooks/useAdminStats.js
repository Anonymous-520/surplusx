import { useMemo } from 'react';

export function useAdminStats(users = [], reports = []) {
  return useMemo(
    () => ({
      totalUsers: users.length,
      openReports: reports.filter((r) => !r.resolved).length,
      resolvedReports: reports.filter((r) => r.resolved).length
    }),
    [users, reports]
  );
}