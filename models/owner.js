const { string } = require('joi');
const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    name: String,
    Designation:String,
    owner_role:{"type":String,"enum":["CEO","Manager"]} ,
    user_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Owner', OwnerSchema);