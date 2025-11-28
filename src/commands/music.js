const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('music')
        .setDescription('Play your music!')
        .addSubcommand(sub =>
            sub
                .setName('play')
                .setDescription('Play a song!')
                .addStringOption(opt =>
                    opt.setName('song-title')
                        .setDescription('Enter a music title')
                        .setRequired(true)
                )
        )
        .addSubcommand(sub =>
            sub
                .setName('stop')
                .setDescription('Stop the music')
        ),

    /**
     * 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     * @param {import('discord.js').Client} client 
     */
    async execute(interaction, client) {
        const kazagumo = client.kazagumo; // ✅ Use the Kazagumo loaded in musicManager.js
        if (!kazagumo) return interaction.reply("❌ Kazagumo is not loaded.");

        const { options, member, channel, guild, user } = interaction;
        let player;

        switch (options.getSubcommand()) {
            case 'play':
                const voiceChannel = member.voice.channel;
                if (!voiceChannel)
                    return interaction.reply("❌ You must join a voice channel first.");

                const query = options.getString('song-title');
                await interaction.reply(`🔎 Searching for **${query}**...`);

                try {
                    // Create player or use existing
                    player = kazagumo.getPlayer(guild.id) || await kazagumo.createPlayer({
                        guildId: guild.id,
                        textId: channel.id,
                        voiceId: voiceChannel.id,
                    });

                    const result = await kazagumo.search(query, { requester: user });
                    if (!result.tracks.length) return interaction.followUp("❌ No results found.");

                    if (result.type === 'PLAYLIST') player.queue.add(result.tracks);
                    else player.queue.add(result.tracks[0]);

                    if (!player.playing && !player.paused) player.play();

                    return interaction.followUp(
                        result.type === 'PLAYLIST'
                            ? `📃 Playlist added: **${result.playlistName}**`
                            : `🎵 Song added: **${result.tracks[0].title}**`
                    );

                } catch (err) {
                    console.error(err);
                    return interaction.followUp("❌ An error occurred while trying to play music.");
                }

            case 'stop':
                player = kazagumo.getPlayer(guild.id);
                if (!player) return interaction.reply("❌ No music is currently playing.");

                player.destroy();
                return interaction.reply("🛑 Music stopped.");

            default:
                return interaction.reply("❌ Invalid subcommand.");
        }
    },
};
