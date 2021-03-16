require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix } = require('./config.json');

client.on('message', receivedMessage);

function receivedMessage(message) {
    if (message.content === `${prefix}pick`) {
        const hardpointMaps = ['Moscow', 'Raid', 'Checkmate', 'Crossroads', 'Garrison'],
            searchMaps = ['Moscow', 'Raid', 'Checkmate', 'Miami', 'Garrison'],
            controlMaps = ['Raid', 'Checkmate', 'Garrison'],
            members = message.member.voice.channel.members;
        let teams = randomizeTeams(createPlayerList(members));
        const messageEmbed = new Discord.MessageEmbed()
            .setColor('#ffffff')
            .setTitle('Randomized Teams/Maps')
            .setDescription('Good luck to both teams and enjoy the match!')
            .addField('Team 1', teams[0], true)
            .addField('Team 2', teams[1], true)
            .addField('Hardpoint', selectMap(hardpointMaps), true)
            .addField('Search and Destroy', selectMap(searchMaps), true)
            .addField('Control', selectMap(controlMaps), true)
            .addField('Hardpoint', selectMap(hardpointMaps), true)
            .addField('Search and Destroy', selectMap(searchMaps), true)

        message.channel.send(messageEmbed);
    } else if (message.content === `${prefix}caps`) {
        const hardpointMaps = ['Moscow', 'Raid', 'Checkmate', 'Crossroads', 'Garrison'],
            searchMaps = ['Moscow', 'Raid', 'Checkmate', 'Miami', 'Garrison'],
            controlMaps = ['Raid', 'Checkmate', 'Garrison'],
            members = message.member.voice.channel.members;
        let captains = randomizeCaptains(createPlayerList(members));

        const messageEmbed = new Discord.MessageEmbed()
            .setColor('#ffffff')
            .setTitle('Randomized Captains/Maps')
            .setDescription('Good luck to both teams and enjoy the match!')
            .addField('First Captain', captains[0], true)
            .addField('Second Captain', captains[1], true)
            .addField('Hardpoint', selectMap(hardpointMaps), true)
            .addField('Search and Destroy', selectMap(searchMaps), true)
            .addField('Control', selectMap(controlMaps), true)
            .addField('Hardpoint', selectMap(hardpointMaps), true)
            .addField('Search and Destroy', selectMap(searchMaps), true)

        message.channel.send(messageEmbed);
    } else if (message.content === `${prefix}maps`) {
        const hardpointMaps = ['Moscow', 'Raid', 'Checkmate', 'Apocalypse', 'Garrison'],
            searchMaps = ['Moscow', 'Raid', 'Checkmate', 'Miami', 'Express'],
            controlMaps = ['Raid', 'Checkmate', 'Garrison'];

        const messageEmbed = new Discord.MessageEmbed()
            .setColor('#ffffff')
            .setTitle('Randomized Maps')
            .setDescription('Good luck to both teams and enjoy the match!')
            .addField('Hardpoint', selectMap(hardpointMaps), true)
            .addField('Search and Destroy', selectMap(searchMaps), true)
            .addField('Control', selectMap(controlMaps), true)
            .addField('Hardpoint', selectMap(hardpointMaps), true)
            .addField('Search and Destroy', selectMap(searchMaps), true)

        message.channel.send(messageEmbed);
    }
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

    for (var i = 0; i < 4; i++) {
        let randNum = Math.floor(Math.random() * players.length);
        teamOne.push(players[randNum]);
        players.splice(randNum, 1);
    }

    for (var i = 0; i < 4; i++) {
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
