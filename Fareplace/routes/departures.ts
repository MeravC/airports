import { Router, Request, Response } from 'express';
import { DepartureBoardFactory } from '../departure-boards';

const router = Router();

router.get('/airport=:airportCode', async (req: Request, res: Response) => {
    try {
        const { airportCode } = req.params;
        const departureBoard = DepartureBoardFactory.createDepartureBoard(airportCode);
        const departures = await departureBoard.departuresFor(airportCode);

        res.json(departures);
    } catch (err: any) {
        const statusCode = err.message.includes('supported') ? 400 : 500;
        res.status(statusCode).json({ error: err.message });
    }

});

export default router;