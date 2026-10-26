import { Router } from 'express';

import { PositionController } from '@/controllers/position.controller';
import { PositionService } from '@/services/position.service';

const router = Router();
const positionService = new PositionService();
const positionController = new PositionController(positionService);

router
  .route('/')
  .get(positionController.getPosition)
  .post(positionController.postPosition);

router
  .route('/:id')
  .get(positionController.getPositionByID)
  .put(positionController.putPosition)
  .delete(positionController.deletePosition);

export default router;
