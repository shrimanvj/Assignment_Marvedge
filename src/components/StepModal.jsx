import React, { useState, useEffect } from 'react';

const StepModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setImageUrl(initialData.imageUrl || '');
      setDescription(initialData.description || '');
    } else {
      setTitle('');
      setImageUrl('');
      setDescription('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, imageUrl, description });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="glass-card p-8 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-700 dark:text-blue-300 text-center">
          {initialData ? 'Edit Step' : 'Add Step'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 dark:bg-gray-800/80"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 dark:bg-gray-800/80"
            placeholder="Image URL"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            required
          />
          <textarea
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white/80 dark:bg-gray-800/80 resize-none min-h-[80px]"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StepModal; 