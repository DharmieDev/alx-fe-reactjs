import { useContext } from "react";
import  MyContext from "./UserContext";

function UserDetails() {
  const userData = useContext(MyContext);

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserDetails;
