const {
  SlashCommandBuilder,
  EmbedBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('Muestra tu avatar o el de otro usuario')
  .addUserOption(option =>
    option.setName('target')
    .setDescription('El usuario del que quieres ver el avatar')
    .setRequired(false)),
  async execute (interaction, client) {
    let target = interaction.options.getUser('target');
    let user = target || interaction.user;
    let avatarembed = new EmbedBuilder()
    .setImage(user.avatarURL())
    .setColor("#DF0000")
    .setAuthor({
      name: `${user.username}'s avatar`, iconURL: user.avatarURL()
    })
    .setFooter({
      text: client.user.username, iconURL: client.user.avatarURL()
    })
    .setTimestamp()

    interaction.reply({
      content: '', embeds: [avatarembed]
    })
  },
}