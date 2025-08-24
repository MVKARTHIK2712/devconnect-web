import React, { useEffect } from 'react'
import NavBar from './NavBar';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from './Footer';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';


const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData=useSelector((store)=>store.user);
  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401){
        Navigate("/login");
      } 
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
