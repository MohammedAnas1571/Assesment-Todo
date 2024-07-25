import React from 'react';
import { Task } from '../pages/Home';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/view-details/${task._id}`);
  };

  return (
    <div className="border p-2 rounded-md shadow-md bg-blue-200 mb-2 overflow-hidden">
      <h3 className="text-sm font-bold">Task: {task.taskNumber}</h3>
      <p className="mb-3 text-sm break-words">{task.description}</p>
      <p className="mt-7 text-sm text-gray-500 font-semibold">
        Created at: {new Date(task.createdAt).toLocaleString()}
      </p>
      <div className="flex gap-2 justify-end mt-2">
        <button className="rounded-lg p-1 bg-red-400 text-white">Delete</button>
        <button className="rounded-lg p-1 w-10 bg-blue-400 text-white">Edit</button>
        <button onClick={handleViewDetails} className="rounded-lg p-1 bg-blue-600 text-white">
          View Details
        </button>
      </div>
    </div>
  );
};

export default React.memo(TaskCard);
