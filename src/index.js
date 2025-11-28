const { Client, Collection, GatewayIntentBits, Partials, REST, Routes, AttachmentBuilder, Events, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, AuditLogEvent, SnowflakeUtil } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const { color, textEffects } = require('./utils/loggingEffects');
//const Giveaway = require("./schemas/giveaway");

require('dotenv').config();
const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.GuildMessageReactions,], partials: [Partials.Channel, Partials.Message, Partials.User, Partials.Reaction, Partials.GuildMember] });

client.commands = new Collection();
const commands = [];

require('./musicManager')(client);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
    } else {
        //console.log('.timOrk is best')
    }
}

// Deploy de comandos
const rest = new REST().setToken(token);
(async () => {
    try {
        console.log(`⏳ ${textEffects.bold}${textEffects.underline}${color.green}[STATUS]${textEffects.reset} ${textEffects.reset}${color.reset}Refreshing ${commands.length} (/) commands...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`✅ ${textEffects.bold}${textEffects.underline}${color.green}[STATUS]${textEffects.reset} ${color.reset}Loaded ${data.length} commands successfully.`);
    } catch (error) {
        console.error('❌ Error al registrar comandos:', error);
    }
})();

// Eventos
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// SYSTEM ANTI-CRASH
process.on('unhandledRejection', async (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.log('Uncaught Expection:', err);
});

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('Uncaught Expection Monitor', err, origin);
});

client.login(token);