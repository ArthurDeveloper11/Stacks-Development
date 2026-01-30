const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.post("/api", async (req, res) => {
  const universeId = req.body.universeId;
  console.log("Recebi UniverseId:", universeId);

  const url = `https://games.roblox.com/v1/games?universeIds=${universeId}`;
  const response = await fetch(url);
  const data = await response.json();

  const latestVersion = data.data[0].rootPlaceVersion;
  console.log("Última versão publicada:", latestVersion);

  res.json({ universeId, latestVersion });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
