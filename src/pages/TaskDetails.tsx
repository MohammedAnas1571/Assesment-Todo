import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import handleApiError from '../utils/HandleApiError';
import { Task } from './Home';


const TaskDetails: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/task/${taskId}`,{withCredentials:true});
        setTask(response.data.data);
      } catch (err) {
        handleApiError(err);
      }
    };

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  return (
    <div className='w-full p-4 mt-16  sm:p-6 lg:p-8'>
      <div className='relative min-h-screen max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200 rounded-lg'>

        <h1 className='text-xl sm: font-bold'>Task Details</h1>
        <h2 className='text-base sm:text-lg font-semibold mt-4'>
          Title: <span>Task{" "}{task?.title }</span>
        </h2>
        <p className='text-sm sm:text-md font-semibold text-gray-500 my-2'>
          Description: {task?.description ?? 'No description available'}
        </p>
        <p className='text-xs text-gray-400 sm:text-sm font-semibold'>
          Created at: {task?.createdAt ? new Date(task.createdAt).toLocaleString() : 'No date available'}
        </p>

        <button
          className='absolute bottom-4 right-4 w-24 font-semibold sm:w-20 rounded-lg p-2 sm: bg-blue-600 text-white'
          onClick={() => navigate(-1)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
