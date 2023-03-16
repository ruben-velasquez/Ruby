const {
  SlashCommandBuilder,
  EmbedBuilder
} = require('discord.js');
const {
  REPOSITORY,
  LOGO_URL
} = require('../config.js')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('contribute')
  .setDescription('Muestra información sobre cómo contribuir al desarrollo del bot'),
  async execute(interaction, client) {
    // Crea un embed con el link del repositorio y una descripción motivadora
    const embed = new EmbedBuilder()
    .setTitle('Contribuye al desarrollo de Ruby')
    .setURL(REPOSITORY)
    .setDescription('Ruby es un bot creado por Rubén Velásquez con el objetivo de ofrecer diversas funcionalidades a los usuarios de Discord.\n\nSi quieres ayudar a mejorar este proyecto, puedes visitar su repositorio en GitHub y hacer fork, clonar o enviar pull requests.\n\nTambién puedes reportar bugs, sugerir ideas o dar feedback en la sección de issues.\n\n¡Gracias por tu apoyo!')
    .setColor('#DF0000')
    .setImage(LOGO_URL)
    .setFooter({
      text: client.user.username, iconURL: client.user.avatarURL()
    })
    .setTimestamp()

    // Envía el embed al canal
    await interaction.reply({
      embeds: [embed]
    });
  },
};