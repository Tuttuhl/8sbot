require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');

client.on('message', receivedMessage);

function receivedMessage(message) {
    if(message.content === `${prefix}pick`) {
        const hardpointMaps = ['Moscow', 'Raid', 'Checkmate', 'Crossroads', 'Garrison'],
        searchMaps = ['Moscow', 'Raid', 'Checkmate', 'Miami', 'Garrison'],
        controlMaps = ['Raid', 'Checkmate', 'Garrison'],
        members = message.member.voice.channel.members;

        let teams = randomizeTeams(createPlayerList(members));
        console.log('teams: ' + teams);
        console.log('team1: ' + teams[0]);
        console.log('team2: ' + teams[1]);
        
        message.channel.send(respondWithTeams(teams) + respondWithMaps(hardpointMaps, searchMaps, controlMaps));
    } else if(message.content === `${prefix}caps`) {
        const hardpointMaps = ['Moscow', 'Raid', 'Checkmate', 'Crossroads', 'Garrison'],
        searchMaps = ['Moscow', 'Raid', 'Checkmate', 'Miami', 'Garrison'],
        controlMaps = ['Raid', 'Checkmate', 'Garrison'],
        members = message.member.voice.channel.members;

        let captains = randomizeCaptains(createPlayerList(members));

        message.channel.send(respondWithCaptains(captains) + respondWithMaps(hardpointMaps, searchMaps, controlMaps));
    } else if(message.content === `${prefix}maps`) {
        const hardpointMaps = ['Moscow', 'Raid', 'Checkmate', 'Crossroads', 'Garrison'],
        searchMaps = ['Moscow', 'Raid', 'Checkmate', 'Miami', 'Garrison'],
        controlMaps = ['Raid', 'Checkmate', 'Garrison'];

        message.channel.send(respondWithMaps(hardpointMaps, searchMaps, controlMaps));
    }
}

function respondWithMaps(hardpointMaps, searchMaps, controlMaps) {
    return '\n' + selectMap(hardpointMaps) + ' | ' + 'Hardpoint \n'
    + selectMap(searchMaps) + ' | ' + 'Search and Destroy \n'
    + selectMap(controlMaps) + ' | '  + 'Control \n'
    + selectMap(hardpointMaps) + ' | ' + 'Hardpoint \n'
    + selectMap(searchMaps) + ' | ' + 'Search and Destroy \n'
}

function respondWithTeams(teams) {
    return '\n' + 'Team 1: ' + teams[0] + '\nTeam 2: ' + teams[1];
}

function respondWithCaptains(captains) {
    return '\n' + 'First Pick Captain: ' + captains[0] + '\nSecond Pick Captain: ' + captains[1];
}

function selectMap(maps) {
    return maps[Math.floor(Math.random() * maps.length)]
}

function createPlayerList(members) {
    let players = [];

    members.forEach(element => players.push(element.user.username));
    
    return players;
}

function randomizeTeams(players) {
    let teamOne = [],
        teamTwo = [];

    for(var i = 0; i < 4; i++) {
        let randNum = Math.floor(Math.random() * players.length);
        teamOne.push(players[randNum]);
        players.splice(randNum, 1);
    }

    for(var i = 0; i < 4; i++) {
        let randNum = Math.floor(Math.random() * players.length);
        teamTwo.push(players[randNum]);
        players.splice(randNum, 1);
    }

    const teams = [teamOne, teamTwo];

    return teams;
}

function randomizeCaptains(players) {
    let captainOne = '',
        captainTwo = '',
        randNumOne = Math.floor(Math.random() * players.length),
        randNumTwo = Math.floor(Math.random() * players.length);
    
        captainOne = players[randNumOne];
        players.splice(randNumOne, 1);

        captainTwo = players[randNumTwo];
        players.splice(randNumTwo, 1);

        let captains = [captainOne, captainTwo];

        return captains;
}

client.login(process.env.TOKEN);
