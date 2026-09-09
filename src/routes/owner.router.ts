import { OwnerService } from '../services/owner.service';
import { OwnerController } from '../controllers/owner.controller'
import {Router} from 'express'

const router = Router()
const ownerService = new OwnerService();
const ownerController = new OwnerController(ownerService)

router.get('/owner/', ownerController.fullOwners.bind(ownerController))
router.get('/owner/:id', ownerController.getOwnerByID.bind(ownerController))
router.post('/owner/', ownerController.postOwner.bind(ownerController))
router.put('/owner/:id', ownerController.putOwner.bind(ownerController))
router.delete('/owner/:id', ownerController.deleteOwner.bind(ownerController))

export default router;