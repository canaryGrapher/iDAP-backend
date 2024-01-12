"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const journeys_1 = __importDefault(require("../models/journeys"));
const JourneyRouter = express_1.default.Router();
// Middleware that is specific to this JourneyRouter
JourneyRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
JourneyRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Getting list of all journeys");
    try {
        const listOfAllJourneys = yield journeys_1.default.find();
        if (listOfAllJourneys.length === 0) {
            res.json({ status: 200, msg: "No journeys defined", data: listOfAllJourneys });
        }
        else {
            res.json({ status: 200, msg: "Successfully fetched all journeys", data: listOfAllJourneys });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ status: 500, msg: "Issue connecting with the Database", data: [] });
    }
}));
JourneyRouter.get('/:journeyId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Getting a particular journey");
    try {
        const getParticularJourney = yield journeys_1.default.findOne({ _id: req.params.journeyId });
        console.log(getParticularJourney);
        res.json({ status: 200, msg: "Successfully fetched journeys", data: getParticularJourney });
    }
    catch (e) {
        console.log(e);
        res.json({ status: 500, msg: "Issue connecting with the Database", data: [] });
    }
}));
// Define the home page route
JourneyRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating a new journey");
    try {
        const newJourney = new journeys_1.default(req.body.journeyDetails);
        console.log(newJourney);
        const journeySaved = yield newJourney.save();
        if (journeySaved) {
            res.json({ status: 200, msg: "Journey created", data: [] });
        }
        else {
            res.json({ status: 500, msg: "Error saving journey", data: [] });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ status: 500, msg: "Could not create the journey. Please try again", data: [] });
    }
}));
// Define the about route
JourneyRouter.put('/edit/:journeyID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Editing existing journey");
    try {
        const existingJourney = yield journeys_1.default.findOneAndReplace({ _id: req.params.journeyID }, req.body.journeyDetails);
        res.json({ status: 200, msg: "Journey updated successfully", data: [existingJourney] });
    }
    catch (e) {
        console.error(e);
        res.json({ status: 500, msg: "Journey could not be updated", data: [] });
    }
}));
JourneyRouter.patch('/disable/:journeyID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Disabling an existing journey");
    try {
        const existingJourney = yield journeys_1.default.findOneAndUpdate({ _id: req.params.journeyID }, { enabled: false });
        res.json({ status: 200, msg: "Journey updated successfully", data: [existingJourney] });
    }
    catch (err) {
        console.error(err);
        res.json({ status: 200, msg: "Error toggling state", data: [] });
    }
}));
JourneyRouter.patch('/enable/:journeyID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Enabling existing journey");
    try {
        const existingJourney = yield journeys_1.default.findOneAndUpdate({ _id: req.params.journeyID }, { enabled: true });
        res.json({ status: 200, msg: "Journey updated successfully", data: [existingJourney] });
    }
    catch (err) {
        console.error(err);
        res.json({ status: 200, msg: "Error toggling state", data: [] });
    }
}));
JourneyRouter.delete('/remove/:journeyID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting journey");
    try {
        const existingJourney = yield journeys_1.default.deleteOne({ _id: req.params.journeyID });
        res.json({ status: 200, msg: "Journey deleted successfully", data: [existingJourney] });
    }
    catch (err) {
        console.error(err);
        res.json({ status: 200, msg: "Error deleting journey", data: [] });
    }
}));
exports.default = JourneyRouter;
//# sourceMappingURL=journeys.js.map