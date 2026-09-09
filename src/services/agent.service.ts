import { Agent } from "../entities/agent";
import { Repository, getRepository } from "typeorm";

type FilterAgentDTO = {
    agentName?: string;
}
type CreateAgentDTO = {
    agentName?: string;
}
type UpdateAgentDTO = {
    agentName?: string;
}

export  class AgentService {
    private agents: Repository<Agent>;
    
        async allAgents(): Promise<Agent> {
            this.agents = getRepository(Agent)
            return await this.agents.query('Select * from Agent');
        }

    async findAgents(filters: FilterAgentDTO): Promise<Agent[]> {
        this.agents = getRepository(Agent)
        return await this.agents.find({
            where: {
                ...filters
            }
        });
    }

    async findAgentByID(agentID: number): Promise<Agent> {
        this.agents = getRepository(Agent)
        return await this.agents.findOne({ where: { agentID }, relations: ['playersName'] });
    }   
    
    async createAgent(body: CreateAgentDTO): Promise<Agent> {
        this.agents = getRepository(Agent)
        return await this.agents.save({...body})
    }
    
    async deleteAgent(agentID: number): Promise<boolean> {
        this.agents = getRepository(Agent)
        const result = await this.agents.delete({ agentID });
        return (result.affected ?? 0) > 0;
    }
        
    async updateAgent(id: number, body:UpdateAgentDTO): Promise<any> {
        this.agents = getRepository(Agent)
        const result =  await this.agents.update(id, {...body});
        return result ? true : false;
    }
}