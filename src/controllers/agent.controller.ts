import { Request, Response } from 'express';
import { AgentService } from '@/services/agent.service';
import { STATUS_CODE } from '@/utils/constants';

export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  getAgent = async (req: Request, res: Response): Promise<void> => {
    const result = await this.agentService.findAgents(req.query);
    res.status(STATUS_CODE.OK).send(result);
  };

  getAgentByID = async (req: Request, res: Response): Promise<void> => {
    const result = await this.agentService.findAgentByID(req.params.id);
    res.status(STATUS_CODE.OK).send(result);
  };

  postAgent = async (req: Request, res: Response): Promise<void> => {
    const result = await this.agentService.createAgent(req.body);
    res.status(STATUS_CODE.CREATED).send(result);
  };

  deleteAgent = async (req: Request, res: Response): Promise<void> => {
    const result = await this.agentService.deleteAgent(req.params.id);
    res.status(STATUS_CODE.OK).send(result);
  };

  putAgent = async (req: Request, res: Response): Promise<void> => {
    const result = await this.agentService.updateAgent(req.params.id, req.body);
    res.status(STATUS_CODE.OK).send(result);
  };

  fullAgents = async (req: Request, res: Response): Promise<void> => {
    const result = await this.agentService.allAgents();
    res.status(STATUS_CODE.OK).send(result);
  };
}
