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
const overlays_1 = __importDefault(require("../models/overlays"));
const OverlayRouter = express_1.default.Router();
// Middleware that is specific to this OverlayRouter
OverlayRouter.use((req, res, next) => {
    console.log('Time: ', Date.now());
    next();
});
OverlayRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Getting list of all overlays");
    try {
        const listOfAllOverlays = yield overlays_1.default.find();
        if (listOfAllOverlays.length === 0) {
            res.json({ status: 200, msg: "No overlays defined", data: listOfAllOverlays });
        }
        else {
            res.json({ status: 200, msg: "Successfully fetched all overlays", data: listOfAllOverlays });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ status: 500, msg: "Issue connecting with the Database", data: [] });
    }
}));
// Define the home page route
OverlayRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating a new overlay");
    try {
        const newOverlay = new overlays_1.default(req.body.overlayDetails);
        console.log(newOverlay);
        const overlaySaved = yield newOverlay.save();
        if (overlaySaved) {
            res.json({ status: 200, msg: "Overlay created", data: [] });
        }
        else {
            res.json({ status: 500, msg: "Error saving overlay", data: [] });
        }
    }
    catch (e) {
        console.log(e);
        res.json({ status: 500, msg: "Could not create the overlay. Please try again", data: [] });
    }
}));
// Define the about route
OverlayRouter.put('/edit/:overlayID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Editing existing overlay");
    try {
        const existingOverlay = yield overlays_1.default.findOneAndReplace({ _id: req.params.overlayID }, req.body.overlayDetails);
        res.json({ status: 200, msg: "Overlay updated successfully", data: [existingOverlay] });
    }
    catch (e) {
        console.error(e);
        res.json({ status: 500, msg: "Overlay could not be updated", data: [] });
    }
}));
OverlayRouter.get('/:overlayId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Getting a particular journey");
    try {
        const getParticularOverlay = yield overlays_1.default.findOne({ _id: req.params.overlayId });
        console.log(getParticularOverlay);
        res.json({ status: 200, msg: "Successfully fetched overlay", data: getParticularOverlay });
    }
    catch (e) {
        console.log(e);
        res.json({ status: 500, msg: "Issue connecting with the Database", data: [] });
    }
}));
OverlayRouter.patch('/disable/:overlayID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Disabling an existing overlay");
    try {
        const existingOverlay = yield overlays_1.default.findOneAndUpdate({ _id: req.params.overlayID }, { enabled: false });
        res.json({ status: 200, msg: "Overlay updated successfully", data: [existingOverlay] });
    }
    catch (err) {
        console.error(err);
        res.json({ status: 200, msg: "Error toggling state", data: [] });
    }
}));
OverlayRouter.patch('/enable/:overlayID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Enabling existing overlay");
    try {
        const existingOverlay = yield overlays_1.default.findOneAndUpdate({ _id: req.params.overlayID }, { enabled: true });
        res.json({ status: 200, msg: "Overlay updated successfully", data: [existingOverlay] });
    }
    catch (err) {
        console.error(err);
        res.json({ status: 200, msg: "Error toggling state", data: [] });
    }
}));
OverlayRouter.delete('/remove/:overlayID', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deleting overlay");
    try {
        const existingOverlay = yield overlays_1.default.deleteOne({ _id: req.params.overlayID });
        res.json({ status: 200, msg: "Overlay deleted successfully", data: [existingOverlay] });
    }
    catch (err) {
        console.error(err);
        res.json({ status: 200, msg: "Error deleting overlay", data: [] });
    }
}));
exports.default = OverlayRouter;
//# sourceMappingURL=overlays.js.map