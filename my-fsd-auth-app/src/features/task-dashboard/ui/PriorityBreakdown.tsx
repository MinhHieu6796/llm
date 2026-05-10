import { useTaskStats } from '../model/useTaskStats';
import { Badge } from '@/shared/ui/Badge';

const priorityConfig = {
  low: { label: 'Low', badgeVariant: 'green' as const },
  medium: { label: 'Medium', badgeVariant: 'orange' as const },
  high: { label: 'High', badgeVariant: 'red' as const },
} as const;

export const PriorityBreakdown = () => {
  const { byPriority, total } = useTaskStats();

  if (total === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-sm">No tasks yet</p>
      </div>
    );
  }

  const maxCount = Math.max(byPriority.low, byPriority.medium, byPriority.high, 1);

  return (
    <div className="space-y-3">
      {(Object.keys(priorityConfig) as Array<keyof typeof priorityConfig>).map((key) => {
        const config = priorityConfig[key];
        const count = byPriority[key];
        const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
        const barWidth = Math.max((count / maxCount) * 100, 1);

        return (
          <div key={key} className="flex items-center gap-3">
            <Badge variant={config.badgeVariant} className="w-16 justify-center capitalize">
              {config.label}
            </Badge>
            <div className="flex-1 min-w-0">
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${barWidth}%`,
                    backgroundColor:
                      key === 'high'
                        ? '#FCA5A5'
                        : key === 'medium'
                          ? '#FDBA74'
                          : '#86EFAC',
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 w-20 justify-end">
              <span className="text-sm font-semibold text-gray-700 tabular-nums">
                {count}
              </span>
              <span className="text-xs text-gray-400 w-8 text-right">
                {percentage}%
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
