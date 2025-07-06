import React, { useState, useEffect } from 'react';
import { Plus, Edit3 } from 'lucide-react';
import { validateTask } from '../../validations/taskValidation';
import { PRIORITY_LEVELS } from '../../constants/taskConstants';
import Button from '../common/Button';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Modal from '../common/Modal';

const TaskForm = ({ isOpen, onClose, onSubmit, task = null, loading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: PRIORITY_LEVELS.MEDIUM,
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || PRIORITY_LEVELS.MEDIUM,
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: PRIORITY_LEVELS.MEDIUM,
        dueDate: ''
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateTask(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      priority: PRIORITY_LEVELS.MEDIUM,
      dueDate: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={task ? 'Edit Task' : 'Add New Task'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="title"
          name="title"
          label="Task Title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />

        <TextArea
          id="description"
          name="description"
          label="Description (Optional)"
          placeholder="Enter task description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          rows={4}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={PRIORITY_LEVELS.LOW}>Low</option>
              <option value={PRIORITY_LEVELS.MEDIUM}>Medium</option>
              <option value={PRIORITY_LEVELS.HIGH}>High</option>
            </select>
          </div>

          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            label="Due Date (Optional)"
            value={formData.dueDate}
            onChange={handleChange}
            error={errors.dueDate}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={loading}
          >
            {task ? (
              <>
                <Edit3 className="w-4 h-4 mr-2" />
                Update Task
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;