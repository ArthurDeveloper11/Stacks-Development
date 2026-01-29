const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const app = express();
app.use(express.json());

// Inicializa o bot do Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.login(process.env.DISCORD_TOKEN); // token do bot como variável de ambiente

// Endpoint protegido com token secreto
app.post('/verificar', async (req, res) => {
    const { usuario, token } = req.body;

    if (token !== process.env.API_SECRET) {
        return res.status(403).json({ status: "erro", mensagem: "Token inválido" });
    }

    const guild = client.guilds.cache.get(process.env.GUILD_ID);
    await guild.members.fetch();

    const membro = guild.members.cache.find(m =>
        m.user.tag === usuario || m.user.username === usuario
    );

    if (membro) {
        res.json({ status: "ok", mensagem: "Usuário está no servidor" });
    } else {
        res.json({ status: "erro", mensagem: "Usuário não encontrado" });
    }
});

app.listen(3000, () => console.log("Backend rodando na porta 3000"));
