import { getDashboardStats } from "./dashboard.repository.js";

export const fetchDashboard = async () => {
  return await getDashboardStats();
};