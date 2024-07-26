import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import handleApiError from '../utils/HandleApiError';
import { taskEditSchema } from '../utils/FormValidations';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

type TaskFormData = z.infer<typeof taskEditSchema>;

const EditTask: React.FC = () => {
    const navigate = useNavigate();
    const { taskId } = useParams<{ taskId: string }>();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskFormData>({
        resolver: zodResolver(taskEditSchema),
    });

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/task/${taskId}`,{withCredentials:true});
                const taskData = response.data.data;
                setValue('title', taskData.title);
                setValue('description', taskData.description);
                setValue('status', taskData.status);
            } catch (err) {
                handleApiError(err);
            }
        };

        if (taskId) {
            fetchTaskDetails();
        }
    }, [taskId, setValue]);

    const onSubmit = async (data: TaskFormData) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/task/${taskId}`, data);
            toast.success(response.data.message);
            navigate(-1);
        } catch (err) {
            handleApiError(err);
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className='w-full p-4 mt-16 sm:p-6 lg:p-8'>
            <div className='relative min-h-screen max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto p-4 sm:p-6 lg:p-8 shadow-lg border border-slate-200 rounded-lg'>
                <h1 className='text-xl font-bold mb-4'>Edit Task</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label htmlFor='title' className='block text-lg font-medium text-gray-500 mb-1'>Title</label>
                        <input
                            id='title'
                            type='text'
                            placeholder='Enter the title'
                            {...register('title')}
                            className='border-b-2 w-full text-lg font-semibold focus:outline-none'
                        />
                        {errors.title && <p className='text-red-500 text-sm'>{errors.title.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='description' className='block text-lg font-medium text-gray-500 mb-1'>Description</label>
                        <textarea
                            id='description'
                            placeholder='Enter the description'
                            {...register('description')}
                            className='border-b-2 w-full font-semibold h-32 text-lg focus:outline-none'
                        />
                        {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
                    </div>

                    <div className='mb-4'>
                        <label htmlFor='status' className='block text-lg font-medium text-gray-500 mb-1'>Status</label>
                        <select
                            id='status'
                            {...register('status')}
                            className='border-b-2 w-full text-lg font-semibold focus:outline-none'
                        >
                            <option value='Todo'>Todo</option>
                            <option value='InProgress'>In Progress</option>
                            <option value='Done'>Done</option>
                        </select>
                        {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}
                    </div>

                    <div className='absolute bottom-5 right-5 flex justify-end space-x-4'>
                        <button
                            type='submit'
                            className='bg-gray-200 font-medium px-4 py-2 rounded'
                        >
                            Save
                        </button>
                        <button
                            type='button'
                            className='bg-gray-400 font-medium px-4 py-2 rounded'
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTask;
