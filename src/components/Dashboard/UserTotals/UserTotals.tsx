import { DashboardDataType } from '../../../types/dashboardDataType';

type UserTotalsProps = {
  dashboardData: DashboardDataType;
};

export default function UserTotals({ dashboardData }: UserTotalsProps) {
  return (
    <>
      <div>Total Users: {dashboardData?.totalUsers}</div>
      <div>Total Posts: {dashboardData?.totalPosts}</div>
      <div>Total Polls: {dashboardData?.totalPolls}</div>
      <div>Users registered via Odin: {dashboardData.providerOdinUsers}</div>
      <div>
        Users registered via Google: {dashboardData.providerGoogleUsers}
      </div>
      <div>
        Users registered via Discord: {dashboardData.providerDiscordUsers}
      </div>
    </>
  );
}
