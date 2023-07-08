const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("Mostra info da musica que está tocando"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)
