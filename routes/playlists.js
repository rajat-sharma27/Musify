const router = require('express').Router();
const isAuth = require('../middleware/auth');
const Playlist = require('../models/playlist');
const {User} = require('../models/user');

router.get('/',isAuth,(req,res)=>{
    User.findOne({_id:req.user._id}).populate("playlists").exec((err,user)=>{
        if(err){
            console.log("error in fetching0");
        }
        else{
            res.render('playlist',{
                title: 'playlist',
                playlist:user.playlists
            })
        }
    })
})

router.get('/data',isAuth,(req,res)=>{
    User.findOne({_id:req.user._id}).populate("playlists").exec((err,user)=>{
        if(err){
            console.log("error in fetching0");
        }
        else{
            const thisplaylist = user.playlists;
            res.json(thisplaylist)
        }
    })
})


router.post('/',isAuth,(req,res)=>{
    const newname = req.body.name;
    console.log(newname);
    User.findOne({_id:req.user._id}).populate("playlists").exec((err,user)=>{
        if(err){
            console.log("error in fetching");
        }
        else{
            Playlist.findOne({name:newname,email:req.user.email},(err,grp)=>{
                if(err){
                    console.log("err");
                }
                else if(grp){
                    return res.render('playlist',{
                        title: 'playlist',
                        message:"name already take",
                        playlist:user.playlists
                    })
                }
                else{
                    let newplaylist = new Playlist({
                        name:newname,
                        email:req.user.email
                    })
                    newplaylist.save();
                    user.playlists.push(newplaylist._id);
                    user.save();
                    let thisplaylist = user.playlists;
                    return res.render('playlist',{
                        title: 'playlist',
                        playlist:thisplaylist
                    })
                }
            })
        }
    })
})

router.get('/:id',isAuth,async(req,res)=>{
    const id = req.params.id;
    const play = await Playlist.findById({_id:id});
    const user = await User.findById({_id:req.user._id});
    res.render('seeplaylist',{
        title: play.name + " | ",
        lkSongs: user.likedSongs,
        songs:play.songs,
        grpid:id
    })
});


router.post('/remove/:grpid/:id',isAuth,async(req,res)=>{
    const id = req.params.id;
    const grpidid = req.params.grpid;
    console.log(id);
    await Playlist.findByIdAndUpdate({_id:grpidid},{$pull:{"songs":id}})
    const play = await Playlist.findById({_id:grpidid});
    const user = await User.findById({_id:req.user._id});
    res.json({//ajax call
        grpid:play._id,
        song:play.songs,
        lkSongs:user.likedSongs
    })
});

module.exports = router;



























// const router = require("express").Router();
// const { User, validate } = require("../models/user");
// const auth = require("../middleware/auth");
// const validateObjectId = require("../middleware/validateObjectId");

// // get user by email
// router.get("/:email", async (req, res) => {
// 	const user = await User.findOne({ email: req.params.email });
// 	if (!user)
// 	  return res.status(400).send({ message: "Invalid Id!" });
  
// 	res.status(200).send({ data: user.playlists, message: "Here is ur playlists" });
//   });

//   router.put("/:email",  async (req, res) => {
//     const user=await User.collection.updateOne(
//         {
//             email: req.params.email
//         },
//         {
//             $set: {
//                 "playlists": {}
//             }
//         }
//     )
	
// 	res.status(200).send({ data: user, message: "Here is ur playlists" });
//   });
//   router.post("/:email&:plst&:song",  async (req, res) => {
//     let ct="playlists."+req.params.plst
//     const user=await User.collection.updateOne(
//         {
//             email: req.params.email
//         },
//         {
//             $addToSet:{
//                 [ct]: req.params.song 
//             }
            
//         }
//     )
	
// 	res.status(200).send({ data: user, message: "Here is ur playlists" });
//   });


// module.exports = router;
