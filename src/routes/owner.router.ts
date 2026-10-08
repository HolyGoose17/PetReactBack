import { OwnerService } from '../services/owner.service';
import { OwnerController } from '../controllers/owner.controller';
import { Router } from 'express';

const router = Router();
const ownerService = new OwnerService();
const ownerController = new OwnerController(ownerService);

router
  .route('/')
  .get(ownerController.fullOwners.bind(ownerController))
  .post(ownerController.postOwner.bind(ownerController));

router
  .route('/:id')
  .get(ownerController.getOwnerByID.bind(ownerController))
  .put(ownerController.putOwner.bind(ownerController))
  .delete(ownerController.deleteOwner.bind(ownerController));

export default router;
