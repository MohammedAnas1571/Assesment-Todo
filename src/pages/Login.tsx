import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../utils/FormValidations";
import axios from "axios";
import handleApiError from "../utils/HandleApiError";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Oauth from "../components/Oauth";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/sign-in`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        navigate("/");
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

          <button className="w-full bg-blue-600 text-white p-2 ">
            Login
          </button>
    
        <div className="text-center mt-4">
          <p className="font-semibold">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 px-2">
              Signup
            </Link>
          </p>
        </div>
        <div className="text-center mt-3">
          <Oauth/>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
