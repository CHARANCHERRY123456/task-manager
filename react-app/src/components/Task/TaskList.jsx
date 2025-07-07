
import React from 'react';
import { ListTodo, CheckCircle } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleStatus, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ListTodo className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
        <p className="text-gray-600">Create your first task to get started!</p>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const pendingTasks = tasks.filter(task => task.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ListTodo className="w-5 h-5 mr-2 text-orange-600" />
            Pending Tasks ({pendingTasks.length})
          </h3>
          <div className="space-y-4">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Completed Tasks ({completedTasks.length})
          </h3>
          <div className="space-y-4">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
