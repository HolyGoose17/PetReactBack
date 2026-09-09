import { Role } from "../entities/role";
import { Request, Response, NextFunction } from "express";
import { RoleService } from "../services/role.service";
import { Repository, getRepository } from "typeorm";

export class RoleController {
    private roleService: RoleService;
    constructor (roleService: RoleService) {
        this.roleService = roleService
    }

    async getRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.roleService.findRole(req.query);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async getRoleByID(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.roleService.findRoleByID(req.params.id);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async postRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.roleService.createRole(req.body);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const result = await this.roleService.deleteRole(req.params.id);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async putRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {           
            const result = await this.roleService.updateRole(req.params.id, req.body);
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }

    async fullRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {           
            const result = await this.roleService.allRoles();
            res.status(200).send(result)
        } catch (error){
            res.status(500).send(error)
        }
        finally {
            next()
        }
    }
}