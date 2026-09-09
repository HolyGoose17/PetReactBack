import { League } from "../entities/league";
import { Request, Response, NextFunction } from "express";
import { LeagueService } from "../services/league.service";
import { Repository, getRepository } from "typeorm";

export class LeagueController {
    private leagueService: LeagueService;
    constructor (leagueService: LeagueService) {
        this.leagueService = leagueService
    }

    async getLeague(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.leagueService.findLeague(req.query);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async getLeagueByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.leagueService.findLeagueByID(req.params.id);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async postLeague(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.leagueService.createLeague(req.body);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async deleteLeague(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.leagueService.deleteLeague(req.params.id);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async putLeague(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {           
            const result = await this.leagueService.updateLeague(req.params.id, req.body);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async fullLeagues(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {           
            const result = await this.leagueService.allLeagues();
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }
}