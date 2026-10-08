import { Request, Response, NextFunction } from 'express';
import { AgentService } from '@/services/agent.service';
import { STATUS_CODE } from '@/utils/constants';

export class AgentController {
  private agentService: AgentService;
  constructor(agentService: AgentService) {
    this.agentService = agentService;
  }

  getAgent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.agentService.findAgents(req.query);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  getAgentByID = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.agentService.findAgentByID(req.params.id);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  postAgent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.agentService.createAgent(req.body);
      res.status(STATUS_CODE.CREATED).send(result);
    } catch (error) {
      next(error);
    }
  };

  deleteAgent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.agentService.deleteAgent(req.params.id);
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  putAgent = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.agentService.updateAgent(
        req.params.id,
        req.body,
      );
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };

  fullAgents = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const result = await this.agentService.allAgents();
      res.status(STATUS_CODE.OK).send(result);
    } catch (error) {
      next(error);
    }
  };
}
