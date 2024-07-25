import React from 'react';
import { Task } from '../pages/Home';
import { useNavigate } from 'react-router-dom';
import AlertDialog from './AlertDialog';
import axios from 'axios';
import toast from 'react-hot-toast';
import handleApiError from '../utils/HandleApiError';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const navigate = useNavigate();
    const handleEditDetials = () => {
        navigate(`/edit-details/${task._id}`)
    }
    const handleViewDetails = () => {
        navigate(`/view-details/${task._id}`);
    };
    const handleDelete = async () => {
        try {

            const res = await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/api/task/${task._id}`,
                {
                    withCredentials: true,
                }
            )
            if (res.data.message) {
                toast.success(res.data.message)
                navigate(0);
            }
        } catch (err) {
            handleApiError(err)
        }
    }


    return (
        <div className="border p-2 rounded-md shadow-md bg-blue-200 mb-2 overflow-hidden">
            <h3 className="text-sm font-bold capitalize">{task.title}</h3>
            <p className="mb-3 text-sm break-words capitalize">{task.description}</p>
            <p className="mt-7 text-sm text-gray-500 font-semibold">
                Created at: {new Date(task.createdAt).toLocaleString()}
            </p>
            <div className="flex gap-2 justify-end mt-2">
                <AlertDialog
                    title="Delete"
                    description="Are you sure you want to delete?"
                    onConfirm={() => {
                        handleDelete();
                    }}
                >
                    <button className="rounded-lg p-1 bg-red-400 text-white">Delete</button>
                </AlertDialog>
                <button onClick={handleEditDetials} className="rounded-lg p-1 w-10 bg-blue-400 text-white">Edit</button>
                <button onClick={handleViewDetails} className="rounded-lg p-1 bg-blue-600 text-white">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default React.memo(TaskCard);
