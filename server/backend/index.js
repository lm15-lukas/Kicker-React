const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/kickr", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PlayerSchema = new mongoose.Schema({
  name: String,
  score: Number,
});
const Player = mongoose.model("Player", PlayerSchema);

app.get("/players", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

app.post("/players", async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

app.listen(3001, () => {
  console.log("Server läuft auf http://localhost:3001");
});
