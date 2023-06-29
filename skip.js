const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder().setName("Pular").setDescription("Skipa a música atual"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Não tem música na fila")

        const currentSong = queue.current

		queue.skip()
        await interaction.editReply({
            embeds: [
                new MessageEmbed().setDescription(`${currentSong.title} Foi skipada!`).setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}
