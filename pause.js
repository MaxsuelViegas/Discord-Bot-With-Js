const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pausa").setDescription("Pausa a música"),
	
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Não tem música na fila")

		queue.setPaused(true)
        await interaction.editReply("Música foi pausada! Use `/resume` para continuar a reproduzir")
	},
}
