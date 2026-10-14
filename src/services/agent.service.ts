import { AppDataSource } from '@/config/data-source';
import { Agent } from '@/entities/agent.entity';
import { Repository } from 'typeorm';

type FilterAgentDTO = {
  name?: string;
};
type CreateAgentDTO = {
  name: string;
};
type UpdateAgentDTO = {
  name?: string;
};

export class AgentService {
  private readonly agentRepository: Repository<Agent>;

  constructor() {
    this.agentRepository = AppDataSource.getRepository(Agent);
  }

  async findAgent(filters: FilterAgentDTO): Promise<Agent[]> {
    return this.agentRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async findAgentByID(id: string): Promise<Agent | null> {
    return this.agentRepository.findOne({
      where: { id },
      // relations: ['players'], // Uncomment this line if you want to include related players when fetching an agent
    });
  }

  async createAgent(body: CreateAgentDTO): Promise<Agent> {
    const agent = this.agentRepository.create({
      ...body,
    });
    return this.agentRepository.save(agent);
  }

  async deleteAgent(id: string): Promise<boolean> {
    const result = await this.agentRepository.softDelete({ id });
    return (result.affected ?? 0) > 0;
  }

  async updateAgent(id: string, body: UpdateAgentDTO): Promise<Agent | null> {
    const agent = await this.agentRepository.findOne({ where: { id } });

    if (!agent) {
      return null;
    }

    if (body.name !== undefined) {
      agent.name = body.name;
    }

    return agent ? this.findAgentByID(agent.id) : null;
  }
}
