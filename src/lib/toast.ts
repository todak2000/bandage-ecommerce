/* eslint-disable import/no-extraneous-dependencies */
import { toast } from 'react-hot-toast';

enum ToastPosition {
  TOPRIGHT = 'top-right',
  TOPLEFT = 'top-left',
  TOPCENTER = 'top-center',
  BOTTOMLEFT = 'bottom-left',
  BOTTOMRIGHT = 'bottom-right',
  BOTTOMCENTER = 'bottom-center',
}
interface ToastProps {
  msg: string;
  position?: ToastPosition;
}

const mtToastStyle = {
  style: {
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: 'white',
    color: '#23856D',
  },
};

export const BandageToast = {
  success: ({ msg, position = ToastPosition.BOTTOMRIGHT }: ToastProps) =>
    toast.success(msg, {
      position,
      duration: 6000,
      ...mtToastStyle,
    }),

  error: ({ msg, position = ToastPosition.BOTTOMRIGHT }: ToastProps) =>
    toast.error(msg, { duration: 6000, position, ...mtToastStyle }),
  warn: ({ msg, position = ToastPosition.BOTTOMRIGHT }: ToastProps) =>
    toast.custom(msg, {
      position,
      duration: 6000,
      style: {
        backgroundColor: 'white',
        fontSize: '15px',
        color: 'yellow',
      },
      className: 'bg-primary-60 text-neutral white',
    }),
};
