import { useRef } from 'react';
import { DashboardDataType } from '../../../types/dashboardDataType';
import { useDimensions } from '../../../hooks/useDimensions';
import { PieChart } from '../../PieChart/PieChart';

type ProviderChatProps = {
  dashboardData: DashboardDataType;
};

export default function ProviderChart({ dashboardData }: ProviderChatProps) {
  const wrapperDivRef = useRef<HTMLDivElement | null>(null);
  const dimensions = useDimensions(wrapperDivRef);

  const pieChartData = {
    data: [
      {
        nameOfOption: 'Odin',
        selectionCount: dashboardData.providerOdinUsers,
      },
      {
        nameOfOption: 'Google',
        selectionCount: dashboardData.providerGoogleUsers,
      },
      {
        nameOfOption: 'Discord',
        selectionCount: dashboardData.providerDiscordUsers,
      },
    ],
  };

  return (
    <div
      ref={wrapperDivRef}
      className="flex flex-col justify-center items-center"
    >
      <div className="text-xl font-bold">Users by Provider:</div>
      <PieChart dimensions={dimensions} data={pieChartData.data} />
    </div>
  );
}
