const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	
	data: new SlashCommandBuilder().setName("Pular Para").setDescription("Pula para a música selecionada #")
    .addNumberOption((option) => 
        option.setName("Numero Fila").setDescription("Pular para").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		
	const queue = client.player.getQueue(interaction.guildId)

	if (!queue) return await interaction.editReply("Não tem música na fila")

        const trackNum = interaction.options.getNumber("Numero Fila")
		
        if (trackNum > queue.tracks.length)
		
            return await interaction.editReply("Numero de fila invalido")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Skipou para o numero de fila ${trackNum}`)
	},
}
