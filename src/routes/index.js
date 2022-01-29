const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Player } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getDbInfo = async () => {
  return await Player.findAll();
};

console.log(getDbInfo, "soy get info")
console.log(Player)

router.get("/players", async (req, res, next) => {
  try {
    const nickName = req.query.nickName;
    let allPlayers = await getDbInfo(); //me traigo todos los players de la Db
    if (nickName) {
      // si hay un nickname por query
      let playerNickname = await allPlayers.filter((player) =>
        player.nickname.toLowerCase().includes(nickname.toLowerCase())
      );
      playerNickname.length
        ? res.status(200).send(playerNickname)
        : res
            .status(404)
            .send({
              info: "Sorry, the player you are looking for does not exist.",
            });
    } else {
      res.status(200).send(allPlayers);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/player/:Id", async function (req, res, next) {
  try {
    const Id = req.params.Id;
    const playerTotal = await getDbInfo();
    if (Id) {
      let playerId = await playerTotal.filter((el) => el.Id == Id); //dentro de todos los dogs filtra el id que te estoy pasando
      playerId.length //si no encuentra nada entra en la res.status
        ? res.status(200).send(playerId)
        : res.status(404).send({ info: "Player not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/player", async (req, res, next) => {
  try {
    const { nickname, status, ranking, avatar } = req.body;
    const newPlayer = await Player.create({
      nickname,
      status,
      ranking,
      avatar,
    });
    await newPlayer;
    res.status(201).send({ info: "Player created successfully!" });
  } catch (error) {
    next(error);
  }
});

router.put("/editPlayer", async (req, res, next) => {
  try {
    const { Id } = req.params;
    const { nickname, status, ranking, avatar } = req.body;
    const player = await Player.findByPk(Id);
    player.update({
      nickname,
      status,
      ranking,
      avatar,
    });
    res.send(player);
  } catch (error) {
    next(error);
  }
  });

router.delete("/deletePlayer", async (req, res, next) => {
    try {
      const { Id } = req.params;
      const player = await Player.findByPk(Id);
      await player.destroy();
      res.send(200);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
