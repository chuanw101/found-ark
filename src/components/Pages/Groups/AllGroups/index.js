import React, { useState, useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

function AllGroups() {

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
                console.log(allGroups);
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

    return (

        <div className="page">

            <h1>All Groups</h1>

            {allGroups.map((group) => {

                return (

                    <div key={group.id} id={group.id} className="group">

                        <h2>{group.group_name}</h2>
                        <p>{group.description}</p>

                    </div>

                )

            })}


        </div>

    );

};

export default AllGroups;