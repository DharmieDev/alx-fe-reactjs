import React from "react";
import "./App.css";
import  MyContext  from "./components/UserContext.js";
import ProfilePage from "./components/ProfilePage";

function App() {
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <MyContext.Provider value={userData}>
      <ProfilePage />
    </MyContext.Provider>
  );
}

export default App;
