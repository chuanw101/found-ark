import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../../styles/modals.css";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";

function DelGroupModal({ setDelGroupModalOpen, group, sendNoti }) {
    const [groupName, setGroupName] = useState("");

    let navigate = useNavigate();

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'groupName') {
            setGroupName(value);
        }
    };

    const confirmDelete = async () => {
        if (groupName != group.group_name) {
            return
        }
        try {
            navigate('/')
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.delete(`https://found-ark-backend.herokuapp.com/api/groups/${group.id}`, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            console.log("res==============")
            console.log(res)
            for (const noti of res.data) {
                sendNoti(noti);
            }
            // setGroupName("");
            // setDelGroupModalOpen(false);
        } catch (err) {
            alert("error!")
            console.log(err);
        };
    }

    return (
        <div className="modalBackground" onClick={() => setDelGroupModalOpen(false)}>
            <div className="modalContainer" onClick={e => e.stopPropagation()}>

                <form>
                    <div className="title">
                        <h1>Are you sure you want to delete this group PERMANENTLY?</h1>
                    </div>

                    <div className="body">
                        <ul>
                            <li className="subTitle">Everything about the group will be DELETED</li>
                        </ul>
                    </div>
                    <div className="footerDis">
                        <label htmlFor="groupName">Enter Group Name to Confirm Delete: {group.group_name})</label>
                        <input type="text" placeholder={group.group_name} name="groupName" value={groupName} onChange={handleInputChange} />
                        {groupName!==group.group_name && <p>Group name does not match</p>}
                        <div className="footer">
                            {groupName===group.group_name && <button onClick={confirmDelete}>Confirm Delete</button>}
                            <button onClick={() => setDelGroupModalOpen(false)} className="cxlBtn">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DelGroupModal;