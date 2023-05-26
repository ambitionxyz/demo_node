const express = require("express");

const userController = require("../controller/persionController");
const router = express.Router();

//GET USERS
router.get("/users", userController.GetUsers);
//GET USER
router.get("/user", userController.GetUser);
// //POST
// router.post("UPDATE", userController.UpdateUser);
// //DELETE
router.post("/delete-user", userController.DeleteUser);
router.post("/add-user", userController.AddUser);

module.exports = router;
