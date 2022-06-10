import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
import './style.css';
import Groups from '..';

function AllGroups({ user, activeTags }) {

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
                //setAllGroups(res.data);
                console.log(res.data)
                filterGroups(res.data);
            } else {
                const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/groups`);
                //setAllGroups(res.data);
                console.log(res.data)
                filterGroups(res.data);
            };

        } catch (err) {
            console.log(err);
        };

    };

    const filterGroups = (groupsToFilter) => {
        if (activeTags.length) {
            let tempGroups = [...groupsToFilter];
            for (const group of tempGroups) {
                let foundCount = 0;
                for (const tag of activeTags) {
                    if (group.tag.some(t => t.tag_name === tag)) {
                        foundCount++;
                    }
                }
                group.show = (foundCount === activeTags.length);
            }
            setAllGroups([...tempGroups]);
        } else {
            let tempGroups = [...groupsToFilter];
            for (const group of tempGroups) {
                group.show = true;
            }
            setAllGroups([...tempGroups]);
        }
    }

    useEffect(() => {
        getAllGroups();
    }, []);

    useEffect(() => {
        filterGroups(allGroups);
    }, [activeTags])

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

    const formatTime = (time) => {
        if (!time) {
            return
        }
        return (moment(time).format('dddd h:mm a'))
    }

    return (

        <div className="darkContainer">
            <h1>All Groups</h1>

            {allGroups.filter(group => group?.show).map((group) => {
                return (

                    <div key={group.id} id={group.id} className={
                        group.id % 4 === 0 ? 'groupPreview bgTree' :
                            group.id % 3 === 0 ? 'groupPreview bgGiant' :
                                group.id % 2 === 0 ? 'groupPreview bgCity' : 'groupPreview bgSky'
                    } onClick={handleGroupClick}>

                        <div className="groupPreviewColumnLeft">

                            <div>
                                <h2>{group.group_name}</h2>
                                <p>{group.description}</p>
                                <p>{formatTime(group.time)}</p>
                            </div>

                            <div>
                                <h4>Members</h4>
                                <div  className="groupMemDis">
                                    {group.member_char.map((character) => {
                                        return (<p key={character.id}>{character.groupmember.is_owner ? (<>🟡</>) : (<></>)} {character.char_name} ({character.item_lvl}) </p>)
                                    })}
                                </div>
                            </div>

                        </div>

                        <div className="groupPreviewColumnRight">

                            <div className="groupTagsPreview">

                                <h4>Tags</h4>

                                <p>
                                    {group.tag.map((tag) => {
                                        return (<span key={tag.id}> {tag.tag_name}</span>)
                                    })}
                                </p>

                            </div>

                            <button className="previewApplyBtn" value={group.id}>View Details</button>

                        </div>

                    </div>

                );

            })}

        </div>

    );

};

export default AllGroups;