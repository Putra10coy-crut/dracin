import { Statistics } from '@/types/statistics';

interface StatisticsCardProps {
  statistic: Statistics;
}

export default function StatisticsCard({ statistic }: StatisticsCardProps) {
  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <span className="material-icons text-green-500 text-sm">trending_up</span>;
      case 'down':
        return <span className="material-icons text-red-500 text-sm">trending_down</span>;
      case 'stable':
        return <span className="material-icons text-gray-500 text-sm">trending_flat</span>;
      default:
        return null;
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'stable':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatValue = (value: number | string): string => {
    if (typeof value === 'number') {
      if (value >= 1000000) {
        return `${(value / 1000000).toFixed(1)}M`;
      } else if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}K`;
      }
      return value.toLocaleString();
    }
    return value.toString();
  };

  return (
    <div className="bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-800">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-secondary-text-light dark:text-secondary-text-dark">
          {statistic.title}
        </h3>
        {getTrendIcon(statistic.trend)}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-text-light dark:text-text-dark">
            {formatValue(statistic.value)}
          </p>
          {statistic.percentage !== undefined && (
            <div className={`flex items-center text-xs ${getTrendColor(statistic.trend)}`}>
              {statistic.percentage > 0 && '+'}
              {statistic.percentage}%
              <span className="ml-1 text-secondary-text-light dark:text-secondary-text-dark">
                vs last month
              </span>
            </div>
          )}
        </div>
      </div>
      
      {statistic.description && (
        <p className="text-xs text-secondary-text-light dark:text-secondary-text-dark mt-2">
          {statistic.description}
        </p>
      )}
    </div>
  );
}