import { PositionService } from '../services/position.service';
import { PositionController } from '../controllers/position.controller';
import { Router } from 'express';

const router = Router();
const positionService = new PositionService();
const positionController = new PositionController(positionService);

router
  .route('/')
  .get(positionController.allPositions)
  .post(positionController.postPosition);

router
  .route('/:id')
  .get(positionController.getPositionByID)
  .put(positionController.putPosition)
  .delete(positionController.deletePosition);

export default router;
