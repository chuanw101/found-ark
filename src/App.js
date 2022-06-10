// import components
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './components/Pages/Profile';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import FAQ from './components/Pages/FAQ'
import Error from './components/Pages/Error';

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

import jwtDecode from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import io from "socket.io-client";

function App() {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [background, setBackground] = useState('bgTree');
    const [notis, setNotis] = useState([]);
    const [newNoti, setNewNoti] = useState(null);
    const [socket, setSocket] = useState(null);
    const [loginError, setLogInError] = useState(false)
    const [nameTaken, setNameTaken]= useState(false)

    const getAllNotis = async (receiver_id) => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/notifications/receiver/${receiver_id}`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            })
            console.log("========== getting notis")
            console.log(res.data)
            setNotis(res.data)
        } catch (err) {
            alert(err?.response?.data?.msg)
            console.log(err);
        }
    }

    useEffect(() => {
        setSocket(io('https://found-ark-backend.herokuapp.com/'));
    }, []);

    useEffect(() => {
        console.log(user)
        if (user) {
            getAllNotis(user.id);
        }
        if (!socket) {
            return
        }
        if (user) {
            socket.emit("setup", user.id);
            console.log("Connecting to" + user.id)
        }
        socket.on("connected", () => console.log("connected"));
    }, [user?.id]);

    useEffect(() => {
        if (!socket) {
            return
        }
        console.log("recieving")
        socket.on("message recieved", (data) => {
            console.log("noti recieved" + data)
            setNewNoti(data);
        });
    }, [socket])

    useEffect(() => {
        if (newNoti) {
            setNotis([newNoti, ...notis]);
            setNewNoti(null)
        }
    }, [newNoti])


    const sendNoti = (noti) => {
        socket.emit("new notification", noti);
    }

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
        } else if(path === '/404'){
            setBackground('bgGiant')
        } else if(path === '/FAQ'){
            setBackground('bgSky')
        };
    };

    const location = useLocation();

    useEffect(() => {
        handleBackgroundChange();
    }, [location]);

    let navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem("foundArkJwt");
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])

    useEffect(() => {
        if (token) {
            //get time zone offset
            const date = new Date();
            let offset = date.getTimezoneOffset();
            offset /= -60;
            let offsetString = '';
            if (offset < 0) {
                offsetString += '-';
                offset = offset*-1;
            } else {
                offsetString += '+';
            }
            if (offset < 10) {
                offsetString += '0'
            }
            if (offset % 1 == 0) {
                offsetString += offset;
                offsetString += ':00'
            } else {
                offsetString += Math.floor(offset);
                offsetString += ':30'
            }
            let tempUser = jwtDecode(token);
            tempUser.offset = offsetString;
            setUser(tempUser);
        } else {
            setUser(null);
        }
    }, [token])

    const handleLoginSubmit = async (loginData) => {
        try {
            const res = await axios.post('https://found-ark-backend.herokuapp.com/api/users/login', {
                user_name: loginData.username,
                password: loginData.password,
            })
            console.log(res)
            if (res?.data?.token) {
                setToken(res.data.token)
                localStorage.setItem('foundArkJwt', res.data.token);
                navigate(`/`);
            }
        } catch (err) {
            console.log(err);
            setLogInError(true)
        }
    }

    const handleSignupSubmit = async (signupData) => {
        try {
            const res = await axios.post('https://found-ark-backend.herokuapp.com/api/users/signup', {
                user_name: signupData.username,
                password: signupData.password,
                region: signupData.region,
                introduction: signupData.introduction,
            })
            if (res?.data?.token) {
                setToken(res.data.token)
                localStorage.setItem('foundArkJwt', res.data.token);
                navigate(`/profile`);
            }
        }
        catch (err) {
            setNameTaken(true)
            console.log(err);
        }
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("foundArkJwt");
        navigate('/login')
    }

    return (
        <div className={"App " + background}>
            <Header user={user} logout={logout} notis={notis} setNotis={setNotis}/>
            <Routes>
                <Route path="/" element={<Groups user={user} />} />
                <Route path="creategroup" element={<CreateGroup user={user} />} />
                <Route path="mygroups" element={<MyGroups user={user} />} />
                <Route path="group/:groupId" element={<Group user={user} sendNoti={sendNoti} setBackground={setBackground} />} />
                <Route path="login" element={<Login handleLoginSubmit={handleLoginSubmit} loginError={loginError} />} />
                <Route path="signup" element={<SignUp handleSignupSubmit={handleSignupSubmit} nameTaken={nameTaken} />} />
                <Route path="profile" element={<Profile user={user} />} />
                <Route path="faq" element={<FAQ/>}/>
                <Route path="404" element={<Error/>}/>
            </Routes>
            <Footer />
        </div>

    );

};

export default App;
