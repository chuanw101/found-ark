import React from 'react';

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

    if (!char) {
        return;
    };

    console.log("CHAR", char);

    const advCharData = JSON.parse(char.json_data);

    const rootImgUrl = 'https://cdn.lostark.games.aws.dev/';

    let allGears = [];

    console.log("CHAR DATA: ", advCharData);

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

    let allStats = [];

    for (let i = 0; i < advCharData.statsList.length; i++) {
        const curStat = advCharData.statsList[i];
        allStats.push(
            <div key={i} className="charStat">
                <h3>{curStat.value}</h3>
                <p>{curStat.description}</p>
            </div>
        )
    };

    return (

        <div className="charDetails">

            <div className="charHeadline">

                <img src={`https://cdn.lostark.games.aws.dev/EFUI_IconAtlas/PC/${advCharData.pcClassName?.toLowerCase()}.png`} alt={`${advCharData.pcClassName} preview`} className="charClassImg"></img>

                <div className="charInfo">

                    <h1>{advCharData.pcName}</h1>
                    <p>Character Class: {advCharData.pcClassName}</p>
                    <p>Character Lvl: {advCharData.pcLevel}</p>
                    <p>Item Lvl: {advCharData.maxItemLevel}</p>
                    <p>Roster Lvl: {advCharData.expeditionLvl}</p>
                    <p>Engravings: {char.engravings ? char.engravings : 'N/A'}</p>


                    <div className="charStats">
                        {allStats}
                    </div>

                </div>

            </div>

            <div className="charGears">

                {allGears}

            </div>

        </div>

    );

};

export default CharacterDetails;