import { RoleService } from '../services/role.service';
import { RoleController } from '../controllers/role.controller'
import {Router} from 'express'

const router = Router()
const roleService = new RoleService();
const roleController = new RoleController(roleService)

router.get('/role/', roleController.fullRoles.bind(roleController))
router.get('/role/:id', roleController.getRoleByID.bind(roleController))
router.post('/role/', roleController.postRole.bind(roleController))
router.put('/role/:id', roleController.putRole.bind(roleController))
router.delete('/role/:id', roleController.deleteRole.bind(roleController))

export default router;