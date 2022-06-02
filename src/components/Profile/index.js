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

         <div className="charContainer">
            {/* Display char info */}
         </div>

         <form method="post">
            <div class="container">
               <label htmlFor="charName"><b>Character Name</b></label>
               <input type="text" placeholder="Character Name" name="charName" required />

               <button>Auto</button>

               <label htmlFor="class"><b>Class</b></label>
               <input type="text" placeholder="Enter Class" name="class" required />

               <label htmlFor="itemLevel"><b>Item Level</b></label>
               <input type="number" placeholder="Enter Item Level" name="itemLevel" required />

               <label htmlFor="rosterLevel"><b>Roster Level</b></label>
               <input type="number" placeholder="Enter Roster Level" name="rosterLevel" required />

               <label htmlFor="charLevel"><b>Character Level</b></label>
               <input type="number" placeholder="Enter Character Level" name="charLevel" required />

               <label htmlFor="engravings"><b>Engravings</b></label>
               <input type="text" placeholder="Enter Engravings" name="engravings" required />

               <button type="submit">Add New Character</button>
            </div>
         </form>

      </div>
   );
   
};

export default Profile;