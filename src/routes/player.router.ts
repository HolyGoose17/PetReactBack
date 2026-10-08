import { PlayerService } from '../services/player.service';
import { PlayerController } from '../controllers/player.controller';
import { Router } from 'express';

const router = Router();
const playerService = new PlayerService();
const playerController = new PlayerController(playerService);

router
  .get('/', playerController.fullPlayers.bind(playerController))
  .get('/against/stat', playerController.fullPlayers.bind(playerController))
  .post('/', playerController.postPlayer.bind(playerController));

router
  .route('/:id')
  .get(playerController.getPlayerByID.bind(playerController))
  .put(playerController.putPlayer.bind(playerController))
  .delete(playerController.deletePlayer.bind(playerController));

export default router;
