// src/helper/ToastNotify.js
import { toast } from 'react-toastify'

const opts = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  toastClassName:
    'bg-gray-800 dark:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg',
  bodyClassName: 'text-sm',
  progressClassName: 'bg-white',
}

export const notifySuccess = msg => toast.success(msg, opts)
export const notifyError   = msg => toast.error(msg, opts)
export const notifyWarning = msg => toast.warn(msg, opts)
