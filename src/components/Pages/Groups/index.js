// import components
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Group from './Group';
import CreateGroup from './CreateGroup';
import MyGroups from './MyGroups';
import AllGroups from './AllGroups';
import './style.css';
import { act } from 'react-dom/test-utils';

function Groups({ user }) {

    const [currentTab, setCurrentTab] = useState('AllGroups');
    const [newTag, setTag] = useState("");
    const [tags, setAllTags] = useState([]);
    const [activeTags, setActiveTags] = useState([]);
    const [invalidTagsError, setInvalidTagsError] = useState('');
    const [autoCompleteTags, setAutoCompleteTags] = useState([]);

    // handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'tag') {
            setTag(value);
        };
    };

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

    // validate tag input
    const tagReg = /^[+-_a-zA-Z0-9]{2,}$/;
    // add tag to tags array
    const addTag = () => {
        if (newTag === '') {
            return;
        } else if (tags.includes(newTag)) {
            return;
        } else if (!tagReg.test(newTag)) {
            console.log("invalid tag entry")
            return;
        } else {
            setAllTags([...tags, { tag_name: newTag, active: true }]);
            setActiveTags([...activeTags, newTag]);
            setTag('');
        };
    };

    // listen for enter key press when adding tags
    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            addTag();
        };
    };

    const handleTagClick = (e) => {
        if (e.target.className === "savedTagsActive") {
            //e.target.className = "savedTagsInactive";
            let tempTags = [...tags];
            tempTags[e.target.getAttribute('value')].active = false;
            setAllTags([...tempTags]);
            let temp = tags.filter(tag => tag.active).map(tag => tag.tag_name);
            setActiveTags([...temp])
        } else if (e.target.className === "savedTagsInactive") {
            //e.target.className = "savedTagsActive";
            let tempTags = [...tags];
            tempTags[e.target.getAttribute('value')].active = true;
            setAllTags([...tempTags]);
            setActiveTags([...activeTags, tags[e.target.getAttribute('value')].tag_name])
        }
    }

    let navigate = useNavigate();

    const renderTab = () => {

        if (currentTab === 'AllGroups') {
            return <AllGroups currentTab={currentTab} setCurrentTab={setCurrentTab} user={user} activeTags={activeTags} />;
        };
        if (currentTab === 'MyGroups') {
            return user ? <MyGroups currentTab={currentTab} setcurrentTab={setCurrentTab} user={user} activeTags={activeTags} /> : navigate(`/login`);
        };
        if (currentTab === 'Group') {
            return user ? <Group currentTab={currentTab} setcurrentTab={setCurrentTab} /> : navigate(`/login`);
        };
        if (currentTab === 'CreateGroup') {
            return user ? <CreateGroup currentTab={currentTab} setcurrentTab={setCurrentTab} user={user} /> : navigate(`/login`);
        };
        return <AllGroups />;

    };

    const handleInvalidTags = () => {
        newTag === "" || newTag === [] || tagReg.test(newTag)
        ? setInvalidTagsError('')
        : setTimeout(() => setInvalidTagsError(<p className='inputErr'>Must only include letters, numbers, and _ + -</p>), 3000)
    };

    
    // get all tags
    const getAllTags = async () => {
        try {
            const res = await axios.get(`https://found-ark-backend.herokuapp.com/api/tags`);
            let sortedTags = res.data;
            // remove tags with no groups
            for (let i=0; i<sortedTags.length; i++) {
                if (sortedTags[i].groups.length === 0) {
                    sortedTags.splice(i,1);
                }
            }
            // sort
            sortedTags.sort((a,b)=> {
                return b.groups.length - a.groups.length
            })
            const allAutoTags = sortedTags.map(tag=>tag.tag_name);
            setAutoCompleteTags(allAutoTags)
            // default tags shown are top 4 most used tags by all groups
            if (sortedTags.length > 4) {
                sortedTags.splice(3, sortedTags.length-4);
            }
            const defaultTags = sortedTags.map(tag => ({ tag_name: tag.tag_name, active: false }));
            setAllTags(defaultTags)

        } catch (err) {
            console.log(err);
        };

    };

    useEffect(() => {
        getAllTags();
    }, []);

    useEffect(() => {
        handleInvalidTags()
    },[newTag]);

    return (

        <div className="page">

            <div className="tabHeader">
                <div className="searchTagsArea">
                {currentTab != "CreateGroup" && <input onChange={handleInputChange} className="filterSearch" type="search" id="tag" placeholder="Search tags..." name="tag" value={newTag} onKeyDown={handleKeyDown}></input>}
                {invalidTagsError}
                {/* <p className={newTag === "" || newTag === [] || tagReg.test(newTag) ? 'hidden inputErrP' : 'inputErrP'}>Must only include letters, numbers, and _ + -</p> */}
    
                {currentTab != "CreateGroup" && <div className="savedTags">
                    {tags.map((tag, index) =>
                        <p className={tag.active ? ("savedTagsActive") : ("savedTagsInactive")} key={index} value={index} onClick={handleTagClick}>{tag.tag_name}</p>)}
                </div>}
                </div>

                {user?.logged_in ? (
                    <div className="tabs" onClick={handleTabSelect}>

                        <input type="radio" id="allGroupsTab" name="groupTabs" value="allGroupsTab" defaultChecked className="tab"></input>
                        <label htmlFor="allGroupsTab" className={currentTab === 'AllGroups' ? "tabLabel activeTab" : "tabLabel"}>All Groups</label>

                        <input type="radio" id="myGroupsTab" name="groupTabs" value="myGroupsTab" className="tab"></input>
                        <label htmlFor="myGroupsTab" className={currentTab === 'MyGroups' ? "tabLabel activeTab" : "tabLabel"}>My Groups</label>

                        <div className="tabDivider"></div>

                        <input type="radio" id="createGroupsTab" name="groupTabs" value="createGroupsTab" className="tab"></input>
                        <label htmlFor="createGroupsTab" className={currentTab === 'CreateGroup' ? "tabLabel activeTab" : "tabLabel"}>Create New Group</label>

                    </div>
                ) : (<></>)}

            </div>

            {renderTab()}

        </div>

    );

};

export default Groups;