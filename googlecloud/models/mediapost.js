const mongoose = require("mongoose")

const schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const mediapostSchema = new schema({
    userId:{
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    desc:{
      type:String
    },
    profilepicture:{
        type:String,
        default:""
    },
    img: {
        type: String,
    },
    likes: {
        type: Array,
    }, 
  });


module.exports = mongoose.model('mediapost', mediapostSchema);
