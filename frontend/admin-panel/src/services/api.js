export async function getAdminDashboardData() {
  return {
    totalUsers: 0,
    totalDonations: 0,
    successfulDeliveries: 0,
    systemHealth: 100
  };
}

export async function getRecentActivity() {
  return [];
}