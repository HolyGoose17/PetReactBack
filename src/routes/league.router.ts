import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller';
import { Router } from 'express';

const router = Router();
const leagueService = new LeagueService();
const leagueController = new LeagueController(leagueService);

router
  .route('/')
  .get(leagueController.fullLeagues)
  .post(leagueController.postLeague);

router
  .route('/:id')
  .get(leagueController.getLeagueByID)
  .put(leagueController.putLeague)
  .delete(leagueController.deleteLeague);

export default router;
