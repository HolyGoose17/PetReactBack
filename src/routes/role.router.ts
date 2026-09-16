import { RoleService } from '../services/role.service';
import { RoleController } from '../controllers/role.controller'
import {Router} from 'express'

const router = Router()
const roleService = new RoleService();
const roleController = new RoleController(roleService)

router.get('/role/', roleController.fullRoles.bind(roleController))
.get('/role/:id', roleController.getRoleByID.bind(roleController))
.post('/role/', roleController.postRole.bind(roleController))
.put('/role/:id', roleController.putRole.bind(roleController))
.delete('/role/:id', roleController.deleteRole.bind(roleController))

export default router;