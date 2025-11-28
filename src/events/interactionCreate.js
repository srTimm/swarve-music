const { Events, EmbedBuilder } = require('discord.js');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // 🎯 Slash command handler
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                // ✅ PASAR EL CLIENT AL EJECUTAR EL COMANDO
                await command.execute(interaction, interaction.client);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
            }
            return;
        }
    },
};
