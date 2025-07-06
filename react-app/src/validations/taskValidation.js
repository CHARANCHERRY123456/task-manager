export const validateTask = (taskData) => {
    const errors = {};
  
    // Title validation
    if (!taskData.title || taskData.title.trim().length === 0) {
      errors.title = 'Task title is required';
    } else if (taskData.title.trim().length > 100) {
      errors.title = 'Task title must be less than 100 characters';
    }
  
    // Description validation
    if (taskData.description && taskData.description.length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }
  
    if (taskData.dueDate) {
      const dueDate = new Date(taskData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        errors.dueDate = 'Due date cannot be in the past';
      }
    }
  
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };