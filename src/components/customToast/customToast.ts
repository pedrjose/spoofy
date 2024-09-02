import { Theme, toast, ToastOptions, ToastPosition } from "react-toastify";

interface ICustomToast {
  msg: string;
  type: "error" | "default" | "warning" | "success" | "info";
  position?: ToastPosition;
  theme?: Theme;
}

export const customToast = ({
  msg,
  type,
  position = "bottom-left",
  theme = "colored",
}: ICustomToast) => {
  const toastTypeMap: Record<
    ICustomToast["type"],
    (message: string, options?: ToastOptions) => void
  > = {
    error: toast.error,
    default: toast,
    warning: toast.warn,
    success: toast.success,
    info: toast.info,
  };

  toastTypeMap[type](msg, {
    position: position,
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: theme,
  });
};
