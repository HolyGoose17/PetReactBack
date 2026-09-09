import { Owner } from "../entities/owner";
import { Request, Response, NextFunction } from "express";
import { OwnerService } from "../services/owner.service";
import { Repository, getRepository } from "typeorm";

export class OwnerController {
    private ownerService: OwnerService;
    constructor (ownerService: OwnerService) {
        this.ownerService = ownerService
    }

    async getOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.ownerService.findOwner(req.query);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async getOwnerByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.ownerService.findOwnerByID(req.params.id);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async postOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.ownerService.createOwner(req.body);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async deleteOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.ownerService.deleteOwner(req.params.id);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async putOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {           
            const result = await this.ownerService.updateOwner(req.params.id, req.body);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async fullOwners(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {           
            const result = await this.ownerService.allOwners();
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }
}