import React, { useState } from 'react';

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

function CharacterDetails({ char }) {

    const [statsActive, setStatsActive] = useState(false);

    if (!char) {
        return;
    };

    console.log("CHAR", char);

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
                    <div key={i} className="charGear">
                        <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                        <div className="gearInfo">
                            <h4>{curGear.name}</h4>
                            <p>{curGear.itemLevel}</p>
                        </div>
                    </div>
                )
            } else if (i < 11) { // accesories
                allGears.push(
                    <div key={i} className="charGear">
                        <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                        <div className="gearInfo">
                            <h4>{curGear.name}</h4>
                            {bonusEffect.map(effect => <p>{effect}</p>)}
                            {engravingEffect.map(effect => <p>{effect}</p>)}
                        </div>
                    </div>
                )
            } else { //ability stone
                allGears.push(
                    <div key={i} className="charGear">
                        <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                        <div className="gearInfo">
                            <h4>{curGear.name}</h4>
                            <p>{curGear.itemLevel}</p>
                            {engravingEffect.map(effect => <p>{effect}</p>)}
                        </div>
                    </div>
                )
            };

        };

        for (let i = 0; i < advCharData.statsList.length; i++) {
            const curStat = advCharData.statsList[i];
            allStats.push(
                <div key={i} className="charStat">
                    <h3>{curStat.value}</h3>
                    <p>{curStat.description}</p>
                </div>
            )
        };

    };

    const checkStatus = () => {
        statsActive ? setStatsActive(false) : setStatsActive(true);
    };

    return (

        <div className="charDetails">

            <div className="charHeadline">

                {advCharData ? <img src={`https://cdn.lostark.games.aws.dev/EFUI_IconAtlas/PC/${advCharData.pcClassName?.toLowerCase()}.png`} alt={`${advCharData.pcClassName} preview`} className="charClassImg"></img> : ''}

                <div className="charInfo">

                    <h1>{advCharData ? advCharData.pcName : char.char_name}</h1>

                    <div className="statButtonContainer">

                        <div className="charSpecs">
                            <p>Character Class:</p>
                            <h3>{advCharData ? advCharData.pcClassName : char.class}</h3>

                            <p>Character Lvl:</p>
                            <h3>{advCharData ? advCharData.pcLevel : char.class}</h3>

                            <p>Item Lvl:</p>
                            <h3>{advCharData ? Math.floor(advCharData.maxItemLevel) : char.item_lvl}</h3>

                            <p>Roster Lvl:</p>
                            <h3>{advCharData ? advCharData.expeditionLvl : char.roster_lvl}</h3>

                            <p>Engravings:</p>
                            <h3>{char.engravings ? char.engravings : '0'}</h3>
                        </div>

                        <button onClick={checkStatus} className={"collapsible " + (statsActive ? "closed" : "open")}>Stats & Gear</button>

                    </div>

                </div>

            </div>

            <div className={"fullCharInfo " + (statsActive ? "" : "collapsed")}>

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