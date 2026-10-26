import { Router } from 'express';

import { PlayerController } from '@/controllers/player.controller';
import { PlayerService } from '@/services/player.service';

const router = Router();
const playerService = new PlayerService();
const playerController = new PlayerController(playerService);

router
  .route('/')
  .get(playerController.getPlayer)
  .post(playerController.postPlayer);

router
  .route('/:id')
  .get(playerController.getPlayerByID)
  .put(playerController.putPlayer)
  .delete(playerController.deletePlayer);

export default router;
