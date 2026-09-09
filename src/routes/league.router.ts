import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller'
import {Router} from 'express'

const router = Router()
const leagueService = new LeagueService();
const leagueController = new LeagueController(leagueService)

router.get('/league/', leagueController.fullLeagues.bind(leagueController))
router.get('/league/:id', leagueController.getLeagueByID.bind(leagueController))
router.post('/league/', leagueController.postLeague.bind(leagueController))
router.put('/league/:id', leagueController.putLeague.bind(leagueController))
router.delete('/league/:id', leagueController.deleteLeague.bind(leagueController))

export default router;