
import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, list, onSave }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (list) {
      setTitle(list.title);
      setTasks(list.tasks);
    }
  }, [list]);

  const handleTaskChange = (index, value) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const handleAddTaskInput = () => {
    setTasks([...tasks, '']);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleSave = () => {
    onSave(title, tasks);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit List</h2>
        <input
          type="text"
          placeholder="List Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {tasks.map((task, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Task"
              value={task}
              onChange={e => handleTaskChange(index, e.target.value)}
            />
            <button onClick={() => handleDeleteTask(index)}>Delete Task</button>
          </div>
        ))}
        <button onClick={handleAddTaskInput}>Add Task</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default EditModal;