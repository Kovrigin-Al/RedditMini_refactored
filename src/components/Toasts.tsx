import { FC } from "react";
import { useAppSelector } from "../store/store";
import { Toast } from "./ui/Toast";

type Props = {};

const Toasts: FC<Props> = () => {
  const notifications = useAppSelector((state) => state.toasts);

  return (
    <div className="flex flex-col mx-auto jusctify-center sm:w-2/5 sticky right-0 bottom-0 m-5">
      {notifications.map((notification) => (
        <Toast
          type={notification.type}
          id={notification.id}
          message={notification.message}
          key={notification.type + notification.id}
        />
      ))}
    </div>
  );
};
export default Toasts;
