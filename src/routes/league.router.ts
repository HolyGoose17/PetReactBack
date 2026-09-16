import { LeagueService } from '../services/league.service';
import { LeagueController } from '../controllers/league.controller'
import {Router} from 'express'

const router = Router()
const leagueService = new LeagueService();
const leagueController = new LeagueController(leagueService)

router.get('/league/', leagueController.fullLeagues.bind(leagueController))
.get('/league/:id', leagueController.getLeagueByID.bind(leagueController))
.post('/league/', leagueController.postLeague.bind(leagueController))
.put('/league/:id', leagueController.putLeague.bind(leagueController))
.delete('/league/:id', leagueController.deleteLeague.bind(leagueController))

export default router;