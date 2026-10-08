import { AgentService } from '../services/agent.service';
import { AgentController } from '../controllers/agent.controller';
import { Router } from 'express';

const router = Router();
const agentService = new AgentService();
const agentController = new AgentController(agentService);

router
  .route('/')
  .get(agentController.fullAgents.bind(agentController))
  .post(agentController.postAgent.bind(agentController));

router
  .route('/:id')
  .get(agentController.getAgentByID.bind(agentController))
  .put(agentController.putAgent.bind(agentController))
  .delete(agentController.deleteAgent.bind(agentController));

export default router;
