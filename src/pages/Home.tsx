import React, { useEffect, useState, useCallback } from 'react';
import AddTaskDialog from '../components/Addtask';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import handleApiError from '../utils/HandleApiError';
import { debounce } from 'lodash';
import { FaSearch } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

export interface Task {
  _id: string;
  description: string;
  status: 'Todo' | 'InProgress' | 'Done';
  createdAt: string;
  title: string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('all');

  const fetchTasks = async (query = '', sort = 'all') => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`, {
        params: { search: query, sort },
        withCredentials: true,
      });
      setTasks(response.data.data);
    } catch (err) {
      handleApiError(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const debouncedFetchTasks = useCallback(debounce(fetchTasks, 300), []);

  useEffect(() => {
    debouncedFetchTasks(searchQuery, sortOption);
  }, [searchQuery, sortOption, debouncedFetchTasks]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const draggedTask = tasks.find(task => task._id === draggableId);
    if (!draggedTask) return;

    const updatedTask = { ...draggedTask, status: destination.droppableId as 'Todo' | 'InProgress' | 'Done' };
    const updatedTasks = tasks.map(task => task._id === draggableId ? updatedTask : task);

    setTasks(updatedTasks);

    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${draggableId}`, { status: destination.droppableId }, { withCredentials: true });
    } catch (err) {
      handleApiError(err);
    }
  };

  const todoTasks = tasks.filter(task => task.status === 'Todo');
  const inProgressTasks = tasks.filter(task => task.status === 'InProgress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  return (
    <div className="max-w-[1250px] px-4 mt-16">
      <div className="max-w-[1050px] mx-auto p-3 mt-4">
        <AddTaskDialog>
          <button className="bg-blue-600 text-center text-white p-2 rounded-md w-full sm:w-[150px]">Add Task</button>
        </AddTaskDialog>
        <div className="mt-5 border p-2 border-slate-200 shadow-md flex flex-col sm:flex-row justify-between items-center rounded-md">
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            <p className="text-sm font-semibold">Search:</p>
            <div className="relative ml-2">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search"
                className="w-96 py-1 px-2 border rounded-md focus:outline-none"
              />
              <FaSearch className="absolute right-2 top-2 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <p className="text-sm font-semibold">Sort By:</p>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="border-2 border-black rounded-md w-full sm:w-auto"
            >
              <option value="all">All</option>
              <option value="week">Last Week</option>
              <option value="two_weeks">Last 2 Weeks</option>
            </select>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex flex-col sm:flex-row justify-between mt-5 gap-4">
            <Droppable droppableId="Todo">
              {(provided) => (
                <div
                  className="w-full sm:w-[330px] min-h-[400px] bg-white border border-gray-200 rounded-lg shadow p-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <p className="mb-3 p-1 font-bold text-white bg-blue-400">TODO</p>
                  {todoTasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="InProgress">
              {(provided) => (
                <div
                  className="w-full sm:w-[330px] min-h-[400px] bg-white border border-gray-200 rounded-lg shadow p-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <p className="mb-3 p-1 font-bold text-white bg-blue-400">IN PROGRESS</p>
                  {inProgressTasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="Done">
              {(provided) => (
                <div
                  className="w-full sm:w-[330px] min-h-[400px] bg-white border border-gray-200 rounded-lg shadow p-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <p className="mb-3 p-1 font-bold text-white bg-blue-400">DONE</p>
                  {doneTasks.map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Home;
