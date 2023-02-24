let mongoose = require('mongoose');

let businessModel = mongoose.Schema(
    {
        name:
        {
            type: String,
        },
        email:
        {
            type: String,
        },
        contactNumber:
        {
            type: Number,
        },
    },
    {
        collection: "businessContacts"
    }
);

module.exports = mongoose.model('Business', businessModel); 