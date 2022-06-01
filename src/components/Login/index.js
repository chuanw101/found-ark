import React from 'react';
import './style.css';

function Login() {

   return (

      <div className="page login">

         <h1>Login</h1>

         <form method="post">
            <div class="container">
               <label for="username"><b>Username</b></label>
               <input type="text" placeholder="Enter Username" name="username" required />

               <label for="password"><b>Password</b></label>
               <input type="password" placeholder="Enter Password" name="password" required />

               <button type="submit">Login</button>
            </div>
         </form>

      </div>
   );

};

export default Login;