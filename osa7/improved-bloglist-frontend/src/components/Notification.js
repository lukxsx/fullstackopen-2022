import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  console.log(notification.message);
  if (notification.message !== "") {
    return (
      <div
        className="notification"
        style={{
          border: notification.warning ? "solid red" : "solid green",
          color: notification.warning ? "red" : "green",
          borderRadius: "10px",
          paddingLeft: "10px",
          paddingTop: "1px",
          paddingBottom: "1px",
        }}
      >
        <p>{notification.message}</p>
      </div>
    );
  }
};

export default Notification;
