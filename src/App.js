// import components
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AllGroups from './components/AllGroups';
import MyGroups from './components/MyGroups';
import CreateGroup from './components/CreateGroup';
import Group from './components/Group';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';

// import styles
import './styles/reset.css';
import './styles/fonts.css';
import './styles/variables.css';
import './styles/style.css';

function App() {

   const [currentPage, setCurrentPage] = useState('AllGroups');

   const renderPage = () => {

      if (currentPage === 'AllGroups') {
         return <AllGroups />;
      }
      if (currentPage === 'MyGroups') {
         return <MyGroups />;
      }
      if (currentPage === 'CreateGroup') {
         return <CreateGroup />;
      }
      if (currentPage === 'Group') {
         return <Group />;
      }
      if (currentPage === 'Profile') {
         return <Profile />;
      }
      if (currentPage === 'Login') {
         return <Login />;
      }
      if (currentPage === 'SignUp') {
         return <SignUp />;
      }
      return <AllGroups />;

   };

   return (

      <div className="App">
         <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
         {renderPage()}
         <Footer />
      </div>
      
   );
}

export default App;
