<h3 align="center">Team Randomization Discord Bot</h3>
---
<p align="center">Built for Discord to automate the selection of captains, teams, and maps.</p>

## Table of Contents
+ [Setup](#setup)
+ [Examples](#examples)
+ [Development Stack](#stack)
+ [Authors](#authors)
+ [References](#references)

## Setup <a name = "setup"></a>
1. Install [Node.js](https://nodejs.org/) 18 or later.
2. Create a `.env` file in the project root with:
   ```
   TOKEN=your_bot_token
   CLIENT_ID=your_application_id
   GUILD_ID=your_server_id
   ```
   - `TOKEN` — Bot token from the [Discord Developer Portal](https://discord.com/developers/applications)
   - `CLIENT_ID` — Application ID (General Information tab)
   - `GUILD_ID` — Server ID for slash command registration. Found by enabling developer mode within Discord -> right clicking a server -> copy server info -> copy server ID.
3. Install dependencies: `npm i`
4. Register slash commands: `npm run deploy`
5. Start the bot: `npm start`
*Re-run `npm run deploy` whenever slash command definitions change.*
## Examples <a name = "examples"></a>

To randomize teams and maps based on who is in the typing user's voice channel:
```

/all

```
### Example Output:

>Team 1: Player 1, Player 2, Player 3, Player 4

> Team 2: Player 5, Player 6, Player 7, Player 8

> Map 1 | Game Mode 1

> Map 2 | Game Mode 2

> Map 3 | Game Mode 3 

> Map 2 | Game Mode 1

> Map 5 | Game Mode 2

To randomize teams based on who is in the typing user's voice channel:
```

/pick

```
### Example Output:

> Team 1: Player 1, Player 2, Player 3, Player 4

> Team 2: Player 5, Player 6, Player 7, Player 8

To randomize captains based on who is in the typing user's voice channel: 
```

/caps

```
### Example Output:

> Captain 1: Player 3

> Captain 2: Player 7

 To randomize maps:
 ```

 /maps

 ```
### Example Output: 

> Map 1 | Game Mode 1

> Map 2 | Game Mode 2

> Map 3 | Game Mode 3 

> Map 2 | Game Mode 1

> Map 5 | Game Mode 2

## Development Stack <a name = "stack"></a>
+ [Discord.js](https://discord.js.org)
+ [JavaScript](https://www.javascript.com)

## Authors <a name = "authors"></a>
+ [Kriptonic](https://twitter.com/orale_chhchh) - Idea & Planning
+ [Tuttuhl](https://github.com/tuttuhl) - Development

## References <a name = "references"></a>
+ [Discord.js Docs](https://discord.js.org/docs/packages/discord.js/14.27.0)
+ [Cursor - Composer 2.5 Fast](https://cursor.com/)
