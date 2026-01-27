const { REST, Routes } = require('discord.js');
require('dotenv').config();
const TOKEN = process.env.DISCORD_TOKEN;



const commands = [
    {
        name: 'Create',
        description: 'Create Succsfully ',
    },
]

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        await rest.put(Routes.applicationCommands('1463155753412984907'), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();