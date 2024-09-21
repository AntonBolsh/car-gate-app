const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: [true, "name is missing"]
    },
    surname: {
        type: String,
        required: [true, "surname is missing"]
    },
    phone: {
        type: String,
        required: [true, "phone is missing"]
    },
    userType: {
        type: String,
        enum: ['OWNER', 'SECURITY', 'ADMIN'],
        required: [true, "userType"],
    },
    property_id: {
        type: String, 
        required: function() {
            return this.userType === 'OWNER';
          }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);