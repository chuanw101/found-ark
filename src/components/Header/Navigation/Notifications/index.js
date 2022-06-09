import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './style.css';

function Notifications(props) {
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
    const todo = e.target.getAttribute('todo');
    let index;
    let temp = e.target;
    while (!index) {
      index = temp.getAttribute('index');
      temp = temp.parentElement;
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
      
      navigate(`/group/${props.notis[index].group_id}`)
    }
    if (todo === 'delete') {
      delNoti(props.notis[index].id);
      let tempNotis = props.notis;
      tempNotis.splice(index, 1);
      props.setNotis(tempNotis);
      setUpdate(!update);
    }
  }

  console.log(props.notis)

  return (

    <ul className="notifications">

      {props?.notis?.map((noti, index) => {
        const message = noti.message.split(':')[0]
        const groupName = noti.message.split(':')[1]
        return (
          <li className="notificationItem" key={index} index={index} onClick={handleNotiClick}>
            {noti.read ? (
              <>
                <p className="read">{message}: <span className="groupName" todo='nav'>{groupName}</span> <span className="pointer" todo='delete'>❌</span></p>
              </>
            ) : (
              <>
                <p className="unread" todo='markread'>{message}: <span className="groupName" todo='nav'>{groupName}</span> <span className="pointer" todo='delete'>❌</span></p>
              </>
            )}
          </li>
        )
      })}

    </ul>

  )

};

export default Notifications;