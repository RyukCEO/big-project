const mongoose = require("mongoose")

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const UserSchema = new schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    phonenumber: {
      type: String,
      required: false
    },
    desc:{
      type:String
    },
    profilepicture:{
        type:String,
        default:""
    },
    followers:{
        type: Array,
        default:[]
    },
    following:{
        type: Array,
        default:[]
    }
  });


module.exports = mongoose.model('User', UserSchema);
