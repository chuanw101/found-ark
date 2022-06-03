import React, { useState } from 'react';
import './style.css';

function Login({ handleLoginSubmit }) {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
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
      }
   };

   const handleFormSubmit = (e) => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      e.preventDefault();
      if (userReg.test(username) == false || passReg.test(password) == false) {
         return
      } else {
         const loginData = {username, password};
         handleLoginSubmit(loginData);
      }
   };

   return (

      <div className="page login">

         <h1>Login</h1>
         <form method="post">
            <div className="container">
               <label htmlFor="username"><b>Username</b></label>
               <input type="text" placeholder="Enter Username" name="username" value={username} onChange={handleInputChange} required />

               <label htmlFor="password"><b>Password</b></label>
               <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handleInputChange} required />

               <button type="submit" onClick={handleFormSubmit}>Login</button>
            </div>
         </form>

      </div>

   );

};

export default Login;