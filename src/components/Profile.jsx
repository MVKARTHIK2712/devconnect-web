
import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { BASE_URL } from "../utils/constants";

const Profile = () => {
  const user = useSelector((store) => store.user); // get user from redux

  return (
    <div>
      {user ? <EditProfile user={user} /> : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
