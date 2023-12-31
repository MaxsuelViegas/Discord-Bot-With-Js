const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	
	data: new SlashCommandBuilder().setName("Jump to").setDescription("Pula para a música selecionada #")
    .addNumberOption((option) => 
        option.setName("Numero Fila").setDescription("Jump to").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		
	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) return await interaction.editReply("There are no songs in the queue")

        const trackNum = interaction.options.getNumber("Queue Number")
		
        if (trackNum > queue.tracks.length)
		
            return await interaction.editReply("Número de fila invalido")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Skipou para o número de fila ${trackNum}`)
	},
}
