const { Router } = require("express")
const TaskController = require("../controllers/TaskController")
const authMiddleware = require("../middlewares/auth")


const router = Router();

router.get("/find/task/:id", authMiddleware, TaskController.TakeProjectTask)
router.post("/create/task", authMiddleware, TaskController.CreateTask)
router.put("/update/task/:id", authMiddleware, TaskController.taskUpdate)
router.post("/delete/task/:id", authMiddleware, TaskController.deleTask)

module.exports = router