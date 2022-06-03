// import components
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Pages/Profile';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';

import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";

// import styles
import './styles/reset.css';
import './styles/fonts.css';
import './styles/variables.css';
import './styles/animations.css';
import './styles/style.css';
import Groups from './components/Pages/Groups';
import CreateGroup from './components/Pages/Groups/CreateGroup';
import MyGroups from './components/Pages/Groups/MyGroups';
import Group from './components/Pages/Groups/Group';

function App() {

    const [background, setBackground] = useState('bgTree');

    const path = window.location.pathname;

    const handleBackgroundChange = () => {
        if (path === '/' || path === '/group' || path === '/mygroups' || path === '/creategroup') {
            setBackground('bgTree');
        } else if (path === '/login') {
            setBackground('bgCity');
        } else if (path === '/signup') {
            setBackground('bgSky');
        } else if (path === '/profile') {
            setBackground('bgGiant');
        };
    };

    const location = useLocation();

    useEffect(() => {
        handleBackgroundChange();
    }, [location]);

    return (
        <div className={"App " + background}>
            <Header setBackground={setBackground} />
            <Routes>
                <Route path="/" element={<Groups />} />
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

};

export default App;
