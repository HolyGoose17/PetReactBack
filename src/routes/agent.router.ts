import { AgentService } from '../services/agent.service';
import { AgentController } from '../controllers/agent.controller';
import { Router } from 'express';

const router = Router();
const agentService = new AgentService();
const agentController = new AgentController(agentService);

router
  .get('/agents/', agentController.fullAgents.bind(agentController))
  .get('/agents/:id', agentController.getAgentByID.bind(agentController))
  .post('/agents/', agentController.postAgent.bind(agentController))
  .put('/agents/:id', agentController.putAgent.bind(agentController))
  .delete('/agents/:id', agentController.deleteAgent.bind(agentController));

export default router;
