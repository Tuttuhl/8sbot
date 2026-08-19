require('dotenv').config()

import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
})

// Array of maps for each mode. Maybe flags for different CoD titles in the future?
const hardpointMaps = [
  'Blackheart',
  'Colossus',
  'Den',
  'Exposure',
  'Scar'
]

const searchMaps = [
  'Colossus',
  'Den',
  'Exposure',
  'Raid',
  'Scar'
]

const overloadMaps = [
  'Den',
  'Exposure',
  'Scar'
]

client.login(process.env.TOKEN)
client.on('interactionCreate', handleInteraction)

async function handleInteraction (interaction) {
  if (!interaction.isChatInputCommand()) return

  switch (interaction.commandName) {
    case 'maps':
      await interaction.reply({ embeds: [buildMapsEmbed()] })
      break
    case 'all':
      await handleVoiceCommand(interaction, 8, async (players) => {
        const teams = randomizeTeams(players)
        await interaction.reply({ embeds: [buildMapsEmbed()] })
        await interaction.followUp({ embeds: [buildTeamsEmbed(teams)] })
      })
      break
    case 'pick':
      await handleVoiceCommand(interaction, 8, async (players) => {
        const teams = randomizeTeams(players)
        await interaction.reply({ embeds: [buildTeamsEmbed(teams)] })
      })
      break
    case 'caps':
      await handleVoiceCommand(interaction, 2, async (players) => {
        const captains = randomizeCaptains(players)
        await interaction.reply({ embeds: [buildCaptainsEmbed(captains)] })
      })
      break
  }
}

async function handleVoiceCommand (interaction, minPlayers, callback) {
  const voiceChannel = interaction.member.voice.channel

  if (!voiceChannel) {
    await sendError(interaction, 'Please join a voice channel first!')
    return
  }

  const players = createPlayerList(voiceChannel.members)

  if (players.length < minPlayers) {
    await sendError(
      interaction,
      `Please ensure there are at least ${minPlayers} players in your voice channel!`
    )
    return
  }

  await callback(players)
}

async function sendError (interaction, message) {
  await interaction.reply({
    embeds: [buildErrorEmbed(message)],
    ephemeral: true
  })
}

function buildErrorEmbed (message) {
  return new EmbedBuilder()
    .setColor('#ff0000')
    .setTitle('ERROR')
    .setDescription(message)
}

function buildMapsEmbed () {
  return new EmbedBuilder()
    .setColor('#ffffff')
    .setTitle('Randomized Maps')
    .addFields(
      { name: 'Hardpoint', value: selectMap(hardpointMaps), inline: true },
      { name: 'Search and Destroy', value: selectMap(searchMaps), inline: true },
      { name: 'overload', value: selectMap(overloadMaps), inline: true },
      { name: 'Hardpoint', value: selectMap(hardpointMaps), inline: true },
      { name: 'Search and Destroy', value: selectMap(searchMaps), inline: true }
    )
}

function buildTeamsEmbed (teams) {
  return new EmbedBuilder()
    .setColor('#ffffff')
    .setTitle('Randomized Teams')
    .setDescription('Good luck to both teams and enjoy the match!')
    .addFields(
      { name: 'Team 1', value: String(teams[0]), inline: true },
      { name: 'Team 2', value: String(teams[1]), inline: true }
    )
}

function buildCaptainsEmbed (captains) {
  return new EmbedBuilder()
    .setColor('#ffffff')
    .setTitle('Randomized Captains')
    .setDescription('Choose wisely.')
    .addFields(
      { name: 'First Captain', value: captains[0], inline: true },
      { name: 'Second Captain', value: captains[1], inline: true }
    )
}

function selectMap (maps) {
  return maps[Math.floor(Math.random() * maps.length)]
}

function createPlayerList (members) {
  const players = []

  members.forEach(member => {
    if (!member.user.bot) players.push(member.user.username)
  })

  return players
}

function randomizeTeams (players) {
  const teamOne = []
  const teamTwo = []
  const pool = [...players]

  for (let i = 0; i < 4; i++) {
    const randNum = Math.floor(Math.random() * pool.length)
    teamOne.push(pool[randNum])
    pool.splice(randNum, 1)
  }

  for (let j = 0; j < 4; j++) {
    const randNum = Math.floor(Math.random() * pool.length)
    teamTwo.push(pool[randNum])
    pool.splice(randNum, 1)
  }

  return [teamOne, teamTwo]
}

function randomizeCaptains (players) {
  const pool = [...players]
  const randNumOne = Math.floor(Math.random() * pool.length)
  const captainOne = pool.splice(randNumOne, 1)[0]
  const randNumTwo = Math.floor(Math.random() * pool.length)
  const captainTwo = pool.splice(randNumTwo, 1)[0]

  return [captainOne, captainTwo]
}
