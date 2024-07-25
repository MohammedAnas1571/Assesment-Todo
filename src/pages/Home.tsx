import React, { useEffect, useState } from 'react';
import AddTaskDialog from '../components/Addtask';

import axios from 'axios';
import TaskCard from '../components/TaskCard';
import handleApiError from '../utils/HandleApiError';

export interface Task {
  _id: string;
  description: string;
  status: 'Todo' | 'InProgress' | 'Done';
  createdAt: string; 
  title:string;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`); 
        setTasks(response.data.data);
      } catch (err) {
        handleApiError(err)
      }
    };

    fetchTasks();
  }, []);

 
  const todoTasks = tasks.filter(task => task.status === 'Todo');
  const inProgressTasks = tasks.filter(task => task.status === 'InProgress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  return (
    <div className="max-w-[1250px] px-4">
      <div className="max-w-[1050px] mx-auto p-3 mt-4">
        <AddTaskDialog>
          <button className="bg-blue-600 text-center text-white p-2 rounded-md w-full sm:w-[150px]">Add Task</button>
        </AddTaskDialog>
        <div className="mt-5 border p-2 border-slate-200 shadow-md flex flex-col sm:flex-row justify-between items-center rounded-md">
          <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
            <p className="text-sm font-semibold">Search:</p>
            <input
              type="text"
              placeholder="Search"
              className="ml-2 w-full py-1 px-2 border rounded-md focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <p className="text-sm font-semibold">Sort By:</p>
            <select className="border-2 border-black rounded-md w-full sm:w-auto">
              <option value="">Recent</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-5 gap-4">
          <div className="w-full sm:w-[330px] min-h-[400px] bg-white border border-gray-200 rounded-lg shadow p-4">
            <p className="mb-3 p-1 font-bold text-white bg-blue-400">TODO</p>
          
              {todoTasks.map((task) => (
                <TaskCard key={task._id} task={task}  />
              ))}
       
          </div>
          <div className="w-full sm:w-[330px] min-h-[400px] bg-white border border-gray-200 rounded-lg shadow p-4">
            <p className="mb-3 p-1 font-bold text-white bg-blue-400 ">IN PROGRESS</p>
           
              {inProgressTasks?.map((task) => (
                <TaskCard key={task._id} task={task}  />
              ))}
          
          </div>
          <div className="w-full sm:w-[330px] min-h-[400px] bg-white border border-gray-200 rounded-lg shadow p-4">
            <p className="mb-3 p-1 font-bold text-white bg-blue-400 ">DONE</p>
        
              {doneTasks?.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
