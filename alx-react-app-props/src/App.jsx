import React from "react";
import "./App.css";
import  UserContext  from "./components/UserContext.js";
import UserProfile from "./components/UserProfile.jsx";

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <UserContext.Provider value={userData}>
      <UserProfile />
    </UserContext.Provider>
  );
}

export default App;
