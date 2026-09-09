import { Owner } from "../entities/owner";
import { Repository, getRepository } from "typeorm";

type FilterOwnerDTO = {
    ownerName?: string;
}
type CreateOwnerDTO = {
    ownerName?: string;
}
type UpdateOwnerDTO = {
    ownerName?: string;
}

export  class OwnerService {
    private owners: Repository<Owner>;
    
        async allOwners(): Promise<Owner> {
            this.owners = getRepository(Owner)
            return await this.owners.query('Select * from Owner');
        }

    async findOwner(filters: FilterOwnerDTO): Promise<Owner[]> {
        this.owners = getRepository(Owner)
        return await this.owners.find({
            where: {
                ...filters
            }
        });
    }

    async findOwnerByID(ownerID: number): Promise<Owner> {
        this.owners = getRepository(Owner)
        return await this.owners.findOne({ where: { ownerID } });
    }
    async createOwner(body: CreateOwnerDTO): Promise<Owner> {
        this.owners = getRepository(Owner)
        return await this.owners.save({...body})
    }
    
    async deleteOwner(ownerID: number): Promise<boolean> {
        this.owners = getRepository(Owner)
        const result = await this.owners.delete({ ownerID });
        return (result.affected ?? 0) > 0;
    }
        
    async updateOwner(id: number, body:UpdateOwnerDTO): Promise<any> {
        this.owners = getRepository(Owner)
        const result =  await this.owners.update(id, {...body});
        return result ? true : false;
    }
}