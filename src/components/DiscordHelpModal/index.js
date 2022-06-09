import React, { useState } from "react";
import axios from 'axios';
import "../../styles/modals.css";

function DiscordHelpModal({ setOpenModal, setGroup, group }) {
    const [discord, setDiscord] = useState("");
    const [link, setLink] = useState("");
    const [channel, setChannel] = useState("");
    const [server, setServer] = useState("");

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'discordLink') {
            setLink(value);
        }
        if (name === 'discordChannel') {
            setChannel(value);
        }
        if (name === 'discordServer') {
            setServer(value);
        }
    };

    const submitDiscord = async () => {
        try {
            const token = localStorage.getItem('foundArkJwt');
            const res = await axios.put(`https://found-ark-backend.herokuapp.com/api/groups/${group.id}`, {
                discord: link + " " + server + " " + channel,
            }, {
                headers: {
                    'Authorization': `token ${token}`
                }
            });

            console.log(res);
            group.discord = link + " " + server + " " + channel;
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
        <div className="modalBackground" onClick={() => setOpenModal(false)}>
            <div className="modalContainer" onClick={e => e.stopPropagation()}>

                <form>
                    <div className="title">
                        <h1>Embed Discord Server</h1>
                    </div>

                    <div className="body">
                        <ul>
                            <li className="subTitle">Before Embedding Discord Channel:</li>
                            <li>Add WidgetBot to your discord server using <a href='https://add.widgetbot.io/' target='_blank' rel='noopener noreferer'>this link</a>.</li>
                            <li>Type '/setup' in your discord channel and follow the prompts.</li>
                            <br></br>
                            <li className="subTitle">After WidgetBot Setup:</li>
                        </ul>
                    </div>
                    <div className="footerDis">
                        <label htmlFor="discordLink">Discord Link</label>
                        <input type="text" placeholder="https://discord.gg/aaaa" name="discordLink" value={link} onChange={handleInputChange} />
                        <label htmlFor="discordServer">Discord Server</label>
                        <input type="text" placeholder="983439059089240064" name="discordServer" value={server} onChange={handleInputChange} />
                        <label htmlFor="discordChannel">Discord Channel</label>
                        <input type="text" placeholder="983439059542233140" name="discordChannel" value={channel} onChange={handleInputChange} />
                        <div className="footer">
                            <button onClick={() => setOpenModal(false)} className="cxlBtn">Cancel</button>
                            <button onClick={submitDiscord}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DiscordHelpModal;