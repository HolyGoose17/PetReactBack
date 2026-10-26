import { Router } from 'express';

import { OwnerController } from '@/controllers/owner.controller';
import { OwnerService } from '@/services/owner.service';

const router = Router();
const ownerService = new OwnerService();
const ownerController = new OwnerController(ownerService);

router.route('/').get(ownerController.getOwner).post(ownerController.postOwner);

router
  .route('/:id')
  .get(ownerController.getOwnerByID)
  .put(ownerController.putOwner)
  .delete(ownerController.deleteOwner);

export default router;
