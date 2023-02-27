import { useSelector } from "react-redux";

const Notification = () => {
  const notif = useSelector((notif) => notif);
  if (notif.message !== null) {
    return (
      <div
        className="notification"
        style={{
          border: notif.warning ? "solid red" : "solid green",
          color: notif.warning ? "red" : "green",
          borderRadius: "10px",
          paddingLeft: "10px",
          paddingTop: "1px",
          paddingBottom: "1px",
        }}
      >
        <p>{notif.message}</p>
      </div>
    );
  }
};

export default Notification;
