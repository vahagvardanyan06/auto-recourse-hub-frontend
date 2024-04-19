import {
  addNotification,
  clearNotification,
} from "@/redux/slices/notificationSlice";
import { INotificationState } from "@/redux/types";
import { useDispatch } from "react-redux";

const useNotification = () => {
  const dispatch = useDispatch();
  const displayNotification = (notification: INotificationState) => {
    dispatch(addNotification(notification));
  };
  const removeNotification = () => {
    dispatch(clearNotification());
  };

  return { displayNotification, removeNotification } as const;
};

export default useNotification;
