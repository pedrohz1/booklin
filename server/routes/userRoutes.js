const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/login", userController.getLoginPage);


router.post("/register", userController.register);

router.post("/login", userController.login);

module.exports = router;