import { ClubService } from '../services/club.service';
import { ClubController } from '../controllers/club.controller';
import { Router } from 'express';

const router = Router();
const clubService = new ClubService();
const clubController = new ClubController(clubService);

router.get('/club/', clubController.fullClubs.bind(clubController))
.get('/club/:id', clubController.getClubByID.bind(clubController))
.post('/club/', clubController.postClub.bind(clubController))
.put('/club/:id', clubController.putClub.bind(clubController))
.delete('/club/:id', clubController.deleteClub.bind(clubController))

export default router;
