import { Repository } from 'typeorm';

import { AppDataSource } from '@/config/data-source';
import { Agent } from '@/entities/agent.entity';

type AgentDTO = {
  name: string;
};

type OptionalAgentDTO = {
  name?: string;
};

export class AgentService {
  private readonly agentRepository: Repository<Agent>;

  constructor() {
    this.agentRepository = AppDataSource.getRepository(Agent);
  }

  async findAgent(filters: OptionalAgentDTO): Promise<Agent[]> {
    return this.agentRepository.find({
      where: {
        ...filters,
      },
    });
  }

  async findAgentByID(id: string): Promise<Agent | null> {
    return this.agentRepository.findOne({
      where: { id },
    });
  }

  async createAgent(body: AgentDTO): Promise<Agent> {
    const agent = this.agentRepository.create({
      ...body,
    });

    return this.agentRepository.save(agent);
  }

  async deleteAgent(id: string): Promise<boolean> {
    const result = await this.agentRepository.softDelete({ id });

    return (result.affected ?? 0) > 0;
  }

  async updateAgent(id: string, body: AgentDTO): Promise<Agent | null> {
    const agent = await this.agentRepository.findOne({ where: { id } });

    if (!agent) {
      return null;
    }

    if (body.name !== undefined) {
      agent.name = body.name;
    }

    return this.agentRepository.save(agent);
  }
}
