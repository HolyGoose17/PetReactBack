import { Role } from "../entities/role";
import { Repository, getRepository } from "typeorm";

type FilterRoleDTO = {
    roleName?: string;
}
type CreateRoleDTO = {
    roleName?: string;
}
type UpdateRoleDTO = {
    roleName?: string;
}

export  class RoleService {
    private roles: Repository<Role>;
    
        async allRoles(): Promise<Role> {
            this.roles = getRepository(Role)
            return await this.roles.query('Select * from Role');
        }

    async findRole(filters: FilterRoleDTO): Promise<Role[]> {
        this.roles = getRepository(Role)
        return await this.roles.find({
            where: {
                ...filters
            }
        });
    }

    async findRoleByID(roleID: number): Promise<Role> {
        this.roles = getRepository(Role)
        return await this.roles.findOne({ where: { roleID } });
    }
    async createRole(body: CreateRoleDTO): Promise<Role> {
        this.roles = getRepository(Role)
        return await this.roles.save({...body})
    }
    
    async deleteRole(roleID: number): Promise<boolean> {
        this.roles = getRepository(Role)
        const result = await this.roles.delete({ roleID });
        return (result.affected ?? 0) > 0;
    }
        
    async updateRole(id: number, body:UpdateRoleDTO): Promise<any> {
        this.roles = getRepository(Role)
        const result =  await this.roles.update(id, {...body});
        return result ? true : false;
    }
}