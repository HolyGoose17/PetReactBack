// import { PlayerController } from "../controllers/player.controller";
// import { PlayerService } from "../services/player.service";
// import mock from "../mock/mock";

import { Player } from "../entities/player";
import { TestConection } from "../data-access/test.connection"; 

// beforeAll(async () => {
//     await TestConection.initialize();
// });

// afterAll(async () => {
//     await TestConection.destroy();
// });

// afterEach(async () => {
//     const entities = TestConection.entityMetadatas;
//     for(const entity of entities) {
//         const repository = TestConection.getRepository(entity.name);
//         await repository.clear;
//     }
// });

describe('Players entities', () => {
    beforeAll(async () => {
        await TestConection.initialize();
    });

    it('Get Player', async() => {
        const playerRepo = await TestConection.getRepository(Player);
        const result = await playerRepo.find({
            where: {
                playerID: 4
            }
        })
        expect(result[0]).toEqual({
            playerID: 4,
            playerName: 'Cole Palmer'
        });

    })
})

// const storageService = new PlayerService();
// const playerController = new PlayerController(storageService);
// const req = mock.mockRequest();
// const res = mock.mockResponse();

// const player = {
//     id: 1,
//     playerName: 'Virgil van Dejk',
// }

// test('salam', async () => {
//     req.params.agentID='1'
//     jest.spyOn(storageService, 'findPlayerByID');
//     await playerController.getPlayer(req, res, mock.mockNext);
//     expect(res.send).toBeCalledWith(player)
//     expect(res.status).toHaveBeenNthCalledWith(200)
// })