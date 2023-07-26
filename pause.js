const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("").setDescription("pause the current song"),
	
	run: async ({ client, interaction }) => {
		
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("without song")

		queue.setPaused(true)
        await interaction.editReply("Music has been paused! Use `/resume` to play it again!")
	},
}
