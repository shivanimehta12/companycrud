const router = require("express").Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const User = require("../models/employee"); 
const owner = require("../models/owner");
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
     // Create new user
    let user = new User({
      name: req.body.name,
      age:req.body.age,
      designation:req.body.designation,
      Manager_status: req.body.Manager_status,
      CEO_status:req.body.CEO_status,
      Approved_by_manager:req.body.Approved_by_manager,
      Approved_by_CEO:req.body.Approved_by_CEO,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });
    // Save user
    await user.save();
    res.json(user);
  } catch (err) {
    console.log(err);
  }}); 

  router.get("/getall", async (req, res) => {
    try {
      let user = await User.find();
      res.json(user);
    } catch (err) {
      console.log(err);
    }});

    router.delete("/:id", async (req, res) => {
        try {
          // Find user by id
          let user = await User.findById(req.params.id);
          // Delete image from cloudinary
          await cloudinary.uploader.destroy(user.cloudinary_id);
          // Delete user from db
          await user.remove();
          res.json(user);
        } catch (err) {
          console.log(err);
        }});

        router.put("/:id", upload.single("image"), async (req, res) => {
            try {
               
              let user = await User.findById(req.params.id);
              // Delete image from cloudinary
              await cloudinary.uploader.destroy(user.cloudinary_id);
              // Upload image to cloudinary
              const result = await cloudinary.uploader.upload(req.file.path);
              const data = {
                name: req.body.name || user.name,
                age:req.body.age||user.age,
                designation:req.body.designation||user.designation,
                Manager_status: req.body.Manager_status||user.Manager_status,
                CEO_status:req.body.CEO_status||user.CEO_status,
                Approved_by_manager:req.body.Approved_by_manager||Approved_by_manager,
                Approved_by_CEO:req.body.Approved_by_CEO||User.Approved_by_CEO,
                avatar: result.secure_url || user.avatar,
                cloudinary_id: result.public_id || user.cloudinary_id,
              };
              user = await User.findByIdAndUpdate(req.params.id, data, {
           new: true
           });
              res.json(user);
            } catch (err) {
              console.log(err);
            }});
 

            router.post("/createowner",async (req, res) => {
                try {
                   // Create new user
                  let user = new owner({
                    name: req.body.name,
                    designation:req.body.designation,
                    owner_role:req.body.owner_role
                  });
                  // Save user
                  await user.save();
                  res.json(user);
                } catch (err) {
                  console.log(err);
                }}); 
              
                // manager  approval  

         router.get("/approval",async (req, res) => {
                try {
                    const { user_id, owner_id } = req.query;
                    console.log(req)
                    const check_user = await User.find({_id:user_id});
                    console.log(check_user)
                    const check_owner = await owner.find({_id:owner_id});
                    console.log("shiv....!",check_user);
                    console.log("mehta....!",check_owner);

                        if (check_user.length > 0 && check_owner.length > 0){

                       if (check_owner[0].owner_role === 'CEO')
                       {
                        console.log("shivanya.......!");

                const employee = await User.findOneAndUpdate({ _id: user_id }, { $set: {  Approved_by_CEO: "approved",CEO_status: true } })
            
                return res.status(200).json({ data: employee, status: 200 });
                
            }
            else {
                if (check_owner[0].owner_role === 'Manager')
                       {
                const result = await User.findOneAndUpdate({ _id: user_id }, { $set: {  Approved_by_manager: "approved",Manager_status: true } })
                
                return res.status(200).json({ data: result, status: 200 });
                
            }
            }
                       }
                       else{
                         return  res.status(501).send({ data: "error", status: 501 });
                       }
                 }
                
                 catch (e) {
                    console.log(e);
                    res.status(500).json({ data: "error", status: 500 })
                }
            
            });
            module.exports = router;