const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Muestra tu avatar'),
  async execute (interaction, client) {
    let user = interaction.user;
    let avatarembed = new EmbedBuilder()
    .setImage(user.avatarURL())
    .setColor("#DF0000")
    .setAuthor({ name:`${user.username}'s avatar`, iconURL: user.avatarURL() })
    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() })
    .setTimestamp()
    
    interaction.reply({ content: '', embeds: [avatarembed] })
  },
}