import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "../../services/apis/authService";
import { AxiosResponse } from "axios";
import { LoginResponse } from "../../services/responseTypes/loginRespone";
import ToastService from "../../services/common/toastService";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { ToastTheme } from "../../services/common/toastOptions";

function Login() {
  const navlink = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setOpen(true);
    await loginAsync(data).then((res: AxiosResponse<LoginResponse>) => {
      if (!res.data.succeeded) {
        for (const error of res.data.errors) {
          ToastService.error(error);
        }
      } else {
        localStorage.setItem("accessToken", res.data.token.accessToken);
        navlink("/");
        ToastService.success("Welcome Back 👋",{theme : ToastTheme.Dark});
      }
      setOpen(false);
    });
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-full bg-gray-100 lg:w-full flex items-center justify-center -mt-20">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl tracking-widest uppercase font-squada font-semibold mb-6 text-black text-center">
              Login your account
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  {...register("usernameOrEmail", {
                    required: "Username or email is required",
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
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-black hover:underline"
                  onClick={() => navlink("/auth/register")}
                >
                  Create here
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
    </>
  );
}

export default Login;
