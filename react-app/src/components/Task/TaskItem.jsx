
import React from 'react';
import { Edit3, Trash2, Calendar, Clock } from 'lucide-react';
import { formatDateTime, formatDate, isToday, isOverdue } from '../../utils/dateUtils';
import { TASK_STATUS, PRIORITY_COLORS } from '../../constants/taskConstants';

const TaskItem = ({ task, onToggleStatus, onEdit, onDelete }) => {
  const isCompleted = task.status === TASK_STATUS.COMPLETED;
  const isDue = task.dueDate && isOverdue(task.dueDate) && !isCompleted;
  const isDueToday = task.dueDate && isToday(task.dueDate) && !isCompleted;

  return (
    <div className={`bg-white rounded-xl shadow-md border-l-4 transition-all duration-200 hover:shadow-lg ${
      isCompleted ? 'border-green-500' : isDue ? 'border-red-500' : isDueToday ? 'border-yellow-500' : 'border-blue-500'
    }`}>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <button
                onClick={() => onToggleStatus(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  isCompleted
                    ? 'bg-green-500 border-green-500'
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                {isCompleted && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              
              <h3 className={`text-lg font-semibold ${
                isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'
              }`}>
                {task.title}
              </h3>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                PRIORITY_COLORS[task.priority]
              }`}>
                {task.priority}
              </span>
            </div>

            {task.description && (
              <p className={`text-gray-600 mb-3 ${
                isCompleted ? 'line-through opacity-75' : ''
              }`}>
                {task.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Created {formatDateTime(task.createdAt)}</span>
              </div>
              
              {task.dueDate && (
                <div className={`flex items-center space-x-1 ${
                  isDue ? 'text-red-600' : isDueToday ? 'text-yellow-600' : 'text-gray-500'
                }`}>
                  <Calendar className="w-4 h-4" />
                  <span>Due {formatDate(task.dueDate)}</span>
                  {isDue && <span className="text-red-600 font-medium">(Overdue)</span>}
                  {isDueToday && <span className="text-yellow-600 font-medium">(Today)</span>}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit task"
            >
              <Edit3 className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onDelete(task.id)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
