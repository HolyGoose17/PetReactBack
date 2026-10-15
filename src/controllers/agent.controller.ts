import { Request, Response } from 'express';
import { AgentService } from '@/services/agent.service';
import { AbstractIdParams, STATUS_CODE } from '@/utils/constants';

export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  getAgent = async (req: Request, res: Response): Promise<void> => {
    const agent = await this.agentService.findAgent(req.query);

    res.status(STATUS_CODE.OK).json(agent);
  };

  getAgentByID = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const agent = await this.agentService.findAgentByID(req.params.id);

    if (!agent) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Agent not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(agent);
  };

  postAgent = async (req: Request, res: Response): Promise<void> => {
    const agent = await this.agentService.createAgent(req.body);

    res.status(STATUS_CODE.CREATED).json(agent);
  };

  deleteAgent = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const agent = await this.agentService.deleteAgent(req.params.id);

    if (!agent) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Agent not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json({ success: true });
  };

  putAgent = async (
    req: Request<AbstractIdParams>,
    res: Response,
  ): Promise<void> => {
    const agent = await this.agentService.updateAgent(req.params.id, req.body);

    if (!agent) {
      res.status(STATUS_CODE.NOT_FOUND).json({ error: 'Agent not found' });
      return;
    }

    res.status(STATUS_CODE.OK).json(agent);
  };
}
