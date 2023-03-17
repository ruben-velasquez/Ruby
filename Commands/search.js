const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { search } = require("../Utils/searchUtils.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Busca información en google desde discord")
    .addStringOption((option) =>
      option.setName("query").setDescription("La busqueda").setRequired(true)
    ),
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: true });

    const query = interaction.options.getString("query");
    const { results, url } = await search(query);

    if (results.length === 0) {
      await interaction.reply(`No se han encontrado resultados para ${query}`);
      return;
    }

    const embedMessage = new EmbedBuilder()
      .setColor("#DF0000")
      .setTitle(`Resultados de búsqueda para ${query}`)
      .setURL(url)
      .setThumbnail(
        "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      )
      .setFooter({
        text: client.user.username,
        iconURL: client.user.avatarURL(),
      })
      .setTimestamp();

    await (async () => {
      let index = 0;
      for (const result of results) {
        index++;
        embedMessage.addFields({
          name: `${result.title}`,
          value: `[${
            result.description || `Resultado de la busqueda ${query}`
          }](${result.link})`,
        });
        if (index == 3) break;
      }
    })();

    await interaction.editReply({ embeds: [embedMessage] });
  },
};
