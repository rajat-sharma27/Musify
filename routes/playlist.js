const router = require("express").Router();
const { User, validate } = require("../models/user");
// const auth = require("../middleware/auth");
// const validateObjectId = require("../middleware/validateObjectId");

// get user by email
router.get("/:email", async (req, res) => {
	const user = await User.findOne({ email: req.params.email });
	if (!user)
	  return res.status(400).send({ message: "Invalid Id!" });
  
	res.status(200).send({ data: user.playlists, message: "Here is ur playlists" });
  });

  router.put("/:email",  async (req, res) => {
    const user=await User.collection.updateOne(
        {
            email: req.params.email
        },
        {
            $set: {
                "playlists": {}
            }
        }
    )
	
	res.status(200).send({ data: user, message: "Here is ur playlists" });
  });
  router.post("/:email&:plst&:song",  async (req, res) => {
    let ct="playlists."+req.params.plst
    const user=await User.collection.updateOne(
        {
            email: req.params.email
        },
        {
            $addToSet:{
                [ct]: req.params.song 
            }
            
        }
    )
	
	res.status(200).send({ data: user, message: "Here is ur playlists" });
  });


module.exports = router;
