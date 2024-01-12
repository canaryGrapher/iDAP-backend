import mongoose, { Model } from 'mongoose'

const JourneysSchema = new mongoose.Schema({
    enabled: {
        type: Boolean,
        default: true
    },
    journeyName: {
        type: String,
        unique: true,
        required: true
    },
    customClasses: {
        type: String,
        required: false
    },
    journeyDescription: {
        type: String,
        unique: true,
        required: true
    },
    defaultTourOptions: [String],
    topNavConfiguration: {
        topnav: {
            name: {
                type: String,
                required: true
            },
            selector: {
                type: String,
                required: true
            },
            legacySelector: {
                type: String,
                required: true
            },
        },
        subLink: {
            name: {
                type: String,
                required: true
            },
            selector: {
                type: String,
                required: true
            },
            legacySelector: {
                type: String,
                required: true
            },
        },
    },
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
        journeyContent: {
            type: String,
            required: true
        },
        pageLink: {
            type: String,
            required: true
        },
        showOn: {
            type: String,
            required: false
        },
        targetClick: String
    }]
})

const Journeys = mongoose.models.Journeys || mongoose.model("Journey", JourneysSchema)

export default Journeys