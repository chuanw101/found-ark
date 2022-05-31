import React from 'react';
import Notifications from './Notifications';
import './style.css';

function Navigation({ currentPage, setCurrentPage }) {

   return (

      <ul className="navigation">

         <li className="navItem">
            <a
               href="#groups"
               onClick={() => setCurrentPage('Groups')}

               className={currentPage === 'Groups' ? 'nav-link active' : 'nav-link'}
            >
               Groups
            </a>
         </li>

         <li className="navItem">

            <div className="notificationContainer">
               <img src="/assets/icons/notification-bell.png" alt="notifications" className="notificationIcon"></img>
               <span className="notificationAlert"></span>
            </div>
            <Notifications />

         </li>

         <li className="navItem">
            <a
               href="#profile"
               onClick={() => setCurrentPage('Profile')}

               className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
            >
               Profile
            </a>
         </li>

         <li className="navItem">
            <a
               href="#login"

               onClick={() => setCurrentPage('Login')}
               className={currentPage === 'Login' ? 'nav-link active' : 'nav-link'}
            >
               Login
            </a>
         </li>

         <li className="navItem">
            <a
               href="#signup"

               onClick={() => setCurrentPage('SignUp')}
               className={currentPage === 'SignUp' ? 'nav-link active' : 'nav-link'}
            >
               Sign Up
            </a>
         </li>

      </ul>

   );

};

export default Navigation;