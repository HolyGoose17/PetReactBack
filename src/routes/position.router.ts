import { PositionService } from '../services/position.service';
import { PositionController } from '../controllers/position.controller';
import { Router } from 'express';

const router = Router();
const positionService = new PositionService();
const positionController = new PositionController(positionService);

router
  .route('/')
  .get(positionController.allPositions.bind(positionController))
  .post(positionController.postPosition.bind(positionController));

router
  .route('/:id')
  .get(positionController.getPositionByID.bind(positionController))
  .put(positionController.putPosition.bind(positionController))
  .delete(positionController.deletePosition.bind(positionController));

export default router;
