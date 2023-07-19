const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	
	data: new SlashCommandBuilder().setName("Jump to").setDescription("Pula para a música selecionada #")
    .addNumberOption((option) => 
        option.setName("Numero Fila").setDescription("Pular para").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		
	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) return await interaction.editReply("Não tem música na fila")

        const trackNum = interaction.options.getNumber("Número Fila")
		
        if (trackNum > queue.tracks.length)
		
            return await interaction.editReply("Número de fila invalido")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Skipou para o número de fila ${trackNum}`)
	},
}
