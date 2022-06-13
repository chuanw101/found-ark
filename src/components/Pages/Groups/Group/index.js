import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './style.css';
import axios from 'axios';
import moment from 'moment';
import CharacterDetails from '../../../CharacterDetails';
import DiscordHelpModal from "../../../DiscordHelpModal";
import EditGroupModal from "../../../EditGroupModal";
import DelGroupModal from "../../../DelGroupModal";

import WidgetBot from '@widgetbot/react-embed';
import { Server } from '@widgetbot/embed-api';


function Group({ user, sendNoti, setBackground }) {
    const [group, setGroup] = useState(null);
    const [allChars, setAllChars] = useState(null);
    const [charId, setCharId] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [groupModalOpen, setGroupModalOpen] = useState(false);
    const [delGroupModalOpen, setDelGroupModalOpen] = useState(false);
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
        if (!user?.logged_in) {
            return false;
        }
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
            console.log(res.data)
            sendNoti(res.data)
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        };
    }

    const cancelApp = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.delete(`https://found-ark-backend.herokuapp.com/api/groupmembers/${groupId}`, {
                headers: {
                    'Authorization': `token ${token}`
                },
                data: {
                    char_id: e.target.value,
                }
            });
            if (res.data?.receiver_id) {
                sendNoti(res.data)
            }
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
            sendNoti(res.data)
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        };
    }

    const decline = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.delete(`https://found-ark-backend.herokuapp.com/api/groupmembers/${groupId}`, {
                headers: {
                    'Authorization': `token ${token}`
                },
                data: {
                    char_id: e.target.value,
                }
            });
            sendNoti(res.data)
            window.location.reload(false);
        } catch (err) {
            console.log(err);
        };
    }

    const getUserStatus = () => {
        if (user?.logged_in) {
            let targetCharId;
            if (group?.creator?.owner_id === user.id) {
                let appsEL = [];
                if (group) {
                    for (let i = 0; i < group?.app_char?.length; i++) {
                        appsEL.push(
                            <div key={i}>
                                <CharacterDetails applicant={true} approve={approve} decline={decline} char={group.app_char[i]} />
                            </div>
                        )
                    }
                }

                // user is creator of this group
                if (appsEL.length > 0) {
                    return (
                        <div className="applicationSection">
                            <h2>Applicants</h2>
                            {appsEL}
                        </div>
                    )
                }
            
            } else if (group?.member_char.some(char => {
                if (char.owner_id === user.id) {
                    targetCharId = char.id;
                    return true;
                }
                return false;
            })) {
                // user is a member of this group
                return (
                    <div className="applicationSection">
                        <div className="appSectionRow">
                            <h2>You are a member of this group!</h2>
                            <button value={targetCharId} onClick={cancelApp}>Leave Group</button>
                        </div>
                    </div>
                )
            } else if (group?.app_char.some(char => {
                if (char.owner_id === user.id) {
                    targetCharId = char.id;
                    return true;
                }
                return false;
            })) {
                // user already applied but not accepted yet
                return (
                    <div className="applicationSection">
                        <div className="appSectionRow">
                            <h2>You already applied to this group</h2>
                            <button className="appSectionBtn" value={targetCharId} onClick={cancelApp}>Withdraw</button>
                        </div>
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
                        <div className="appSectionRow">
                            <select name="characters" required onChange={handleInputChange} className="appCharSelect">
                                {allChars?.map((char) => {
                                    return (
                                        <option key={char.id} value={char.id}>{char.char_name}</option>
                                    )
                                })}
                            </select>
                            <button className="appSectionBtn" onClick={apply}>Apply</button>
                        </div>
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
    }, [groupId]);

    useEffect(() => {
        groupMember();
    }, [group, user])

    const displayDiscord = () => {
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

    return (

        <div className="page">

            <div className="groupBanner">
                <div className="groupHeadline">
                    <div className="groupTitle">
                        <h1 className="groupTitleHeading">{group?.group_name}</h1>
                        <p>{group?.description}</p>
                        <p>{formatTime(group?.time)}</p>

                        {displayDiscord()}
                    </div>

                    <div className="groupDetails">
                        <h4>Created by</h4>
                        <p>{group?.creator.char_name}</p>
                        <p>({group?.creator.owner.user_name})</p>

                        <h4>Region</h4>
                        <p>{group?.region}</p>
                    </div>

                </div>
                {group?.creator?.owner_id === user?.id ? (
                    <div className="groupOwnerBtns">
                        <button className="editDiscordBtn"
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
                        <button className="deleteGroupBtn"
                            onClick={() => {
                                setDelGroupModalOpen(true);
                            }}
                        >
                            Delete Group
                        </button>
                    </div>
                ) : (<></>)}

            </div>

            {groupModalOpen && <EditGroupModal setOpenModal={setGroupModalOpen} setGroup={setGroup} group={group} />}
            {delGroupModalOpen && <DelGroupModal setDelGroupModalOpen={setDelGroupModalOpen} group={group} sendNoti={sendNoti} />}
            {modalOpen && <DiscordHelpModal setOpenModal={setModalOpen} setGroup={setGroup} group={group} />}

            <div className="groupContainer">

                <div className="groupBody">

                    <div className="groupMemberSection">

                        {getUserStatus()}

                        <h2>Members</h2>

                        <div className="allCharacters">
                            {groupMembers?.map(char =>
                                <div key={char.id} className={isGroupMember ? "wrapCharCard groupMemberCard" : "groupMemberCard"}>
                                    <CharacterDetails char={char}  />
                                        {group?.creator?.owner_id === user?.id && char?.owner_id != user?.id && <button id="kickMemberBtn" value={char?.id} onClick={decline}>Kick {char?.char_name}</button>}
                                </div>
                            )}

                        </div>

                    </div>
                    {
                        isGroupMember &&
                        <div className="discordWidget">
                            {discordInfo?.length == 3 ? (
                                <>
                                    <WidgetBot
                                        server={discordInfo[1]}
                                        channel={discordInfo[2]}

                                        height="50vh" width="100vw"
                                    />
                                </>
                            ) : (
                                <>
                                    <WidgetBot
                                        server={defaultDiscord[1]}
                                        channel={defaultDiscord[2]}

                                        height="50vh" width="100vw"
                                    />
                                </>
                            )}
                        </div>
                    }

                </div>
            </div>

        </div>

    );

};

export default Group;