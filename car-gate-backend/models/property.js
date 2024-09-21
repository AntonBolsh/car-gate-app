const mongoose = require('mongoose');

const PropertySchema = mongoose.Schema({
        id: String,
        address: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true
});

module.exports = mongoose.model('Property', PropertySchema);