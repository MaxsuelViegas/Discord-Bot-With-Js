const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pausa").setDescription("pause the current song"),
	
	run: async ({ client, interaction }) => {
		
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Não tem música na fila")

		queue.setPaused(true)
        await interaction.editReply("Music has been paused! Use `/resume` to play it again!")
	},
}
