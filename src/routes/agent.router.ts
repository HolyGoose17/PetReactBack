import { AgentService } from '../services/agent.service';
import { AgentController } from '../controllers/agent.controller';
import { Router } from 'express';

const router = Router();
const agentService = new AgentService();
const agentController = new AgentController(agentService);

router
  .route('/')
  .get(agentController.fullAgents)
  .post(agentController.postAgent);

router
  .route('/:id')
  .get(agentController.getAgentByID)
  .put(agentController.putAgent)
  .delete(agentController.deleteAgent);

export default router;
