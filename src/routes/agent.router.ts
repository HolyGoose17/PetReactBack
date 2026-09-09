import { AgentService } from '../services/agent.service';
import { AgentController } from '../controllers/agent.controller';
import {Router} from 'express'

const router = Router()
const agentService = new AgentService();
const agentController = new AgentController(agentService)

router.get('/agents/', agentController.fullAgents.bind(agentController))
router.get('/agents/:id', agentController.getAgentByID.bind(agentController))
router.post('/agents/', agentController.postAgent.bind(agentController))
router.put('/agents/:id', agentController.putAgent.bind(agentController))
router.delete('/agents/:id', agentController.deleteAgent.bind(agentController))

export default router;