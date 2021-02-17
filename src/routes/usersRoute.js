const { Router } = require("express")
const UserController = require("../controllers/UserController")
const Authentification = require("../controllers/authController")
const authMiddleware = require("../middlewares/auth")


const router = Router();

router.get("/find", authMiddleware, UserController.takeAllUsers)
router.post("/register", UserController.register)
router.put("/update/:id", UserController.updateUser)
router.post("/delete/:id", UserController.deleteUser)
router.post("/login", Authentification.login)
router.post("/forgot/password/:id", UserController.forgotPassword)


module.exports = router