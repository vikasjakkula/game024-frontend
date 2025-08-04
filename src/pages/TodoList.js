import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Todo from '../hard/todo-list';

const TodoList = () => {
  const [todoList] = useState(() => new Todo());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');

  // Update tasks state whenever todoList changes
  useEffect(() => {
    setTasks(todoList.getAll());
  }, [todoList]);

  const addTask = () => {
    if (newTask.trim()) {
      todoList.add(newTask.trim());
      setTasks(todoList.getAll());
      setNewTask('');
    }
  };

  const removeTask = (index) => {
    todoList.remove(index);
    setTasks(todoList.getAll());
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditValue(tasks[index]);
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      todoList.update(editingIndex, editValue.trim());
      setTasks(todoList.getAll());
      setEditingIndex(-1);
      setEditValue('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(-1);
    setEditValue('');
  };

  const clearAll = () => {
    todoList.clear();
    setTasks(todoList.getAll());
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editingIndex >= 0) {
        saveEdit();
      } else {
        addTask();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            📝 Todo List
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your tasks efficiently
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          {/* Add Task Section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addTask}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Add
            </motion.button>
          </div>

          {/* Task Count */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600 dark:text-gray-300">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </span>
            {tasks.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAll}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
              >
                Clear All
              </motion.button>
            )}
          </div>

          {/* Tasks List */}
          <AnimatePresence>
            {tasks.map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2"
              >
                {editingIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                      autoFocus
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={saveEdit}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                    >
                      Save
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={cancelEdit}
                      className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors text-sm"
                    >
                      Cancel
                    </motion.button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 text-gray-800 dark:text-white">
                      {task}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startEdit(index)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                    >
                      Edit
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeTask(index)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete
                    </motion.button>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {tasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500 dark:text-gray-400"
            >
              No tasks yet. Add one above!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TodoList; 