// import components
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Group from './Group';
import CreateGroup from './CreateGroup';
import MyGroups from './MyGroups';
import AllGroups from './AllGroups';
import './style.css';

function Groups({ user }) {

    const [currentTab, setCurrentTab] = useState('AllGroups');

    const handleTabSelect = () => {

        if (document.getElementById('allGroupsTab').checked) {
            setCurrentTab('AllGroups');
        };
        if (document.getElementById('myGroupsTab').checked) {
            setCurrentTab('MyGroups')
        };
        if (document.getElementById('createGroupsTab').checked) {
            setCurrentTab('CreateGroup')
        };

    };

    let navigate = useNavigate();

    const renderTab = () => {

        if (currentTab === 'AllGroups') {
            return <AllGroups currentTab={currentTab} setCurrentTab={setCurrentTab} user={user} />;
        };
        if (currentTab === 'MyGroups') {
            return user ? <MyGroups currentTab={currentTab} setcurrentTab={setCurrentTab} /> : navigate(`/login`);
        };
        if (currentTab === 'Group') {
            return user ? <Group currentTab={currentTab} setcurrentTab={setCurrentTab} /> : navigate(`/login`);
        };
        if (currentTab === 'CreateGroup') {
            return user ? <CreateGroup currentTab={currentTab} setcurrentTab={setCurrentTab} /> : navigate(`/login`);
        };
        return <AllGroups />;

    };

    return (

        <div className="page">

            <div className="groupsHeader">

                <input type="search" id="groupFilter" placeholder="Search tags..." className="filterSearch"></input>

                {user?.logged_in ? (
                    <div className="groupTabs" onClick={handleTabSelect}>

                        <input type="radio" id="allGroupsTab" name="groupTabs" value="allGroupsTab" defaultChecked className="groupTab"></input>
                        <label htmlFor="allGroupsTab" className={currentTab === 'AllGroups' ? "groupTabLabel activeTab" : "groupTabLabel"}>All Groups</label>

                        <input type="radio" id="myGroupsTab" name="groupTabs" value="myGroupsTab" className="groupTab"></input>
                        <label htmlFor="myGroupsTab" className={currentTab === 'MyGroups' ? "groupTabLabel activeTab" : "groupTabLabel"}>My Groups</label>

                        <div className="tabDivider"></div>

                        <input type="radio" id="createGroupsTab" name="groupTabs" value="createGroupsTab" className="groupTab"></input>
                        <label htmlFor="createGroupsTab" className={currentTab === 'CreateGroup' ? "groupTabLabel activeTab" : "groupTabLabel"}>Create New Group</label>

                    </div>
                ) : (<></>)}

            </div>

            {renderTab()}

        </div>

    );

};

export default Groups;