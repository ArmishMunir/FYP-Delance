import React from "react";
// import './App.css';
import Dashboard from "./Dashboard";
import Store from "./Store";

function Chat(props) {
  return (
    <div className="Chat">
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default Chat;
