const { string } = require('joi');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    age: String,
    designation:String,
    owner_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
  },
    images:String,
    Manager_status:  { type: Boolean, default: false },
    CEO_status:  { type: Boolean, default: false },
    
    Approved_by_manager:{
      type: String,
      default: ''
  },
    Approved_by_CEO:{
      type: String,
      default: ''
  },
  CEO_rating:{
    type:String,
    default:''
  },
  Manager_rating:{
    type:String,
    default:''
  },
    avatar: {
        type: String,
      },
      cloudinary_id: {
        type: String,
      },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);