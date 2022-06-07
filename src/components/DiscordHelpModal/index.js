import React, { useState } from "react";
import axios from 'axios';
import "./style.css";

function DiscordHelpModal({ setOpenModal, setGroup, group }) {
    const [discord, setDiscord] = useState("");

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'discord') {
            setDiscord(value);
        };
    };

    const submitDiscord = async() => {
        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.put(`https://found-ark-backend.herokuapp.com/api/groups/${group.id}`, {
                discord: discord,
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            console.log(res);
            group.discord=discord;
            setGroup(group);
            setDiscord('');
            setOpenModal(false);
        } catch (err) {
            if (err?.response?.data?.msg === 'an error occured') {
                alert("An error occured")
            }
            console.log(err);
        };
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">
                    <h1>Follow the steps to embed your own discord channel!</h1>
                </div>

                <div className="body">
                    <ul>
                        <li>Add WidgetBot to your discord channel using this <a href='https://add.widgetbot.io/' target='_blank' rel='noopener noreferer'>link</a>.</li>
                        <li>Type /setup in your discord channel and follow steps to finish setup.</li>
                        <li>Enter discord link, server id, and channel id below seperated by empty space.</li>
                        <li>Click submit and you are done!</li>
                    </ul>
                </div>
                <div className="footer">
                    <input type="text" placeholder="https://discord.gg/aaaa 111111111 111111111" name="discord" value={discord} onChange={handleInputChange} />
                    <button onClick={submitDiscord}>Submit</button>
                    <button onClick={()=>setOpenModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DiscordHelpModal;