import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../utils/FormValidations";
import axios from "axios";
import handleApiError from "../utils/HandleApiError";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Oauth from "../components/Oauth";

type LoginForm = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUp = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: LoginForm) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/sign-up`,
                data,
                {
                    withCredentials: true,
                }
            );
            if (response.data) {
                navigate("/login");
                toast.success(response.data.message);
            }
        } catch (err) {
            handleApiError(err);
        }
    };

    return (

        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4 text-left w-full max-w-md">
                Login
            </h1>
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-2xl shadow-gray-400 border-2 border-blue-600">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input
                        type="text"
                        placeholder="First Name"
                        {...register("firstname")}
                    />
                    {errors.firstname && (
                        <p className="text-sm text-red-500">{errors.firstname.message}</p>
                    )}
                    <Input
                        type="text"
                        placeholder="Last Name"
                        {...register("lastname")}

                    />
                    {errors.lastname && (
                        <p className="text-sm text-red-500">{errors.lastname.message}</p>
                    )}
                    <Input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">{errors.password.message}</p>
                    )}
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                    )}

                    <button className="w-full bg-blue-600 text-white p-2 ">
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="font-semibold">
                      Already have account?{" "}
                        <Link to="/login" className="text-blue-600 px-2">
                            Login
                        </Link>
                    </p>
                </div>
                <div className="text-center mt-3">
                  <Oauth/>
                </div>
            </div>
        </div>

    )
}

export default SignUp