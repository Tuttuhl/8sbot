require('dotenv').config()

const Discord = require('discord.js')
const { prefix } = require('./config.json')
const client = new Discord.Client()

// Array of maps for each mode. Maybe flags for different CoD titles in the future?
const hardpointMaps = [
  'Al Bagra Fortress',
  'Breenburgh Hotel',
  'Embassy',
  'Mercado Las Almas',
  'Zarqwa Hydroelectric'
]
const searchMaps = [
  'El Asilo',
  'Breenburgh Hotel',
  'Embassy',
  'Farm 18',
  'Mercado Las Almas'
]
const controlMaps = [
  'Embassy',
  'Mercado Las Almas',
  'Breenburgh Hotel'
]

// Login to the client using the secret token.
client.login(process.env.TOKEN)
// Set a listener for receiving a message.
client.on('message', receivedMessage)

// Act upon messages sent to the text channel the bot is tied to.
function receivedMessage (message) {
  if (message.content === `${prefix}maps`) {
    // !maps = randomly select five maps from the map pool
    sendMaps(message.channel)
  } else if (message.content === `${prefix}all`) {
    // !all = randomly select five maps from the map pool and choose two teams of four players.
    if (message.member.voice.channel) {
      if (message.member.voice.channel.members.size >= 8) {
        const members = message.member.voice.channel.members
        const teams = randomizeTeams(createPlayerList(members))

        sendMaps()
        sendTeams(teams)
      } else {
        sendError(message.channel,
          'Please ensure there are at least 8 players in your voice channel!'
        )
      }
    } else {
      sendError(message.channel, 'Please join a voice channel first!')
    }
  } else if (message.content === `${prefix}pick`) {
    // !pick = select two teams of four based on members in the same voice channel as the user who activated command.
    if (message.member.voice.channel) {
      if (message.member.voice.channel.members.size >= 8) {
        const members = message.member.voice.channel.members
        const teams = randomizeTeams(createPlayerList(members))

        sendTeams(message.channel, teams)
      } else {
        sendError(message.channel, 'Please ensure there are at least 8 players in your voice channel!')
      }
    } else {
      sendError(message.channel, 'Please join a voice channel!')
    }
  } else if (message.content === `${prefix}caps`) {
    // !caps = select two random captains from the members in the same voice channel as user who activated command.
    if (message.member.voice.channel) {
      if (message.member.voice.channel.members.size >= 2) {
        const members = message.member.voice.channel.members
        const captains = randomizeCaptains(createPlayerList(members))

        sendCaptains(message.channel, captains)
      } else {
        sendError(message.channel, 'Please ensure there are at least 2 players in your voice channel!')
      }
    } else {
      sendError(message.channel, 'Please join a voice channel!')
    }
  }
}

// Send an error message in the Discord text channel.
function sendError (channel, message) {
  const messageEmbed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('ERROR')
    .setDescription(message)

  channel.send(messageEmbed)
}

// Send an embedded message with the maps in the Discord text channel.
function sendMaps (channel) {
  const messageEmbed = new Discord.MessageEmbed()
    .setColor('#ffffff')
    .setTitle('Randomized Maps')
    .addField('Hardpoint', selectMap(hardpointMaps), true)
    .addField('Search and Destroy', selectMap(searchMaps), true)
    .addField('Control', selectMap(controlMaps), true)
    .addField('Hardpoint', selectMap(hardpointMaps), true)
    .addField('Search and Destroy', selectMap(searchMaps), true)

  channel.send(messageEmbed)
}

// Send an embedded message with the teams in the Discord text channel.
function sendTeams (channel, teams) {
  const messageEmbed = new Discord.MessageEmbed()
    .setColor('#ffffff')
    .setTitle('Randomized Teams')
    .setDescription('Good luck to both teams and enjoy the match!')
    .addField('Team 1', teams[0], true)
    .addField('Team 2', teams[1], true)

  channel.send(messageEmbed)
}

// Send an embedded message with the captains to the Discord text channel.
function sendCaptains (channel, captains) {
  const messageEmbed = new Discord.MessageEmbed()
    .setColor('#ffffff')
    .setTitle('Randomized Captains')
    .setDescription('Choose wisely.')
    .addField('First Captain', captains[0], true)
    .addField('Second Captain', captains[1], true)

  channel.send(messageEmbed)
}

// Randomly select a map from the array of maps given.
function selectMap (maps) {
  return maps[Math.floor(Math.random() * maps.length)]
}

// Create a list of players from the members property.
function createPlayerList (members) {
  const players = []

  members.forEach(element => players.push(element.user.username))

  return players
}

// Randomly select two teams of four users.
function randomizeTeams (players) {
  const teamOne = []
  const teamTwo = []

  for (let i = 0; i < 4; i++) {
    const randNum = Math.floor(Math.random() * players.length)
    teamOne.push(players[randNum])
    players.splice(randNum, 1)
  }

  for (let j = 0; j < 4; j++) {
    const randNum = Math.floor(Math.random() * players.length)
    teamTwo.push(players[randNum])
    players.splice(randNum, 1)
  }

  const teams = [teamOne, teamTwo]

  return teams
}

// Randomly select two users as captains.
function randomizeCaptains (players) {
  let captainOne = ''
  let captainTwo = ''
  const randNumOne = Math.floor(Math.random() * players.length)
  const randNumTwo = Math.floor(Math.random() * players.length)

  captainOne = players[randNumOne]
  players.splice(randNumOne, 1)

  captainTwo = players[randNumTwo]
  players.splice(randNumTwo, 1)

  const captains = [captainOne, captainTwo]

  return captains
}
