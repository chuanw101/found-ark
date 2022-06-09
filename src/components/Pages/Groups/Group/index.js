import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './style.css';
import axios from 'axios';
import moment from 'moment';
import CharacterDetails from '../../../CharacterDetails';
import DiscordHelpModal from "../../../DiscordHelpModal";
import EditGroupModal from "../../../EditGroupModal";

import WidgetBot from '@widgetbot/react-embed';
import { Server } from '@widgetbot/embed-api';


function Group({ user, setBackground }) {
    const [group, setGroup] = useState(null);
    const [allChars, setAllChars] = useState(null);
    const [charId, setCharId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [isGroupMember, setIsGroupMember] = useState(false);

    if (modalOpen || groupModalOpen) {
        // Disable scroll
        document.body.style.overflow = "hidden";
    } else {
        // Enable scroll
        document.body.style.overflow = "auto";
    }

    const api = new Server({ id: 'test' });

    api.on('sendMessage', message => {
        console.log('sending:', message)
    });

    api.emit('message', { id: 'testmessage' });

    const { groupId } = useParams();

    const defaultDiscord = ['https://discord.gg/HWHXZftA', '983439059089240064', '983439059542233140'];

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

    // //user is a member 
    const groupMember = () => {
        if (group?.member_char.some(char => {
            if (char.owner_id === user.id) {
                return true
            }
            return false
        })) {
            setIsGroupMember(true)
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
                    <div className="applicationSection">
                        <h1>Applicants: </h1>
                        {appsEL}
                    </div>
                )
            } else if (group?.member_char.some(char => {
                if (char.owner_id === user.id) {
                    return true;
                }
                return false;
            })) {
                // user is a member of this group
                return (
                    <div className="applicationSection">
                        <h2>You are a member of this group!</h2>
                        <button onClick={cancelApp}>Leave Group</button>
                    </div>
                )
            } else if (group?.app_char.some(char => {
                if (char.owner_id === user.id) {
                    return true;
                }
                return false;
            })) {
                // user already applied but not accepted yet
                return (
                    <div className="applicationSection">
                        <h2>You already applied to this group</h2>
                        <button onClick={cancelApp}>Cancel Application</button>
                    </div>
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
                    <div className="applicationSection">
                        <select name="characters" required onChange={handleInputChange}>
                            {allChars?.map((char) => {
                                return (
                                    <option key={char.id} value={char.id}>{char.char_name}</option>
                                )
                            })}
                        </select>
                        <button onClick={apply}>Apply</button>
                    </div>
                )
            }
        }
    }

    const groupMembers = group?.member_char;

    // set background
    const selectBackground = () => {

        if (group?.id % 4 === 0) {
            setBackground('bgTree');
        } else if (group?.id % 3 === 0) {
            setBackground('bgGiant');
        } else if (group?.id % 2 === 0) {
            setBackground('bgCity');
        } else {
            setBackground('bgSky');
        };

    };

    useEffect(() => {
        getGroup();
        selectBackground();
    }, []);

    useEffect(() =>{
        groupMember();
    }, [group, user])

    const displayDiscord = () => {
  
            console.log(isGroupMember)
            console.log(defaultDiscord)
            console.log(discordInfo)
            if (isGroupMember) {
                return (
                    <><a href={discordInfo[0].length > 10 ? (discordInfo[0]) : (defaultDiscord[0])}>{discordInfo[0].length > 10 ? (discordInfo[0]) : (defaultDiscord[0])} {discordInfo[0].length > 10 ? "" : <span className='defaultSpan'>(default link)</span>}</a></>
                )
            }
    }
    const discordInfo = group?.discord?.split(' ');

    const formatTime = (time) => {
        if (!time) {
            return
        }
        return (moment(time).format('dddd h:mm a'))
    }
    console.log(isGroupMember)
    console.log(discordInfo)
    return (

        <div className="page">

            <div className="groupBanner">

                <div className="groupTitle">
                    <h1>{group?.group_name}</h1>
                    <p>{group?.description}</p>
                    <p>{formatTime(group?.time)}</p>

                    {displayDiscord()}

                    {group?.creator?.owner_id === user?.id ? (
                        <>
                            <button className="discordBtn"
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            >
                                Embed A Different Discord
                            </button>
                            <button className="editGroupBtn"
                                onClick={() => {
                                    setGroupModalOpen(true);
                                }}
                            >
                                Edit Group Information
                            </button>
                        </>
                    ) : (<></>)}
                </div>

                <div className="groupDetails">
                    <h4>Created by</h4>
                    <p>{group?.creator.char_name} ({group?.creator.owner.user_name})</p>

                    <h4>Region</h4>
                    <p>{group?.region}</p>


                </div>

            </div>

            {groupModalOpen && <EditGroupModal setOpenModal={setGroupModalOpen} setGroup={setGroup} group={group} />}

            {modalOpen && <DiscordHelpModal setOpenModal={setModalOpen} setGroup={setGroup} group={group} />}

            <div className="darkContainer">

                <div className="groupBody">

                    <div className="groupMemberSection">

                        {getUserStatus()}

                        <h2>Members</h2>

                        {groupMembers?.map(char =>
                            <div key={char.id} className="groupMemberCard">
                                <CharacterDetails char={char} />
                            </div>
                        )}

                    </div>

                    <div className="discordWidget">
                        {discordInfo?.length == 3 ? (
                            <>
                                <WidgetBot
                                    server={discordInfo[1]}
                                    channel={discordInfo[2]}

                                    height="80vh" width="50vw"
                                />
                            </>
                        ) : (
                            <>
                                <WidgetBot
                                    server={defaultDiscord[1]}
                                    channel={defaultDiscord[2]}

                                    height="80vh" width="50vw"
                                />
                            </>
                        )}



                    </div>
                </div>
            </div>

        </div>

    );

};

export default Group;