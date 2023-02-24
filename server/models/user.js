let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema(
    {
        username:
        {
            type: String,
            trim: true,
            required: "username is required",
            default: ""
        },
        email:
        {
            type: String,
            default: "",
            trim: true,
            required: "emial is required"
        },
        displayName:
        {
            type: String,
            default: "",
            trim: true,
            required: "Display Name is required",
        },
        created:
        {
            type: Date,
            defalut: Date.now
        }
    },
    {
        collection: "users"
    }
);

let options = ({ missingPasswordError: 'Wrong/ Missing Password' });
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User); 