import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller';
import { Router } from 'express';

const router = Router();
const leagueService = new LeagueService();
const leagueController = new LeagueController(leagueService);

router
  .route('/')
  .get(leagueController.fullLeagues.bind(leagueController))
  .post(leagueController.postLeague.bind(leagueController));

router
  .route('/:id')
  .get(leagueController.getLeagueByID.bind(leagueController))
  .put(leagueController.putLeague.bind(leagueController))
  .delete(leagueController.deleteLeague.bind(leagueController));

export default router;
