const { Router } = require("express")
const ProjectController = require("../controllers/ProjectController")
const authMiddleware = require("../middlewares/auth")


const router = Router();

router.get("/find/project/:id", authMiddleware, ProjectController.takeUserProject)
router.post("/create/project", authMiddleware, ProjectController.CreateProject)
router.put("/update/project/:id", authMiddleware, ProjectController.projectUpdate)
router.post("/delete/project/:id", authMiddleware, ProjectController.deleProject)

module.exports = router