const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
        id: String,
        licensePlate: {
            type: String,
            required: [true, "licensePlate is required"]
        },
        property_id: {
            type: String, 
            required: [true, "missing property_id"]
        },
        isActive: {
            type: Boolean,
            default: true
        }
    }, 
    {
        timestamps: true
});

module.exports = mongoose.model('Car', CarSchema);