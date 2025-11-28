const { Connectors } = require("shoukaku");
const { Kazagumo, Plugins } = require("kazagumo");

const nodes = [
    {
        identifier: "Serenetia-V4",
        url: "lavalinkv4.serenetia.com",
        port: 443,
        auth: "https://dsc.gg/ajidevserver",
        secure: true
    },
    {
        identifier: "AjieDev-V4",
        auth: "https://dsc.gg/ajidevserver",
        url: "lava-v4.ajieblogs.eu.org",
        port: 443,
        secure: true
    }
];

module.exports = (client) => {
    const kazagumo = new Kazagumo(
        {
            defaultSearchEngine: 'youtube',
            plugins: [
                new Plugins.PlayerMoved(client)
            ],
            send: (guildId, payload) => {
                const guild = client.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
            },
        },
        new Connectors.DiscordJS(client),
        nodes
    );

    console.log("🎧 Kazagumo cargado correctamente con nodo Serentia-V4");

    // Manejar errores globales de Kazagumo/Shoukaku
    kazagumo.on('error', (node, error) => {
        console.error(`❌ Kazagumo Error on node ${node?.identifier || 'Unknown'}:`, error);
    });

    kazagumo.on('ready', (node) => {
        console.log(`✅ Node ${node.identifier} is ready!`);
    });

    kazagumo.on('disconnect', (node, code, reason) => {
        console.warn(`⚠️ Node ${node.identifier} disconnected. Code: ${code}, Reason: ${reason}`);
    });

    // Asignar Kazagumo al cliente
    client.kazagumo = kazagumo;
};
