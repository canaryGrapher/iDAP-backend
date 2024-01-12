import express, { Request, Response, NextFunction } from 'express';
import Journeys from "../models/journeys"

const JourneyRouter = express.Router();

// Middleware that is specific to this JourneyRouter
JourneyRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now());
    next();
});

JourneyRouter.get('/', async (req: Request, res: Response) => {
    console.log("Getting list of all journeys")
    try {
        const listOfAllJourneys = await Journeys.find()
        if (listOfAllJourneys.length === 0) {
            res.json({ status: 200, msg: "No journeys defined", data: listOfAllJourneys });
        } else {
            res.json({ status: 200, msg: "Successfully fetched all journeys", data: listOfAllJourneys });
        }
    } catch (e) {
        console.log(e)
        res.json({ status: 500, msg: "Issue connecting with the Database", data: [] });
    }
});

JourneyRouter.get('/:journeyId', async (req: Request, res: Response) => {
    console.log("Getting a particular journey")
    try {
        const getParticularJourney = await Journeys.findOne({ _id: req.params.journeyId })
        console.log(getParticularJourney)
        res.json({ status: 200, msg: "Successfully fetched journeys", data: getParticularJourney });
    } catch (e) {
        console.log(e)
        res.json({ status: 500, msg: "Issue connecting with the Database", data: [] });
    }
});

// Define the home page route
JourneyRouter.post('/', async (req: Request, res: Response) => {
    console.log("Creating a new journey")
    try {
        const newJourney = new Journeys(req.body.journeyDetails)
        console.log(newJourney)
        const journeySaved = await newJourney.save()
        if (journeySaved) {
            res.json({ status: 200, msg: "Journey created", data: [] });
        } else {
            res.json({ status: 500, msg: "Error saving journey", data: [] });
        }
    } catch (e) {
        console.log(e)
        res.json({ status: 500, msg: "Could not create the journey. Please try again", data: [] });
    }
});

// Define the about route
JourneyRouter.put('/edit/:journeyID', async (req: Request, res: Response) => {
    console.log("Editing existing journey");
    try {
        const existingJourney = await Journeys.findOneAndReplace({ _id: req.params.journeyID }, req.body.journeyDetails)
        res.json({ status: 200, msg: "Journey updated successfully", data: [existingJourney] })
    } catch (e) {
        console.error(e)
        res.json({ status: 500, msg: "Journey could not be updated", data: [] })
    }
});

JourneyRouter.patch('/disable/:journeyID', async (req: Request, res: Response) => {
    console.log("Disabling an existing journey")
    try {
        const existingJourney = await Journeys.findOneAndUpdate({ _id: req.params.journeyID }, { enabled: false })
        res.json({ status: 200, msg: "Journey updated successfully", data: [existingJourney] })
    } catch (err) {
        console.error(err)
        res.json({ status: 200, msg: "Error toggling state", data: [] })
    }
});

JourneyRouter.patch('/enable/:journeyID', async (req: Request, res: Response) => {
    console.log("Enabling existing journey")
    try {
        const existingJourney = await Journeys.findOneAndUpdate({ _id: req.params.journeyID }, { enabled: true })
        res.json({ status: 200, msg: "Journey updated successfully", data: [existingJourney] })
    } catch (err) {
        console.error(err)
        res.json({ status: 200, msg: "Error toggling state", data: [] })
    }
});

JourneyRouter.delete('/remove/:journeyID', async (req: Request, res: Response) => {
    console.log("Deleting journey")
    try {
        const existingJourney = await Journeys.deleteOne({ _id: req.params.journeyID })
        res.json({ status: 200, msg: "Journey deleted successfully", data: [existingJourney] })
    } catch (err) {
        console.error(err)
        res.json({ status: 200, msg: "Error deleting journey", data: [] })
    }
});

export default JourneyRouter;