import React from "react";

const Notification = ({ notification, children }) => {
  return (
    <div>
      {notification}
      {children}
    </div>
  );
};

export default Notification;
