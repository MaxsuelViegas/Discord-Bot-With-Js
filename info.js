const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("Mostra info da musica que está tocando"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)
if (!queue) return await interaction.editReply("Não tem música na fila")
	let bar = queue.createProgressBar({
			queue: false,
			length: 19,
		})
