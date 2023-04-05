const express = require("express");
const bots = require("./src/botsData");
const shuffle = require("./src/shuffle");
const cors = require("cors")

const app = express();

app.use(cors())
app.use(express.static(`${__dirname}/public`))

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '8e4833bb207a45cf87558bfb8a459b02',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const playerRecord = {
  wins: 0,
  losses: 0,
};

// Add up the total health of all the robots
const calculateTotalHealth = (robots) =>
  robots.reduce((total, { health }) => total + health, 0);

// Add up the total damage of all the attacks of all the robots
const calculateTotalAttack = (robots) =>
  robots
    .map(({ attacks }) =>
      attacks.reduce((total, { damage }) => total + damage, 0)
    )
    .reduce((total, damage) => total + damage, 0);

// Calculate both players' health points after the attacks
const calculateHealthAfterAttack = ({ playerDuo, compDuo }) => {
  const compAttack = calculateTotalAttack(compDuo);
  const playerHealth = calculateTotalHealth(playerDuo);
  const playerAttack = calculateTotalAttack(playerDuo);
  const compHealth = calculateTotalHealth(compDuo);

  return {
    compHealth: compHealth - playerAttack,
    playerHealth: playerHealth - compAttack,
  };
};

app.get("/api/robots", (req, res) => {
  try {
    rollbar.info('User Selected all Bots')
    res.status(200).send(botsArr);
  } catch (error) {
    rollbar.error('Error Getting Bots')
    console.error("ERROR GETTING BOTS", error);
    res.sendStatus(400);
  }
});

app.get("/api/robots/shuffled", (req, res) => {
  try {
    rollbar.info('User selected Draw, recieved random bots')
    let shuffled = shuffle(bots);
    res.status(200).send(shuffled);
  } catch (error) {
    rollbar.error('ERROR GETTING SHUFFLOTED BS')
    console.error("ERROR GETTING SHUFFLOTED BS", error);
    res.sendStatus(400);
  }
});

app.post("/api/duel", (req, res) => {
  try {
    rollbar.info('User Started Duel')
    const { compDuo, playerDuo } = req.body;

    const { compHealth, playerHealth } = calculateHealthAfterAttack({
      compDuo,
      playerDuo,
    });

    // comparing the total health to determine a winner
    if (compHealth > playerHealth) {
      playerRecord.losses += 1;
      res.status(200).send("You lost!");
    } else {
      playerRecord.losses += 1;
      res.status(200).send("You won!");
    }
  } catch (error) {
    rollbar.error('ERROR DUELING')
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    rollbar.info('Player stats updated.')
    res.status(200).send(playerRecord);
  } catch (error) {
    rollbar.error('ERROR GETTING PLAYER STATS')
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
  }
});

app.listen(8000, () => {
  console.log(`Listening on 8000`);
});
