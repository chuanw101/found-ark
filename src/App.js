// import components
import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Pages/Profile';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';

import {
    Routes,
    Route,
} from "react-router-dom";

// import styles
import './styles/reset.css';
import './styles/fonts.css';
import './styles/variables.css';
import './styles/animations.css';
import './styles/style.css';
import AllGroups from './components/Pages/Groups/AllGroups';
import CreateGroup from './components/Pages/Groups/CreateGroup';
import MyGroups from './components/Pages/Groups/MyGroups';
import Group from './components/Pages/Groups/Group';

function App() {
    return (
        <div className={"App"}>
            <Header />
            <Routes>
                <Route path="/" element={<AllGroups />} />
                <Route path="creategroup" element={<CreateGroup />} />
                <Route path="mygroups" element={<MyGroups />} />
                <Route path="group" element={<Group />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
            <Footer />
        </div>

    );
}

export default App;
