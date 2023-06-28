const { SlashCommandBuilder } = require("@discordjs/builders")
module.exports = {
	data: new SlashCommandBuilder().setName("Random").setDescription("randomiza a fila"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Não tem músicas na fila")

		queue.shuffle()
        await interaction.editReply(`A fila de ${queue.tracks.length} músicas foi randomizada!`)
	},
}
