import React from 'react';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import './style.css';

function Navigation({ currentPage, setCurrentPage }) {

   return (

      <ul className="navigation">

         <li className="navItem">
         <Link to="/">Groups</Link>
         </li>

         <li className="navItem">
            <div className="notificationContainer">
               <img src="/assets/icons/notification-bell.png" alt="notifications" className="notificationIcon"></img>
               <span className="notificationAlert"></span>
            </div>
            <Notifications />
         </li>

         <li className="navItem">
            <Link to="profile">Profile</Link>
         </li>

         <li className="navItem">
            <Link to="login">Login</Link>
         </li>

         <li className="navItem">
           <Link to ="signup">Sign Up</Link>
         </li>

      </ul>

   );

};

export default Navigation;