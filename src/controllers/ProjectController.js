const database = require("../models");
const { use } = require("../routes/projectsRoute");




class ProjectController {

    static async takeUserProject(req, res) {
        const { id } = req.params
        try {

            const userProject = await database.project.findAll({ where: { userId: Number(id) } });
            return res.status(200).json({ userProject: userProject })

        } catch (error) {
            return res.status(500).json(error.message)
        }

    }

    static async CreateProject(req, res) {
        const userId = req.userId
        const { name, backdrop } = req.body

        try {
            if (name === null || name === "") {
                return res.status(400).json({ error: "not project name", message: "Vous devez ajouter un nom au projet" });
            }

            if (userId === null || userId === "") {
                return res.status(400).json({ error: "not userId", message: "Vous devez ajouter le propiétaite de ce projet" });
            }

            if (await database.project.findOne({ where: { name: name } })) {
                return res.status(400).send("Ce projet existe déjà, veuillez chnager de nom ")
            }


            const project = await database.project.create({
                name: name, backdrop: backdrop, userId: userId
            })
            return res.status(200).json({ project: project })

        } catch (error) {

            return res.status(500).json(error.message)
        }
    }

    static async projectUpdate(req, res) {
        const { name, backdrop } = req.body
        const { id } = req.params

        try {
            await database.project.update({ name: name, backdrop: backdrop }, { where: { id: Number(id) } })
            const projectUpdate = await database.project.findOne({ where: { id: Number(id) } })
            return res.status(200).json(projectUpdate)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async deleProject(req, res) {
        const { id } = req.params
        try {
            await database.project.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} deleted` })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = ProjectController