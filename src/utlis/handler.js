import { ToastContainer, toast } from 'react-toastify';

export const notify = (msg, type = 'error', options = {}) => {
  toast[type](msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options
  });
}