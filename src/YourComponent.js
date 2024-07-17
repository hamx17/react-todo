import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTasksToList, deleteToDoList, updateList } from './actions';
import EditModal from './EditModal';


const YourComponent = ({ addTasksToList, lists, deleteToDoList, updateList }) => {
  const [listTitle, setListTitle] = useState('');
  const [tasks, setTasks] = useState(['']);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editListIndex, setEditListIndex] = useState(null);
  const listsPerPage = 5;

  const handleAddList = () => {
    if (listTitle.trim() !== '') {
      addTasksToList(listTitle, tasks.filter(task => task.trim() !== ''));
      setListTitle('');
      setTasks(['']);
    }
  };

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredLists = lists.filter(list =>
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastList = currentPage * listsPerPage;
  const indexOfFirstList = indexOfLastList - listsPerPage;
  const currentLists = filteredLists.slice(indexOfFirstList, indexOfLastList);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredLists.length / listsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map(number => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className={number === currentPage ? 'active' : ''}
      >
        {number}
      </button>
    ));
  };

  const handleEdit = (index) => {
    setEditListIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditListIndex(null);
  };

  const handleSaveEdit = (title, tasks) => {
    updateList(editListIndex, title, tasks);
    handleModalClose();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="List Title"
        value={listTitle}
        onChange={e => setListTitle(e.target.value)}
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
      <button onClick={handleAddList}>Add List</button>

      <input
        type="text"
        placeholder="Search Lists"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {currentLists.map((list, index) => (
        <div key={index}>
          <h2>{list.title}</h2>
          <ul>
            {list.tasks.map((task, taskIndex) => (
              <li key={taskIndex}>{taskIndex + 1}. {task}</li>
            ))}
          </ul>
          <button onClick={() => deleteToDoList(indexOfFirstList + index)}>Delete</button>
          <button onClick={() => handleEdit(indexOfFirstList + index)}>Edit</button>
        </div>
      ))}

      <div className="pagination">
        {renderPageNumbers()}
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        list={editListIndex !== null ? lists[editListIndex] : null}
        onSave={handleSaveEdit}
      />
    </div>
  );
};



const mapDispatchToProps = {
  addTasksToList,
  deleteToDoList,
  updateList,
};

const mapStateToProps = state => ({
    lists: state.lists, // Assuming your state has a 'lists' property containing the lists data
  });

export default connect( mapStateToProps, mapDispatchToProps,)(YourComponent);
