import React, { useState } from 'react';
import './style.css';

function SignUp( {handleSignupSubmit} ) {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [region, setRegion] = useState('NAE');
   const [introduction, setIntroduction] = useState('');
   const userReg = /^[a-zA-Z0-9]{4,}$/
   const passReg = /^.{8,}$/

   const handleInputChange = (e) => {
      // Getting the value and name of the input which triggered the change
      const { name, value } = e.target;
      // set value based on name
      if (name === 'username') {
         setUsername(value);
      } else if (name === 'password') {
         setPassword(value);
      } else if (name === 'region') {
         setRegion(value);
      } else if (name === 'introduction') {
         setIntroduction(value);
      }
   };

   const handleFormSubmit = (e) => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      e.preventDefault();
      if (userReg.test(username) == false || passReg.test(password) == false) {
         return
      } else {
         const signupData = {username, password, region, introduction};
         handleSignupSubmit(signupData);
      }
   };

   return (
      <div className="page">
         <h1>Sign Up</h1>
         <div id="alertDiv"></div>
         <form method="post">
            <div className="container">
               <div className={username === "" || userReg.test(username) == true ? "hidden" : "visible"}>
                  <p>Please enter a username with at least 4 letters/numbers, no special characters</p>
               </div>

               <div className={password === "" || passReg.test(password) == true ? "hidden" : "visible"}>
                  <p>Please enter a password with at least 8 characters</p>
               </div>

               <div>
                  <label htmlFor="username"><b>Username</b></label>
                  <input type="text" id="username" placeholder="Enter Username" name="username" pattern='[a-zA-Z0-9]{4,}' value={username} onChange={handleInputChange} required></input>
                  <span className="validity"></span>
               </div>

               <label htmlFor="password"><b>Password</b></label>
               <input type="password" id='password' placeholder="Enter Password" name="password" pattern='.{8,}' value={password} onChange={handleInputChange} required />
               <span className="validity"></span>


               <label htmlFor="region"><b>Region</b></label>
               <select name="region" onChange={handleInputChange} value={region}>
                  <option value="NAE">NAE</option>
                  <option value="NAW">NAW</option>
                  <option value="EUW">EUW</option>
                  <option value="EUC">EUC</option>
                  <option value="SA">SA</option>
               </select>

               <label htmlFor="introduction"><b>Introduction</b></label>
               <input type="text" placeholder="Introduction..." name="introduction" value={introduction} onChange={handleInputChange} />

               <button type="submit" onClick={handleFormSubmit}>Sign Up</button>
            </div>
         </form>

      </div>
   );

};

export default SignUp;