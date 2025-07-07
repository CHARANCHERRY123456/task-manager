import { TASK_STATUS } from '../constants/taskConstants';

const STORAGE_KEY = 'personalTaskTracker';

export const taskService = {
  // Get all tasks
  getAllTasks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data).tasks || [] : [];
    } catch (error) {
      console.error('Error getting tasks:', error);
      return [];
    }
  },

  // Save tasks
  saveTasks: (tasks) => {
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      data.tasks = tasks;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  },

  // Add new task
  addTask: (taskData) => {
    const tasks = taskService.getAllTasks();
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || '',
      status: TASK_STATUS.PENDING,
      priority: taskData.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: taskData.dueDate || null
    };
    
    const updatedTasks = [...tasks, newTask];
    taskService.saveTasks(updatedTasks);
    return newTask;
  },

  // Update task
  updateTask: (id, updates) => {
    const tasks = taskService.getAllTasks();
    const updatedTasks = tasks.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    );
    taskService.saveTasks(updatedTasks);
    return updatedTasks.find(task => task.id === id);
  },

  // Delete task
  deleteTask: (id) => {
    const tasks = taskService.getAllTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    taskService.saveTasks(updatedTasks);
    return updatedTasks;
  },

  // Toggle task status
  toggleTaskStatus: (id) => {
    const tasks = taskService.getAllTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
      const newStatus = task.status === TASK_STATUS.PENDING ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING;
      return taskService.updateTask(id, { status: newStatus });
    }
    return null;
  },

  // Get task statistics
  getTaskStats: () => {
    const tasks = taskService.getAllTasks();
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === TASK_STATUS.COMPLETED).length,
      pending: tasks.filter(t => t.status === TASK_STATUS.PENDING).length
    };
  }
};