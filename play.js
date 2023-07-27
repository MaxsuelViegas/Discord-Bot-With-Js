const { SlashCommandBuilder } = require("@discordjs/builders")

const { MessageEmbed } = require("discord.js")

const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("play a youtube music")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("Music")
				.setDescription("play a song by url")
				.addStringOption((option) => option.setName("url").setDescription("url da música").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Play a playlist by url")
				.addStringOption((option) => option.setName("url").setDescription("playlist's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("Search")
				.setDescription("Search for the song's in youtube")
				.addStringOption((option) =>
					option.setName("Search").setDescription("").setRequired(true)
				)
		),

	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.editReply("Você precisa estar em um canal de Voz")

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new MessageEmbed()

		if (interaction.options.getSubcommand() === "Música") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Sem resultados")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** foi adicionado á fila`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "Playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Sem resultado")

            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} Música de [${playlist.title}](${playlist.url})** foram adicionados a fila`)
                .setThumbnail(playlist.thumbnail)
		} else if (interaction.options.getSubcommand() === "Busca") {
            let url = interaction.options.getString("Buscar")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Sem resultados")

            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** foi adicionado á fila`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duração: ${song.duration}`})
		}
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}
