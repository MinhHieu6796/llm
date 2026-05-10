import { useState, useEffect } from 'react';
import { Modal } from '@/shared/ui/Modal';
import type { Task, Priority } from '@/entities/task';
import { useTaskStore } from '@/entities/task';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTask?: Task | null;
}

const initialForm = {
  title: '',
  description: '',
  project: '',
  dueDate: '',
  priority: 'medium' as Priority,
  tags: '',
  status: 'active' as 'active' | 'completed',
};

export const AddTaskModal = ({ isOpen, onClose, editTask }: AddTaskModalProps) => {
  const { addTask, updateTask } = useTaskStore();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editTask) {
      setForm({
        title: editTask.title,
        description: editTask.description || '',
        project: editTask.project || '',
        dueDate: editTask.dueDate ? editTask.dueDate.split('T')[0] : '',
        priority: editTask.priority,
        tags: editTask.tags.join(', '),
        status: editTask.status,
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [editTask, isOpen]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const tags = form.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editTask) {
      updateTask(editTask.id, {
        title: form.title.trim(),
        description: form.description.trim(),
        project: form.project.trim(),
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        priority: form.priority,
        tags,
        status: form.status,
      });
    } else {
      addTask({
        title: form.title.trim(),
        description: form.description.trim(),
        project: form.project.trim(),
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        priority: form.priority,
        tags,
        status: 'active',
      });
    }
    onClose();
  };

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const { [field]: _, ...rest } = e; return rest; });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editTask ? 'Edit Task' : 'Add Task'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 transition-all ${
              errors.title ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
            }`}
            placeholder="Enter task title"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 transition-all resize-none"
            placeholder="Enter description"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
            <input
              value={form.project}
              onChange={(e) => update('project', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="e.g. Website Redesign"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => update('dueDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select
              value={form.priority}
              onChange={(e) => update('priority', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 transition-all bg-white"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            value={form.tags}
            onChange={(e) => update('tags', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="Design, UI/UX, Backend (comma separated)"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {editTask ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
