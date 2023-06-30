const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("Fila")
    .setDescription("Mostra a música que está na fila")
    .addNumberOption((option) => option.setName("pag").setDescription("Número de pag da fila").setMinValue(1)),
