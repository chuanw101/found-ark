import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import './style.css';

function AllGroups({ user }) {

    const [allGroups, setAllGroups] = useState([]);
    // define token
    const token = localStorage.getItem('foundArkJwt');

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
                console.log(res.data)
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

    const handleGroupClick = (e) => {
        // navigate('/');
        let id;
        let temp = e.target;
        while (!id) {
            id = temp.id;
            temp = temp.parentElement;
        }
        navigate(`/group/${id}`)
    }

    const handleApply = async (e) => {
        try {
            if (user.logged_in) {
                alert(`TODO add modal to select char.`)
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
                            <p>Members:
                                {group.member_char.map((character) => {
                                    return (<span key={character.id}>{character.groupmember.is_owner ? (<>🟡</>) : (<></>)}{character.char_name}({character.item_lvl}) </span>)
                                })}
                            </p>
                            <p>Tags:
                                {group.tag.map((tag) => {
                                    return (<span key={tag.id}> {tag.tag_name}</span>)
                                })}
                            </p>
                        </div>

                        <div className="groupPreviewColumnRight">
                            {/* <h4>Group Leader</h4>
                            <p>{group.creator.char_name} ({group.creator.owner.user_name})</p> */}
                            <button className="previewApplyBtn" value={group.id} onClick={handleApply}>Apply</button>
                        </div>

                    </div>

                );

            })}

        </div>

    );

};

export default AllGroups;