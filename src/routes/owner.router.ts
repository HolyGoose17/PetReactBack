import { OwnerService } from '../services/owner.service';
import { OwnerController } from '../controllers/owner.controller';
import { Router } from 'express';

const router = Router();
const ownerService = new OwnerService();
const ownerController = new OwnerController(ownerService);

router
  .route('/')
  .get(ownerController.fullOwners)
  .post(ownerController.postOwner);

router
  .route('/:id')
  .get(ownerController.getOwnerByID)
  .put(ownerController.putOwner)
  .delete(ownerController.deleteOwner);

export default router;
