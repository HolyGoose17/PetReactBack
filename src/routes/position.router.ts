import { PositionService } from '../services/position.service';
import { PositionController } from '../controllers/position.controller';
import { Router } from 'express';

const router = Router();
const positionService = new PositionService();
const positionController = new PositionController(positionService);

// Роуты без параметра id
router
  .route('/positions')
  .get(positionController.allPositions.bind(positionController))
  .post(positionController.postPosition.bind(positionController));

// Роуты с параметром id
router
  .route('/position/:id')
  .get(positionController.getPositionByID.bind(positionController))
  .put(positionController.putPosition.bind(positionController))
  .delete(positionController.deletePosition.bind(positionController));

export default router;
