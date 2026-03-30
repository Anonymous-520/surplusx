export const adminStore = {
  users: [],
  reports: []
};

export function resetAdminStore() {
  adminStore.users = [];
  adminStore.reports = [];
}