const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Player, Avatar } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getPlayerInfo = async () => {
  return await Player.findAll();
};

const getAvatarInfo = async () => {
  return await Avatar.findAll();
};

router.get("/players", async (req, res, next) => {
  try {
    const { nick_name, order, status } = req.query;
    let allPlayers = await getPlayerInfo(); //me traigo todos los players de la Db
    if (nick_name) {
      // si hay un nickname por query
      let playerNickname = await allPlayers.filter((player) =>
        player.nickname
          .toLocaleLowerCase()
          .includes(nick_name.toLocaleLowerCase())
      );
      playerNickname.length
        ? res.status(200).send(playerNickname)
        : res.status(404).send({
            info: "Sorry, the player you are looking for does not exist.",
          });
    }
    if ((order && order === "asc") || order === "desc" || order === "") {
      if (order === "asc" || order === "") {
        allPlayers.sort((a, b) => b.ranking - a.ranking);
      }
      if (order === "desc") {
        allPlayers.sort((a, b) => a.ranking - b.ranking);
      }
    }
    if (
      (status && status === "bronce") ||
      status === "plata" ||
      status === "oro"
    ) {
      if (status === "bronce") {
        allPlayers = allPlayers.filter((player) => {
          return player.status === "bronce";
        });
      }
      if (status === "plata") {
        allPlayers = allPlayers.filter((player) => {
          return player.status === "plata";
        });
      }
      if (status === "oro") {
        allPlayers = allPlayers.filter((player) => {
          return player.status === "oro";
        });
      }
    }

    return res.send(allPlayers);
  } catch (error) {
    next(error);
  }
});
// if ((order && order === "asc") || order === "desc") {
//   if (order === "desc") {
//     allPlayers.sort((a, b) => b.ranking - a.ranking);
//   }
//   if (order === "asc") {
//     allPlayers.sort((a, b) => a.ranking - b.ranking);
//   }
//   return res.send(allPlayers);
// }
router.get("/players/:Id", async function (req, res, next) {
  try {
    const Id = req.params.Id;
    const playerTotal = await getPlayerInfo();
    if (Id) {
      let playerId = await playerTotal.filter((el) => el.Id == Id);
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

router.put("/editPlayer/:Id", async (req, res, next) => {
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
    console.log(error);
  }
});

router.delete("/deletePlayer/:Id", async (req, res, next) => {
  try {
    const { Id } = req.params;
    const player = await Player.findByPk(Id);
    await player.destroy();
    res.send(200);
  } catch (error) {
    next(error);
  }
});

router.post("/createAvatar", async (req, res, next) => {
  try {
    const { image } = req.body;
    const newAvatar = await Avatar.create({
      image,
    });
    await newAvatar;
    res.status(201).send({ info: "Avatar created successfully!" });
  } catch (error) {
    next(error);
  }
});

router.get("/getAvatar", async (req, res, next) => {
  try {
    const avatarImg = req.query.avatar;
    let allAvatars = await getAvatarInfo();
    {
      res.status(200).send(allAvatars);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
