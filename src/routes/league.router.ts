import { Router } from 'express';

import { LeagueController } from '@/controllers/league.controller';
import { LeagueService } from '@/services/league.service';

const router = Router();
const leagueService = new LeagueService();
const leagueController = new LeagueController(leagueService);

router
  .route('/')
  .get(leagueController.getLeague)
  .post(leagueController.postLeague);

router
  .route('/:id')
  .get(leagueController.getLeagueByID)
  .put(leagueController.putLeague)
  .delete(leagueController.deleteLeague);

export default router;
