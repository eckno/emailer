const mongoose = require("mongoose");
//
const definedSchema = {
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    auth: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    urole: {
        type: String,
        required: true,
        default: ""
    },
    api_key: {
        type: String,
    },
    public_key: {
        type: String,
    }
};
//
const userSchema = new mongoose.Schema(definedSchema);
//
const Users = mongoose.model("Users", userSchema);
//
module.exports = Users;