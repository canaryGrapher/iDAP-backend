"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OverlaysSchema = new mongoose_1.default.Schema({
    enabled: {
        type: Boolean,
        default: true
    },
    journeyName: {
        type: String,
        unique: true
    },
    customClasses: {
        type: String,
        required: false
    },
    journeyDescription: {
        type: String,
        unique: true
    },
    defaultTourOptions: [String],
    steps: [{
            advancedOn: {
                type: String,
                required: false
            },
            beforeHide: {
                type: String,
                required: false
            },
            beforeShow: {
                type: String,
                required: false
            },
            buttonsToShow: [String],
            elementPosition: String,
            journeyContent: String,
            pageLink: String,
            showOn: {
                type: String,
                required: false
            },
            targetClick: String
        }]
});
const Overlays = mongoose_1.default.models.Overlays || mongoose_1.default.model("Overlay", OverlaysSchema);
exports.default = Overlays;
//# sourceMappingURL=overlays.js.map