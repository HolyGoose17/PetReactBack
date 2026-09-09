import { ClubService } from '../services/club.service';
import { Repository, getRepository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { Club } from '../entities/club';

export class ClubController {
  private clubService: ClubService;
  constructor(clubService: ClubService) {
    this.clubService = clubService;
  }

  async getClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.clubService.findClub(req.query as any);
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    } finally {
      next();
    }
  }

  async getClubByID(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.clubService.findClubByID(id);
      if (!result) {
        res.status(404).json({ error: 'Club not found' });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).send({ error: error.message });
    } finally {
      next();
    }
  }

  async postClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const {
        clubName,
        ownerNameOwnerID,
        leagueNameLeagueID,
        pathLogo,
        pathLeague,
      } = req.body;

      if (!pathLogo.startsWith('img/')) {
        throw new Error('pathLogo must start with img/');
      }
      if (!pathLeague.startsWith('img/')) {
        throw new Error('pathLeague must start with img/');
      }

      const clubData = {
        clubName,
        pathLogo,
        pathLeague,
        ownerName: { ownerID: parseInt(ownerNameOwnerID) },
        leagueName: { leagueID: parseInt(leagueNameLeagueID) },
      };

      const result = await this.clubService.createClub(clubData);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      next();
    }
  }

  async deleteClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const result = await this.clubService.deleteClub(id);
      res.status(200).json({ success: result });
    } catch (error) {
      res.status(500).send({ error: error.message });
    } finally {
      next();
    }
  }

  async putClub(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const {
        clubName,
        ownerNameOwnerID,
        leagueNameLeagueID,
        pathLogo,
        pathLeague,
      } = req.body;

      const club = await this.clubService.findClubByID(id);
      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }

      if (pathLogo && !pathLogo.startsWith('img/')) {
        throw new Error('pathLogo must start with img/');
      }
      if (pathLeague && !pathLeague.startsWith('img/')) {
        throw new Error('pathLeague must start with img/');
      }

      const updateData: any = {
        clubName,
        ownerNameOwnerID,
        leagueNameLeagueID,
      };

      if (pathLogo !== undefined) {
        updateData.pathLogo = pathLogo;
      }
      if (pathLeague !== undefined) {
        updateData.pathLeague = pathLeague;
      }

      const result = await this.clubService.updateClub(id, updateData);
      if (result) {
        const updatedClub = await this.clubService.findClubByID(id);
        res.status(200).json(updatedClub);
      } else {
        res.status(500).json({ error: 'Failed to update club' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      next();
    }
  }

  async fullClubs(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const result = await this.clubService.allClubs();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    } finally {
      next();
    }
  }
}
