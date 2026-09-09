import { PlayerService } from '../services/player.service';
import { PlayerController } from '../controllers/player.controller';
import { Router } from 'express';

const router = Router();
const playerService = new PlayerService();
const playerController = new PlayerController(playerService);

router.get('/player/', playerController.fullPlayers.bind(playerController));
router.get('agains/stat', playerController.fullPlayers.bind(playerController));
router.get(
  '/player/:id',
  playerController.getPlayerByID.bind(playerController),
);
router.post('/player/', playerController.postPlayer.bind(playerController));
router.put('/player/:id', playerController.putPlayer.bind(playerController));
router.delete(
  '/player/:id',
  playerController.deletePlayer.bind(playerController),
);

export default router;
