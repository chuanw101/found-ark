import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import './style.css';
import io from "socket.io-client";


const socket = io.connect("http://localhost:3001");


function Navigation({ user, logout }) {

    const joinRoom = () => {
        if (user) {
            console.log("joiningRoom")
            socket.emit("setup", user.id);
        }
    };

    // useEffect(() => {
        
    // }, [user])

    console.log(user)

    useEffect(() => {
        console.log(user)
        if(user) {
            socket.emit("setup", user.id);
            console.log("Connecting to" + user.id)
        }
        socket.on("connected", () => console.log("connected"));
    }, [user]);

    // useEffect(() => {
    //     console.log(user)
    //     if(user) {
    //         socket.emit("setup", user.id);
    //         console.log("User Connecting to" + user.id)
    //     }
    //     socket.on("connected", () => console.log("connected"));
    // }, [user]);
    
    socket.on("message recieved", (data) => {
        console.log("noti recieved" + data)
    });

    

    const test = () => {
        console.log("hi")
        const message = "hellllllloooo"
        socket.emit("new notification", { message, receiver:user.id });
    }
    console.log(socket)
    return (

        <ul className="navigation">

            <li className="navItem">
                <Link to="/">Groups</Link>
            </li>

            {user?.logged_in ? (
                <>
                    <li className="navItem">
                        <div className="notificationContainer">
                            <img onClick={test} src="/assets/icons/notification-bell.png" alt="notifications" className="notificationIcon"></img>
                            <span className="notificationAlert"></span>
                        </div>
                        <Notifications />
                    </li>

                    <li className="navItem">
                        <Link to="profile">Profile</Link>
                    </li>
                    <li className="navItem" onClick={logout}>
                        Log Out
                    </li>
                </>
            ) : (
                <>
                    <li className="navItem">
                        <Link to="login">Login</Link>
                    </li>

                    <li className="navItem">
                        <Link to="signup">Sign Up</Link>
                    </li>
                </>
            )}
        </ul>

    );

};

export default Navigation;