import { PositionService } from '../services/position.service';
import { PositionController } from '../controllers/position.controller';
import { Router } from 'express';

const router = Router();
const positionService = new PositionService();
const positionController = new PositionController(positionService);

router
  .get('/position/', positionController.allPositions.bind(positionController))
  .get(
    '/position/:id',
    positionController.getPositionByID.bind(positionController),
  )
  .post('/position/', positionController.postPosition.bind(positionController))
  .put('/position/:id', positionController.putPosition.bind(positionController))
  .delete(
    '/position/:id',
    positionController.deletePosition.bind(positionController),
  );

export default router;
