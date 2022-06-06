import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './style.css';

import axios from 'axios'

import CharacterDetails from '../../../CharacterDetails';

function Group({ user }) {
    const [group, setGroup] = useState(null);
    const [allChars, setAllChars] = useState(null);
    const [charId, setCharId] = useState(null);

    const { groupId } = useParams();

    // get all groups
    const getGroup = async () => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/groups/${groupId}`);
            setGroup(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        };
    };

    // fetch character names
    const getAllChars = async () => {
        try {
            if (user?.logged_in) {
                const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/characters/owner/${user.id}`);
                console.log(res.data)
                setAllChars(res.data);
                setCharId(res?.data[0]?.id);
            }
        } catch (err) {
            console.log(err);
        }
    };

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'characters') {
            setCharId(value);
        };
    };

    const apply = async (e) => {
        e.preventDefault();
        console.log(charId)
        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.post(`https://found-ark-backend.herokuapp.com/api/groupmembers/${groupId}`, {
                char_id: charId,
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        };
    }

    const cancelApp = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('foundArkJwt');
            console.log(token)
            const res = await axios.delete(`https://found-ark-backend.herokuapp.com/api/groupmembers/${groupId}`, {
                headers: {
                    'Authorization': `token ${token}`
                },
                data: {
                    char_id: charId,
                }
            });
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        };
    }

    const approve = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.put(`https://found-ark-backend.herokuapp.com/api/groupmembers/${groupId}`, {
                char_id: e.target.value,
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        };
    }

    const decline = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('foundArkJwt');
            console.log(token)
            const res = await axios.delete(`https://found-ark-backend.herokuapp.com/api/groupmembers/${groupId}`, {
                headers: {
                    'Authorization': `token ${token}`
                },
                data: {
                    char_id: e.target.value,
                }
            });
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        };
    }

    const getUserStatus = () => {
        console.log("hi")
        if (user?.logged_in) {
            if (group?.creator?.owner_id === user.id) {
                let appsEL = [];
                if (group) {
                    for (let i = 0; i < group?.app_char?.length; i++) {
                        appsEL.push(
                            <div key={i}>
                                <h2>{group.app_char[i].char_name}</h2>
                                <button value={group.app_char[i].id} onClick={approve}>Approve</button>
                                <button value={group.app_char[i].id} onClick={decline}>Decline</button>
                                <CharacterDetails jsonData={group.app_char[i].json_data} />
                            </div>
                        )
                    }
                }
                // user is creator of this group
                return (
                    <>
                        <h1>Applicants: </h1>
                        {appsEL}
                    </>
                )
            } else if (group?.member_char.some(char => {
                if (char.owner_id === user.id) {
                    return true;
                }
                return false;
            })) {
                // user is a member of this group
                return (
                    <>
                        <h2>You are a member of this group!</h2>
                        <button onClick={cancelApp}>Leave Group</button>
                    </>
                )
            } else if (group?.app_char.some(char => {
                if (char.owner_id === user.id) {
                    return true;
                }
                return false;
            })) {
                // user already applied but not accepted yet
                return (
                    <>
                        <h2>You already applied to this group</h2>
                        <button onClick={cancelApp}>Cancel Application</button>
                    </>
                )
            } else {
                // user havent done anything
                if (!allChars) {
                    getAllChars();
                }
                if (!allChars) {
                    return;
                }
                return (
                    <>
                        <select name="characters" required onChange={handleInputChange}>
                            {allChars?.map((char) => {
                                return (
                                    <option key={char.id} value={char.id}>{char.char_name}</option>
                                )
                            })}
                        </select>
                        <button onClick={apply}>Apply</button>
                    </>
                )
            }
        }
    }

    let membersEl = [];
    if (group) {
        for (let i = 0; i < group?.member_char?.length; i++) {
            membersEl.push(
                <div key={i}>
                    <h2>{group.member_char[i].char_name}</h2>
                    <CharacterDetails jsonData={group.member_char[i].json_data} />
                </div>
            )
        }
    }

    useEffect(() => {
        getGroup();
    }, []);

    return (

        <div className="page">
            {getUserStatus()}
            <h1>{group?.group_name}</h1>
            <h2>{group?.description}</h2>
            <h2>{group?.region}</h2>
            <h2>Created by {group?.creator.char_name} ({group?.creator.owner.user_name}) </h2>
            <br></br>
            <h1>Members:</h1>
            {membersEl}
        </div>

    );

};

export default Group;