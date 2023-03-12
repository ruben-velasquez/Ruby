const { REST, Routes } = require('discord.js');
const {TOKEN, CLIENT_ID} = require("./config.js")
const fs = require("node:fs")

const commands = [];
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Enviando los comandos de (/) del bot.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Correctamente envidos los comandos de (/) del bot.\n');
  } catch (error) {
    console.log('Hubo un error enviando los comandos de (/) del bot: \n');
    console.error(error);
  }
})();