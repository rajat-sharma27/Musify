const mongoose = require("mongoose");

const playlistschema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String,required:true},
    songs:{type:[String],default: []},
})

const Playlist = mongoose.model("Playlist",playlistschema);

module.exports = Playlist;