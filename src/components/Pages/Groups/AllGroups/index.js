import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

function AllGroups({ user }) {

    const [allGroups, setAllGroups] = useState([]);

    // define token
    const token = localStorage.getItem('foundArkJwt');
    if (token) {
        // const tokenData = jwtDecode(token);
    }

    // get all groups
    const getAllGroups = async () => {

        try {

            if (token) {
                const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/groups`, {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
                setAllGroups(res.data);
                console.log('All Groups: ', allGroups);
            } else {
                const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/groups`);
                setAllGroups(res.data);
                console.log(allGroups);
            };

        } catch (err) {
            console.log(err);
        };

    };

    useEffect(() => {
        getAllGroups();
    }, []);

    let navigate = useNavigate();

    const handleGroupClick = () => {
        // navigate('/');
        alert('Group page coming soon!');
    }

    const handleApply = async (e) => {

        try {

            if (user) {
                const res = await axios.post(`https://found-ark-backend.herokuapp.com/api/groupmembers/${e.target.value}`, {
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
                alert(`We've notified the group leader that you would like to join. Keep an eye on your notifications for their response.`)
                console.log(res);
            } else {
                navigate('login');
            };

        } catch (err) {
            console.log(err);
        };

    }

    return (

        <div className="darkContainer">

            <h1>All Groups</h1>

            {allGroups.map((group) => {

                return (

                    <div key={group.id} id={group.id} className={
                        group.id % 4 === 0 ? 'groupPreview bgTree' :
                            group.id % 3 === 0 ? 'groupPreview bgGiant' :
                                group.id % 2 === 0 ? 'groupPreview bgCity' : 'groupPreview bgSky'
                    } onClick={handleGroupClick}>

                        <div className="groupPreviewColumnLeft">
                            <h2>{group.group_name}</h2>
                            <p>{group.description}</p>
                        </div>

                        <div className="groupPreviewColumnRight">
                            <h4>Group Leader</h4>
                            <p>{group.creator.user_name}</p>
                            <button className="previewApplyBtn" value={group.id} onClick={handleApply}>Apply</button>
                        </div>

                    </div>

                );

            })}

        </div>

    );

};

export default AllGroups;