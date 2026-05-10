import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

interface TasksActivityChartProps {
  data: Array<{ date: string; count: number }>;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 border border-slate-200 shadow-md rounded-lg">
        <p className="text-xs font-medium text-slate-500 mb-1">
          {format(new Date(label), 'MMM dd, yyyy')}
        </p>
        <p className="text-sm font-bold text-slate-900">
          {payload[0].value} Tasks Created
        </p>
      </div>
    );
  }
  return null;
};

export const TasksActivityChart: React.FC<TasksActivityChartProps> = ({ data }) => {
  return (
    <div className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 w-full h-[400px]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Task Creation Trend</h3>
        <p className="text-sm text-slate-500">Number of tasks created over time</p>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0080FF" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#0080FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            vertical={false} 
            stroke="#f1f5f9" 
            strokeDasharray="3 3" 
          />
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }} 
            tickFormatter={(value) => format(new Date(value), 'MMM d')}
            minTickGap={30}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#64748b', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#0080FF', strokeWidth: 1 }} />
          <Area 
            type="monotone" 
            dataKey="count" 
            stroke="#0080FF" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorTasks)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
