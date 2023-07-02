const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("Fila")
    .setDescription("Mostra a música que está na fila")
    .addNumberOption((option) => option.setName("pag").setDescription("Número de pag da fila").setMinValue(1)),
    
 run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing){
            return await interaction.editReply("Não tem músicas na fila")
        }
 const totalPages = Math.ceil(queue.tracks.length / 10) || 1
 const page = (interaction.options.getNumber("pag") || 1) - 1
if (page > totalPages) 
            return await interaction.editReply(`Pagina invalida. Tem somente ${totalPages} paginas na fila`)

        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `**${page * 10 + i + 1}.** \`[${song.duration}]\` ${song.title} -- <@${song.requestedBy.id}>`
        }).join("\n")
        const currentSong = queue.current
