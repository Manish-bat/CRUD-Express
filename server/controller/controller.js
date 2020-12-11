var Userdb = require("../models/model");

// create and save user
exports.create = (req, res) => {
  // validate request
  if(!req.body){
      res.status(400).send({message:"Content can not be empty"});
      return;
  }

  //new User
  const user = new Userdb({
      name:req.body.name,
      email:req.body.email,
      gender:req.body.gender,
      status:req.body.status
  })

  // Save user in the database
  user
  .save(user)
  .then(data=>{
      res.send(data)
  })
  .catch(err => {
      res.status(500).send({
          message: err.message || "Something went wrong"
      });
  });
};

//retrieve and return all users/retrieve and return a single user
exports.find = (req, res) => {
  Userdb.find()
  .then(user => {
      res.send(user)
  })
  .catch(err => {
      res.status(500).send({
          message: err.message || "Error occured while retrieving user information"
      })
  })
};


//update a new identified user by userid
exports.update = (req, res) => {
  if(!req.body){
      return res
      .status(400)
      .send({message: "Data to be updated can not be empty"})
  }
  const id = req.params.body;
  Userdb.findByIdAndUpdate(id, req.body )
};


//Delete a user with specific user id in the request

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Userdb.findByIdAndDelete(id)
    .then(data => {
      if(!data){
        res.status(404)
        .send({message: `Cannot delete with id ${id}.Maybe id is wrong`})
      } else {
        res.send({
          message: `User was deleted`
        });
      }
    })
    .catch(err => {
      res.status(500)
      .send({message: "Could not delete User with id =" +id
      });
    });
  };