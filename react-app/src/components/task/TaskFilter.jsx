import React from 'react';
import { ListTodo, Clock, CheckCircle } from 'lucide-react';
import { TASK_FILTERS, FILTER_LABELS } from '../../constants/taskConstants';

const TaskFilter = ({ activeFilter, onFilterChange, taskStats }) => {
  const filters = [
    {
      key: TASK_FILTERS.ALL,
      label: FILTER_LABELS[TASK_FILTERS.ALL],
      icon: ListTodo,
      count: taskStats.total,
      color: 'text-blue-600'
    },
    {
      key: TASK_FILTERS.PENDING,
      label: FILTER_LABELS[TASK_FILTERS.PENDING],
      icon: Clock,
      count: taskStats.pending,
      color: 'text-orange-600'
    },
    {
      key: TASK_FILTERS.COMPLETED,
      label: FILTER_LABELS[TASK_FILTERS.COMPLETED],
      icon: CheckCircle,
      count: taskStats.completed,
      color: 'text-green-600'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Tasks</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filters.map(({ key, label, icon: Icon, count, color }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`p-4 rounded-xl transition-all duration-200 border-2 ${
              activeFilter === key
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="font-medium text-gray-900">{label}</span>
              </div>
              <span className={`text-2xl font-bold ${color}`}>
                {count}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskFilter;