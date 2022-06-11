# Final Project: Found Ark

## License

![license](https://img.shields.io/badge/MIT-blue)

## Table of Contents
- [Final Project: Found Ark](#final-project-found-ark)
  - [License](#license)
  - [Table of Contents](#table-of-contents)
  - [Technologies](#technologies)
  - [Description](#description)
  - [Contributors](#contributors)
  - [User Story](#user-story)
  - [Deployed Link](#deployed-link)
  - [Screenshots](#screenshots)
  - [Installation](#installation)

## Technologies

- React: Embed, Route, Dom, AutoComplete, Scripts
- HTML, CSS
- Node
- Express
- Socket.io
- MySQL
- RESTful Routes, CRUD actions
- JWT Tokens
- WidgetBot
- Axios
- Validator
- Moment

## Description

A web application that ...

## Contributors

[Eli Wood - Project Manager](https://github.com/MrEliWood)
<br>
[Chuan Wang - Git Administrator](https://github.com/chuanw101)
<br>
[Hannah Callison - Team Member](https://github.com/hannahcallison)

## User Story

```md
As a user, I want to have a website where I can create and join groups for raids in the Lost Ark game...
So that I can have an easy and fast way to join campaigns

When I open the website, then I am presented with active groups...
When I create an account or login, then I can view the groups I belong to, create a new group, or apply to a new group, I can also add my characters to my profile...
When I go to my profile, then I can view my characters and their stats, I can add new characters to my account, I can update my characters information, and I can edit my characters information...
When I go to my profile and click edit profile, then I can also edit my region and introduction... 
When I add a new character, then I can search for an existing character or I can create a character manually...
When I click the update icon on my characters card, then the database pulls the most updated information and updates the card with any changes...
When I click the edit character button, then I can manually update my characters information... 
When I click Groups, then I am taken to the homepage that displays all of the groups in that region and a search bar...
When I search for tags in the search bar, then I see all of the groups with those active tags...
When I click on the active tags, then they become deactivated and don't filter anymore...
When I click on an inactive tag, then it becomes active and filters groups with that tag...
When I click My Groups, then I am taken to a page that populates the groups I belong to and own... 
When I click All Groups, then I can see all of the groups that belong to that region and can apply to a group I dont belong to...
When I apply to a group, then the database auto sends my character stats to the group leader to approve or deny...
When I am accepted into a group, then I can view the group page and interact with their discord widget or use their discord link and stats...
When I click Create New Group then I cna  create a group, I am asked to fill out information about my teams name, description, time, time zone, discord info, and relevant tags..
When I am on a group page that I own, then I can change the embedded discord server, or group information, I can also permanantly delete my group...
When I am a group leader, then I can accept or reject incoming applications, I can also kick group members out of the group...
When I click the notification button, I am shown groups that have accepted or rejected my application, I can also see who is trying to apply to groups I own...

When I click the logout I am logged out
```

## Deployed Link
[Deployed Found Ark Link](https://found-ark.herokuapp.com/)

## Screenshots

Login             |  Create Account
:-------------------------:|:-------------------------:
<img src="public/assets/images/../../../public/assets/images/readme/login.png" alt="login" width="400"/>|<img src="public/assets/images/../../../public/assets/images/readme/createAcct.png" alt="create account" width="400"/>

All Groups             |  My Groups
:-------------------------:|:-------------------------:
<img src="public/assets/images/../../../public/assets/images/readme/allgroups.png" alt="all groups" width="400"/>|<img src="public/assets/images/../../../public/assets/images/readme/mygroups.png" alt="mygroups" width="400"/>

My Characters             |  Edit Character
:-------------------------:|:-------------------------:
<img src="public/assets/images/../../../public/assets/images/readme/mychars.png" alt="my characters" width="400"/>|<img src="public/assets/images/../../../public/assets/images/readme/editchar.png" alt="edit character" width="400"/>

Create Group             |  Add Character
:-------------------------:|:-------------------------:
<img src="public/assets/images/../../../public/assets/images/readme/creategroup.png" alt="create group" width="400"/>|<img src="public/assets/images/../../../public/assets/images/readme/addchar.png" alt="add character" width="400"/>

Applicants             |  Discord Widget
:-------------------------:|:-------------------------:
<img src="public/assets/images/../../../public/assets/images/readme/applicant.png" alt="applicant" width="400"/>|<img src="public/assets/images/../../../public/assets/images/readme/discord.png" alt="discord widget" width="400"/>

Edit Profile             |  Group View if user does not belong
:-------------------------:|:-------------------------:
<img src="public/assets/images/../../../public/assets/images/readme/editprofile.png" alt="edit profile" width="400"/>|<img src="public/assets/images/../../../public/assets/images/readme/groupdontbelong.png" alt="group view if user doesnt belong" width="400"/>


## Installation

The deployed link is active and interactive. If a user wants to run this program on their local host, they need to run the command ``` npm i ``` in their integrated terminal. When the installation is complete they can run the command ``` npm run start ``` to open and run the site in their local host.
