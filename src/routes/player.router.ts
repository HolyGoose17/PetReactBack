import { PlayerService } from '../services/player.service';
import { PlayerController } from '../controllers/player.controller';
import { Router } from 'express';

const router = Router();
const playerService = new PlayerService();
const playerController = new PlayerController(playerService);

router.get('/player/', playerController.fullPlayers.bind(playerController))
.get('/player/against/stat', playerController.fullPlayers.bind(playerController))
.get(
  '/player/:id',
  playerController.getPlayerByID.bind(playerController),
)
.post('/player/', playerController.postPlayer.bind(playerController))
.put('/player/:id', playerController.putPlayer.bind(playerController))
.delete(
  '/player/:id',
  playerController.deletePlayer.bind(playerController),
)

export default router;
