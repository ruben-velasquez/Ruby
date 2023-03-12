const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require("node:fs");
const { TOKEN } = require("./config.js")

client.commands = require("./commandHandler.js")

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
}); 

client.on(Events.InteractionCreate, async interaction => { 
  if (!interaction.isChatInputCommand()) return; 
  
  const command = client.commands.get(interaction.commandName); 
  
  if (!command) return; 
  
  try { 
    await command.execute(interaction, client); 
  } catch (error) { 
    console.error(error); 
    if (interaction.replied || interaction.deferred) { 
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true }); 
    } else { 
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); 
    } 
  }
});

client.login(TOKEN);