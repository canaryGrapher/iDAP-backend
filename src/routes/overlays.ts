import express, { Request, Response, NextFunction } from 'express';
import Overlays from "../models/overlays"

const OverlayRouter = express.Router();

// Middleware that is specific to this OverlayRouter
OverlayRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Time: ', Date.now());
    next();
});

OverlayRouter.get('/', async (req: Request, res: Response) => {
    console.log("Getting list of all overlays")
    try {
        const listOfAllOverlays = await Overlays.find()
        if (listOfAllOverlays.length === 0) {
            res.json({ status: 200, msg: "No overlays defined", data: listOfAllOverlays });
        } else {
            res.json({ status: 200, msg: "Successfully fetched all overlays", data: listOfAllOverlays });
        }
    } catch (e) {
        console.log(e)
        res.json({ status: 500, msg: "Issue connecting with the Database", data: [] });
    }
});

// Define the home page route
OverlayRouter.post('/', async (req: Request, res: Response) => {
    console.log("Creating a new overlay")
    try {
        const newOverlay = new Overlays(req.body.overlayDetails)
        console.log(newOverlay)
        const overlaySaved = await newOverlay.save()
        if (overlaySaved) {
            res.json({ status: 200, msg: "Overlay created", data: [] });
        } else {
            res.json({ status: 500, msg: "Error saving overlay", data: [] });
        }
    } catch (e) {
        console.log(e)
        res.json({ status: 500, msg: "Could not create the overlay. Please try again", data: [] });
    }
});

// Define the about route
OverlayRouter.put('/edit/:overlayID', async (req: Request, res: Response) => {
    console.log("Editing existing overlay");
    try {
        const existingOverlay = await Overlays.findOneAndReplace({ _id: req.params.overlayID }, req.body.overlayDetails)
        res.json({ status: 200, msg: "Overlay updated successfully", data: [existingOverlay] })
    } catch (e) {
        console.error(e)
        res.json({ status: 500, msg: "Overlay could not be updated", data: [] })
    }
});

OverlayRouter.get('/:overlayId', async (req: Request, res: Response) => {
    console.log("Getting a particular journey")
    try {
        const getParticularOverlay = await Overlays.findOne({ _id: req.params.overlayId })
        console.log(getParticularOverlay)
        res.json({ status: 200, msg: "Successfully fetched overlay", data: getParticularOverlay });
    } catch (e) {
        console.log(e)
        res.json({ status: 500, msg: "Issue connecting with the Database", data: [] });
    }
});

OverlayRouter.patch('/disable/:overlayID', async (req: Request, res: Response) => {
    console.log("Disabling an existing overlay")
    try {
        const existingOverlay = await Overlays.findOneAndUpdate({ _id: req.params.overlayID }, { enabled: false })
        res.json({ status: 200, msg: "Overlay updated successfully", data: [existingOverlay] })
    } catch (err) {
        console.error(err)
        res.json({ status: 200, msg: "Error toggling state", data: [] })
    }
});

OverlayRouter.patch('/enable/:overlayID', async (req: Request, res: Response) => {
    console.log("Enabling existing overlay")
    try {
        const existingOverlay = await Overlays.findOneAndUpdate({ _id: req.params.overlayID }, { enabled: true })
        res.json({ status: 200, msg: "Overlay updated successfully", data: [existingOverlay] })
    } catch (err) {
        console.error(err)
        res.json({ status: 200, msg: "Error toggling state", data: [] })
    }
});

OverlayRouter.delete('/remove/:overlayID', async (req: Request, res: Response) => {
    console.log("Deleting overlay")
    try {
        const existingOverlay = await Overlays.deleteOne({ _id: req.params.overlayID })
        res.json({ status: 200, msg: "Overlay deleted successfully", data: [existingOverlay] })
    } catch (err) {
        console.error(err)
        res.json({ status: 200, msg: "Error deleting overlay", data: [] })
    }
});

export default OverlayRouter;