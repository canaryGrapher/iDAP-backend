import mongoose, { Model } from 'mongoose'

const OverlaysSchema = new mongoose.Schema({
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
})

const Overlays = mongoose.models.Overlays || mongoose.model("Overlay", OverlaysSchema)

export default Overlays