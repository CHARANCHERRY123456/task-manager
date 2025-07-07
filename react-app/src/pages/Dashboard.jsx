import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, LogOut, User, Search } from 'lucide-react';
import { taskService } from '../services/taskService';
import { authService } from '../services/authService';
import { TASK_FILTERS } from '../constants/taskConstants';
import TaskList from '../components/Task/TaskList';
import TaskForm from '../components/Task/TaskForm';
import TaskFilter from '../components/Task/TaskFilter';
import TaskStats from '../components/Task/TaskStats';
import ConfirmDialog from '../components/common/ConfirmDialog';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState(TASK_FILTERS.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, taskId: null });
  const [taskFormLoading, setTaskFormLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(currentUser);
    loadTasks();
  }, [navigate]);

  useEffect(() => {
    filterTasks();
  }, [tasks, activeFilter, searchQuery]);

  const loadTasks = () => {
    const allTasks = taskService.getAllTasks();
    setTasks(allTasks);
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    // Filter by status
    if (activeFilter !== TASK_FILTERS.ALL) {
      filtered = filtered.filter(task => task.status === activeFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredTasks(filtered);
  };

  const handleAddTask = async (taskData) => {
    setTaskFormLoading(true);
    try {
      taskService.addTask(taskData);
      loadTasks();
      setShowTaskForm(false);
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setTaskFormLoading(false);
    }
  };

  const handleUpdateTask = async (taskData) => {
    setTaskFormLoading(true);
    try {
      taskService.updateTask(editingTask.id, taskData);
      loadTasks();
      setShowTaskForm(false);
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setTaskFormLoading(false);
    }
  };

  const handleDeleteTask = (taskId) => {
    setDeleteConfirm({ show: true, taskId });
  };

  const confirmDeleteTask = () => {
    if (deleteConfirm.taskId) {
      taskService.deleteTask(deleteConfirm.taskId);
      loadTasks();
    }
    setDeleteConfirm({ show: false, taskId: null });
  };

  const handleToggleStatus = (taskId) => {
    taskService.toggleTaskStatus(taskId);
    loadTasks();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const taskStats = taskService.getTaskStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Task Tracker</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.username}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowTaskForm(true)}
                className="hidden sm:flex"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Task
              </Button>
              
              <Button
                onClick={handleLogout}
                variant="outline"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Task Statistics */}
          <TaskStats stats={taskStats} />

          {/* Task Filters */}
          <TaskFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            taskStats={taskStats}
          />

          {/* Search and Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Button
                onClick={() => setShowTaskForm(true)}
                className="w-full sm:w-auto"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Task
              </Button>
            </div>
          </div>

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onToggleStatus={handleToggleStatus}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </main>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={showTaskForm}
        onClose={handleCloseTaskForm}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        task={editingTask}
        loading={taskFormLoading}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, taskId: null })}
        onConfirm={confirmDeleteTask}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
};

export default Dashboard;