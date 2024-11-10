import { ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastPosition,ToastTheme } from "./toastOptions";


const ToastService = {
  success: (message: string, options?: ToastOptions<{}>) => {
    toast.success(message, {
      position: ToastPosition.BottomRight,
      autoClose: 3000,
      theme: ToastTheme.Light,
      ...options,
    });
  },
  error: (message: string, options?: ToastOptions<{}>) => {
    toast.error(message, {
      position: ToastPosition.BottomRight,
      autoClose: 3000,
      theme: ToastTheme.Light,
      ...options,
    });
  },
  warning: (message: string, options?: ToastOptions<{}>) => {
    toast.warning(message, {
      position: ToastPosition.BottomRight,
      autoClose: 3000,
      theme: ToastTheme.Light,
      ...options,
    });
  },
  info: (message: string, options?: ToastOptions<{}>) => {
    toast.info(message, {
      position: ToastPosition.BottomRight,
      autoClose: 3000,
      theme: ToastTheme.Light,
      ...options,
    });
  },
};

export default ToastService;
