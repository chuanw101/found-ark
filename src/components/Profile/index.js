import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import './style.css';

function Profile() {
   const token = localStorage.getItem('foundArkJwt');
   const tokenData = jwtDecode(token);

   return (
      <div className="page">
         <h1>Profile</h1>
         <h2>Welcome {tokenData.user_name}</h2>
         <h2>Region: {tokenData.region}</h2>
      </div>
   );
   
};

export default Profile;