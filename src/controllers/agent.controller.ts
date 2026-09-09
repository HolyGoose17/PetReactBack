
import { Request, Response, NextFunction } from "express";
import { AgentService } from "../services/agent.service";


export class AgentController {
    private agentService: AgentService;
    constructor (agentService: AgentService) {
        this.agentService = agentService
    }

    async getAgent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.agentService.findAgents(req.query);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async getAgentByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.agentService.findAgentByID(req.params.id);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async postAgent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.agentService.createAgent(req.body);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async deleteAgent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.agentService.deleteAgent(req.params.id);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async putAgent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {           
            const result = await this.agentService.updateAgent(req.params.id, req.body);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async fullAgents(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {           
            const result = await this.agentService.allAgents();
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }
}