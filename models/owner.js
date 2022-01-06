const { string } = require('joi');
const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    name: String,
    Designation:String,
    owner_role:{"type":String,"enum":["CEO","Manager"]} ,
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Owner', OwnerSchema);