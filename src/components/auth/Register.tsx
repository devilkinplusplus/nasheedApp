import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createUserAsync } from "../../services/apis/userService";
import { AxiosResponse } from "axios";
import { UserResponse } from "../../services/responseTypes/userResponse";
import ToastService from "../../services/common/toastService";
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

function Register() {
  const navlink = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setOpen(true)
    await createUserAsync(data)
      .then((res: AxiosResponse<UserResponse>) => {
        if (!res.data.succeeded) {
          for (const error of res.data.errors) {
            ToastService.error(error);
          }
        } else {
          navlink("/auth/login");
          ToastService.info("Next step is login your account");
        }
        setOpen(false)
      })
      .catch((err) => {
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-full bg-gray-100 lg:w-full flex items-center justify-center -mt-10">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl tracking-widest uppercase font-squada font-semibold mb-6 text-black text-center">
            Sign Up your account
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-600 pl-1"
              >
                Firstname
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                {...register("firstName", {
                  required: "Firstname is required",
                })}
                autoComplete="off"
                placeholder="Enter your firstname"
                className="mt-1 p-2 w-full border-none rounded-md focus:border-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-600 pl-1"
              >
                Lastname
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                {...register("lastName", { required: "Lastname is required" })}
                autoComplete="off"
                placeholder="Enter your lastname"
                className="mt-1 p-2 w-full border-none rounded-md focus:border-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600 pl-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                {...register("userName", { required: "Username is required" })}
                autoComplete="off"
                placeholder="Enter your username"
                className="mt-1 p-2 w-full border-none rounded-md focus:border-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors duration-300"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 pl-1"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                autoComplete="off"
                placeholder="Enter your email"
                className="mt-1 p-2 w-full border-none rounded-md focus:border-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors duration-300"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 pl-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                placeholder="Enter your password"
                className="mt-1 p-2 w-full border-none rounded-md focus:border-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-colors duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="text-black hover:underline"
                onClick={() => navlink("/auth/login")}
              >
                Login here
              </button>
            </p>
          </div>
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </div>
  );
}

export default Register;
