import React from 'react';

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

function CharacterDetails({ jsonData }) {
    if (!jsonData) {
        return;
    }
    const advCharData = JSON.parse(jsonData);
    const rootImgUrl = 'https://cdn.lostark.games.aws.dev/';
    let allGears = [];
    for (let i = 0; i < 12; i++) {
        const curGear = advCharData.equipList[i];
        // gear equip
        if (i < 6) {
            allGears.push(
                <div key={i}>
                    <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                    <p>{curGear.name}</p>
                    <p>{curGear.itemLevel}</p>
                </div>
            )
        } else if (i < 11) { // accesories
            allGears.push(
                <div key={i}>
                    <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                    <p>{curGear.name}</p>
                    <p>{curGear.stats['Bonus Effect']}</p>
                    <p>{curGear.stats['Random Engraving Effect']}</p>
                </div>
            )
        } else { //ability stone
            allGears.push(
                <div key={i}>
                    <img style={getItemBg(curGear.grade)} src={rootImgUrl + curGear.icon} alt={curGear.icon}></img>
                    <p>{curGear.name}</p>
                    <p>{curGear.itemLevel}</p>
                    <p>{curGear.stats['Random Engraving Effect']}</p>
                </div>
            )
        }
    }
    let allStats = [];
    for (let i = 0; i < advCharData.statsList.length; i++) {
        const curStat = advCharData.statsList[i];
        allStats.push(
            <div key={i}>
                <p>{curStat.description + ": " + curStat.value}</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Stats: </h1>
            {allStats}
            <h1>Gear: </h1>
            {allGears}
        </div>
    );

};

export default CharacterDetails;