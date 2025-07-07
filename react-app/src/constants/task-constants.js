export const TASK_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed'
  };
  
  export const TASK_FILTERS = {
    ALL: 'all',
    PENDING: 'pending',
    COMPLETED: 'completed'
  };
  
  export const FILTER_LABELS = {
    [TASK_FILTERS.ALL]: 'All Tasks',
    [TASK_FILTERS.PENDING]: 'Pending',
    [TASK_FILTERS.COMPLETED]: 'Completed'
  };
  
  export const PRIORITY_LEVELS = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high'
  };
  
  export const PRIORITY_COLORS = {
    [PRIORITY_LEVELS.LOW]: 'bg-green-100 text-green-800',
    [PRIORITY_LEVELS.MEDIUM]: 'bg-yellow-100 text-yellow-800',
    [PRIORITY_LEVELS.HIGH]: 'bg-red-100 text-red-800'
  };