import React from "react";
import { Modal, ModalContent, ModalTrigger } from "./Modal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import handleApiError from "../utils/HandleApiError";
import { taskSchema } from "../utils/FormValidations";
import { z } from "zod";
import Input from "./Input";

 type TaskFormData = z.infer<typeof taskSchema>;

type Props = {
    children: React.ReactElement;
};

export default function AddTaskDialog({ children }: Props) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
    });

    const onSubmit = async (data: TaskFormData) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/tasks`, data, {
                withCredentials: true,
            });
            toast.success("Task added successfully");
            navigate(0);
        } catch (err) {
            handleApiError(err);
        }
    };

    return (
        <Modal>
            <ModalTrigger>{children}</ModalTrigger>
            <ModalContent>
                {({ closeModal }) => (
                    <div className="flex flex-col items-center p-4">
                        <h1 className="text-xl font-semibold mb-4">Add New Task</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
                            <div className="w-full mb-2 px-5">
                                <label className="text-gray-500 text-sm mb-2" htmlFor="title">Title</label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Enter title"
                                    
                                    {...register("title")}
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                                
                                <label className="text-gray-500 text-sm mb-2" htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    className="p-2 border border-slate-500 w-full mb-2 "
                                    placeholder="Enter task description"
                                    rows={4}
                                    {...register("description")}
                                />
                                {errors.description && <p className="text-red-500 w-full text-sm mb-3">{errors.description.message}</p>}
                                
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                        <button
                            onClick={() => {
                                closeModal();
                                navigate(0);
                            }}
                            className="text-red-600 hover:underline "
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </ModalContent>
        </Modal>
    );
}
