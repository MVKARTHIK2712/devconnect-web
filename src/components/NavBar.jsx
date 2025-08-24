import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  const Navigate=useNavigate();


  const handleLogout=async()=>{
    try{
      const res=await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
      dispatch(removeUser());
      return Navigate("/login");
    }
    catch(err){
      console.error(err);
    }
  }



  return (
    <div className="navbar bg-base-200 shadow-sm">
  <div className="flex-1">
    <Link to="/"className="btn btn-ghost text-xl">👨🏻‍💻DevConnect</Link>
  </div>
  {user &&(<div className="flex gap-2">
    <div>Welcome,{user.firstName}</div>
    <div className="dropdown dropdown-end mx-5 flex ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User Photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li>
          <a onClick={handleLogout}>Logout</a>
          </li>
      </ul>
    </div>
  </div>)}
    </div>
  )
}

export default NavBar;
