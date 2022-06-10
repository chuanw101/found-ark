import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

function getItemBg(grade) {
    if (grade === 1) {
        return { background: "linear-gradient(136.36deg, #191A18 8.49%, #35411D 92.54%)" }
    }
    if (grade === 2) {
        return { background: "linear-gradient(136.36deg, #111B26 8.49%, #123F60 92.54%)" }
    }
    if (grade === 3) {
        return { background: "linear-gradient(136.36deg, #271333 8.49%, #470D5A 92.54%)" }
    }
    if (grade === 4) {
        return { background: "linear-gradient(136.36deg, #301C01 8.49%, #AD6600 92.54%)" }
    }
    if (grade === 5) {
        return { background: "linear-gradient(136.36deg, #361807 8.49%, #a84203 92.54%)" }
    }
    if (grade === 6) {
        return { background: "linear-gradient(136.36deg, #413728 8.49%, #D4C193 92.54%)" }
    }
}

function CharacterDetails({ char, editChar, setCharModalOpen, setSelectedChar, applicant, approve, decline }) {

    const [statsActive, setStatsActive] = useState(false);

    const token = localStorage.getItem('foundArkJwt');

    if (!char) {
        return;
    };

    console.log('CHAR: ', char.char_name);

    let advCharData;

    if (char.json_data) {
        advCharData = JSON.parse(char.json_data);
    };

    const rootImgUrl = 'https://cdn.lostark.games.aws.dev/';

    let allGears = [];
    let allStats = [];

    if (advCharData) {

        for (let i = 0; i < 12; i++) {

            const curGear = advCharData.equipList[i];

            const bonusEffect = curGear.stats['Bonus Effect'];
            const engravingEffect = curGear.stats['Random Engraving Effect'];

            // gear equip
            if (i < 6) {
                allGears.push(
                    <div key={"gear" + i} className="charGear">
                        <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                        <div className="gearInfo">
                            <h4>{curGear.name}</h4>
                            <p>{curGear.itemLevel}</p>
                        </div>
                    </div>
                )
            } else if (i < 11) { // accesories
                allGears.push(
                    <div key={"gear" + i} className="charGear">
                        <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                        <div className="gearInfo">
                            <h4>{curGear.name}</h4>
                            {bonusEffect.map(effect => <p>{effect?.replace('[', '').replace(']', '').replace('Node', '')}</p>)}
                            {engravingEffect.map(effect => <p>{effect?.replace('[', '').replace(']', '').replace('Node', '')}</p>)}
                        </div>
                    </div>
                )
            } else { //ability stone
                allGears.push(
                    <div key={"gear" + i} className="charGear">
                        <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                        <div className="gearInfo">
                            <h4>{curGear.name}</h4>
                            <p>{curGear.itemLevel}</p>
                            {engravingEffect.map(effect => <p>{effect?.replace('[', '').replace(']', '').replace('Node', '')}</p>)}
                        </div>
                    </div>
                )
            };

        };

        for (let i = 0; i < advCharData.statsList.length; i++) {
            const curStat = advCharData.statsList[i];
            allStats.push(
                <div key={"stat" + i} className="charStat">
                    <h3>{curStat.value}</h3>
                    <p>{curStat.description}</p>
                </div>
            )
        };

    };

    const updateChar = async () => {

        try {

            const res = await axios.get(`https://lostark-lookup.herokuapp.com/api/query?pcName=${char.char_name}`);

            if (res.data?.length) {

                const charData = res.data[0];

                try {
                    await axios.put(`https://found-ark-backend.herokuapp.com/api/characters/${char.id}`, {
                        char_name: charData.pcName,
                        class: charData.pcClassName,
                        item_lvl: charData.maxItemLevel,
                        roster_lvl: charData.expeditionLvl,
                        char_lvl: charData.pcLevel,
                        json_data: charData.jsonData,
                    }, {
                        headers: {
                            'Authorization': `token ${token}`
                        }
                    })
                    window.location.reload(true);
                } catch (err) {
                    console.log(err);
                };

            };

        } catch (err) {
            console.log(err);
        };

    };

    const checkStatus = () => {
        statsActive ? setStatsActive(false) : setStatsActive(true);
    };

    return (

        <div onClick={checkStatus} className={"charCard " + (statsActive ? "" : "collapsed")}>

            <div className={"charHeadline " + char?.class.toLowerCase()}>

                <div className="charInfo">

                    <h3>{advCharData ? advCharData.pcName : char.char_name}</h3>

                    <div className="charSpecs">

                        {char.class ?
                            <div>
                                <h4>Character Class</h4>
                                <p>{advCharData ? advCharData.pcClassName : char.class}</p>
                            </div>
                            : ''
                        }

                        {char.char_lvl ?
                            <div>
                                <h4>Character Level</h4>
                                <p>{advCharData ? advCharData.pcLevel : char.char_lvl}</p>
                            </div>
                            : ''
                        }

                        {char.item_lvl ?
                            <div>
                                <h4>Item Level</h4>
                                <p>{advCharData ? Math.floor(advCharData.maxItemLevel) : char.item_lvl}</p>
                            </div>
                            : ''
                        }

                        {char.roster_lvl ?
                            <div>
                                <h4>Roster Level</h4>
                                <p>{advCharData ? advCharData.expeditionLvl : char.roster_lvl}</p>
                            </div>
                            : ''
                        }

                        {char.engravings ?
                            <div>
                                <h4>Engravings</h4>
                                <p>{char.engravings ? char.engravings : ''}</p>
                            </div>
                            : ''
                        }

                    </div>

                    {advCharData ? <h4 className="collapsible">Full Stats & Gear<span className={"carrot " + (statsActive ? "open" : "closed")}></span></h4> : ''}

                </div>

                {editChar ? <div className="editCharacterContainer">

                    <img src="/assets/icons/refresh-icon.png" alt="refresh icon" className="updateCharBtn" onClick={() => { updateChar(); }}></img>
                    <button className="editCharBtn" onClick={() => { setCharModalOpen(true); setSelectedChar(char); }}>Edit</button>

                </div> : applicant ? <div className="applicantContainer">

                    <div className="appUser">
                        <h3 className="appUsername">{char?.owner?.user_name}</h3>
                        <p className="appIntro">{char?.owner?.introduction}</p>
                    </div>

                    <div className="appBtns">
                        <button className="appDeclineBtn" value={char.id} onClick={decline}>Decline</button>
                        <button className="appApproveBtn" value={char.id} onClick={approve}>Approve</button>
                    </div>

                </div> : <div className="applicantContainer">

                    <div className="appUser invisibleHover">
                        <h3 className="appUsername">{char?.owner?.user_name}</h3>
                        <p className="appIntro">{char?.owner?.introduction}</p>
                    </div>

                </div>}

            </div>

            <div className="fullCharInfo">

                <div className="charStats">
                    {allStats}
                </div>

                <div className="charGears">
                    {allGears}
                </div>

            </div>

        </div>

    );

};

export default CharacterDetails;