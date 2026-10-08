import { ClubService } from '../services/club.service';
import { ClubController } from '../controllers/club.controller';
import { Router } from 'express';

const router = Router();
const clubService = new ClubService();
const clubController = new ClubController(clubService);

router.route('/').get(clubController.fullClubs).post(clubController.postClub);

router
  .route('/:id')
  .get(clubController.getClubByID)
  .put(clubController.putClub)
  .delete(clubController.deleteClub);

export default router;
