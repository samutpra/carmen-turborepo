import React from 'react';

type SummaryCardProps = {
  title: string;
  count: number;
  icon?: React.ReactNode;
};

const SummaryCard = ({ title, count, icon }: SummaryCardProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {icon && <div className="text-gray-500">{icon}</div>}
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <p className="text-3xl font-semibold text-gray-700">{count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard; 