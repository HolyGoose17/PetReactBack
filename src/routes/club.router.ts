import { ClubService } from '../services/club.service';
import { ClubController } from '../controllers/club.controller';
import { Router } from 'express';

const router = Router();
const clubService = new ClubService();
const clubController = new ClubController(clubService);

router
  .route('/')
  .get(clubController.fullClubs.bind(clubController))
  .post(clubController.postClub.bind(clubController));

router
  .route('/:id')
  .get(clubController.getClubByID.bind(clubController))
  .put(clubController.putClub.bind(clubController))
  .delete(clubController.deleteClub.bind(clubController));

export default router;
