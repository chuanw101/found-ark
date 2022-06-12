import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './style.css';

function Notifications(props, {handleNotiOpen}) {
    const [update, setUpdate] = useState(false);

    let navigate = useNavigate();

    const markRead = async (notiId) => {
        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.put(`https://found-ark-backend.herokuapp.com/api/notifications/${notiId}`, {}, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            console.log(res)
        } catch (err) {
            console.log(err);
        };
    }

    const delNoti = async (notiId) => {
        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.delete(`https://found-ark-backend.herokuapp.com/api/notifications/${notiId}`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            console.log(res)
        } catch (err) {
            console.log(err);
        };
    }

    const handleNotiClick = (e) => {
        console.log(e.target)
        const todo = e.target.getAttribute('todo');
        console.log(todo)
        let index;
        let temp = e.target;
        while (!index) {
            index = temp.getAttribute('index');
            temp = temp.parentElement;
        }
        if (todo === 'delete') {
            delNoti(props.notis[index].id);
            let tempNotis = props.notis;
            tempNotis.splice(index, 1);
            props.setNotis(tempNotis);
            setUpdate(!update);
            return
        }
        if (todo === 'markread') {
            let tempNotis = props.notis;
            tempNotis[index].read = true;
            props.setNotis(tempNotis);
            setUpdate(!update);
            markRead(props.notis[index].id);
        }
        if (todo === 'nav') {
            if (e.target.parentElement.getAttribute('todo') === 'markread') {
                let tempNotis = props.notis;
                tempNotis[index].read = true;
                props.setNotis(tempNotis);
                setUpdate(!update);
                markRead(props.notis[index].id);
            }
        }
        if (todo !== 'noNav') {
            let curUrl = window.location.href;
            curUrl = curUrl.split('/')
            if (curUrl[curUrl.length - 2] === 'group' && curUrl[curUrl.length - 1] === String(props.notis[index].group_id)) {
                console.log("reload")
                window.location.reload(false);
            } else {
                navigate(`/group/${props.notis[index].group_id}`)
            }
        }
    }

    console.log(props.notis)

    return (

        <ul className="notifications" onClick={handleNotiOpen}>
            {window.innerWidth < 769 &&
                <li className="mobileNotiHeader">
                    <h2>Notifications</h2>
                    <span className="closeNotiWindow">X</span>
                </li>
            }

            {props?.notis?.length === 0 && <li className="noNotisMsg">No Notifications</li>}
            {props?.notis?.map((noti, index) => {
                const message = noti.message.split(':')[0]
                const groupName = noti.message.split(':')[1]
                return (
                    <li className="notificationItem" key={index} index={index} onClick={handleNotiClick}>
                        {noti.read ? (
                            <>
                                {groupName ? (
                                    <div className="read">
                                        <div className="notiBody" todo='markread'>
                                            <p todo='nav'>{message}</p>
                                            <p className="groupName" todo='nav'>{groupName}</p>
                                        </div>
                                        <span className="pointer" todo='delete'>X</span>
                                    </div>
                                ) : (
                                    <div className="read" todo='noNav'>
                                        <p todo='noNav'>{message}</p>
                                        <span className="pointer" todo='delete'>X</span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {groupName ? (
                                    <div className="unread" todo='markread'>
                                        <div className="notiBody" todo='markread'>
                                            <p todo='nav'>{message}</p>
                                            <p className="groupName" todo='nav'>{groupName}</p>
                                        </div>
                                        <span className="pointer" todo='delete'>X</span>
                                    </div>
                                ) : (
                                    <div className="unread" todo='noNav'>
                                        <p todo='noNav'>{message}</p>
                                        <span className="pointer" todo='delete'>X</span>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                )
            })}

        </ul>

    )

};

export default Notifications;