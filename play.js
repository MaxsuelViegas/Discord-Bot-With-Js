const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Toca uma música do YouTube")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("Música")
				.setDescription("Toca uma música por url")
				.addStringOption((option) => option.setName("url").setDescription("url da música").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Toca uma Playlist via url")
				.addStringOption((option) => option.setName("url").setDescription("playlist's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("Busca")
				.setDescription("Buscar músicas no youtube")
				.addStringOption((option) =>
					option.setName("Buscar").setDescription("Busca").setRequired(true)
				)
		),

