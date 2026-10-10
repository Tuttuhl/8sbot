import { REST, Routes, SlashCommandBuilder } from 'discord.js'
require('dotenv').config()

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

if (!TOKEN || !CLIENT_ID || !GUILD_ID) {
  console.error('Missing TOKEN, CLIENT_ID, or GUILD_ID in .env')
  process.exit(1)
}

const commands = [
  new SlashCommandBuilder()
    .setName('maps')
    .setDescription('Select five maps from the map pool'),
  new SlashCommandBuilder()
    .setName('all')
    .setDescription('Select five maps from the map pool and two teams of four players'),
  new SlashCommandBuilder()
    .setName('pick')
    .setDescription('Select two teams of four from your voice channel'),
  new SlashCommandBuilder()
    .setName('caps')
    .setDescription('Select two captains from your voice channel')
].map(command => command.toJSON())

const rest = new REST({ version: '10' }).setToken(TOKEN)

rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands })
  .then(() => console.log('Successfully registered guild slash commands.'))
  .catch(error => console.error('Failed to register guild slash command due to: ', error))
