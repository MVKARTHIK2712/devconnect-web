import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const EditProfile = ({ user }) => {
  const [firstName, setFirstname] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoURL] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      //alert success
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
    {success && (
      <div role="alert"
        className="alert alert-success shadow-lg flex items-center gap-2 w-auto max-w-xs mx-auto mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none" viewBox="0 0 24 24">
          <path
            strokeLinecap="round" strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Profile updated successfully!</span>
      </div>
    )}

    <div className="flex flex-col md:flex-row justify-center my-10 gap-10">
      <div className="card bg-base-300 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          
          <label className="form-control w-full my-2">
            <span className="label-text">First Name</span>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full my-2 ">
            <span className="label-text">Last Name</span>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full my-2">
            <span className="label-text">Profile Photo URL</span>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full my-2">
            <span className="label-text">Age</span>
            <input
              type="number"
              min="0"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input input-bordered w-full"
            />
          </label>

          <label className="form-control w-full my-2">
            <span className="label-text">Gender</span>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="form-control w-full my-2">
            <span className="label-text">About</span>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="textarea textarea-bordered w-full"
              placeholder="Write something about yourself..."
            />
          </label>

          {error && <p className="text-red-500 text-center my-2">{error}</p>}

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, photoUrl, about, age, gender }}
      />
    </div>
    </>
  );
};

export default EditProfile;
