import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal.jsx';
import Button from './Button.jsx';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger'
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        
        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>
        
        <div className="flex space-x-3 justify-center">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant={type}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;