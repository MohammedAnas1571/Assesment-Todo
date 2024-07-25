import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import handleApiError from '../utils/HandleApiError';

// Define the Task type (make sure this matches your API response structure)
interface Task {
  taskNumber: string;
  description: string;
  createdAt: string;
}

const TaskDetails: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>(); 
  const [task, setTask] = useState<Task | undefined>(undefined); 

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/tasks/${taskId}`);
        setTask(response.data);
      } catch (err) {
        handleApiError(err);
      }
    };

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  return (
    <div className='w-full p-5'>
      <div className='relative min-h-screen max-w-2xl mx-auto p-5 shadow-lg border border-slate-200'>
        <h1 className='text-2xl font-bold'>Task Details</h1>
        <h1 className='text-lg font-semibold mt-6'>
          Title: <span>{task?.taskNumber ?? 'N/A'}</span>
        </h1>
        <p className='text-md font-semibold text-gray-600 my-4'>
          Description: {task?.description ?? 'No description available'}
        </p>
        <p className='text-sm font-semibold'>
          Created at: {task?.createdAt ? new Date(task.createdAt).toLocaleString() : 'No date available'}
        </p>

        <button
          className='absolute bottom-5 right-5 rounded-lg p-2 bg-blue-600 text-white'
          onClick={() => navigate(-1)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
