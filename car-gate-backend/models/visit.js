const mongoose = require('mongoose');

const VisitSchema = mongoose.Schema({
        id: String,
        licensePlate: {
            type: String,
            required: [true, "licensePlate is required"]
        },
        property_id: {
            type: String, 
            required: [true, "missing property_id"]
        },
        date: {
            type: Date,
            required: [true, "date is missing"],
            validate: function(input) {
                return new Date(input) >= new Date(new Date().setUTCHours(0,0,0,0));
            },
        },
        visitType: {
            type: String,
            enum: ['GUEST', 'WORKER', 'OTHER'],
            required: [true, "visitType is missing"],
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }, 
    {
        timestamps: true
});

module.exports = mongoose.model('Visit', VisitSchema);