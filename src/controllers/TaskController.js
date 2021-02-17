const database = require("../models");
const { use } = require("../routes/projectsRoute");




class Task {

    static async TakeProjectTask(req, res) {
        const { id } = req.params

        try {
            const projectTask = await database.Task.findAll({ where: { projectId: Number(id) } });
            return res.status(200).json({ projectTask: projectTask })

        } catch (error) {
            return res.status(500).json(error.message)
        }

    }

    static async CreateTask(req, res) {
        const { text, status, priority, projectId } = req.body

        try {
            if (text === null || text === "") {
                return res.status(400).json({ error: "not task content", message: "Vous devez décrire cette tache" });
            }

            if (projectId === null || projectId === "") {
                return res.status(400).json({ error: "not projectId", message: "Vous devez ajouter le project de cette tache" });
            }


            const task = await database.Task.create({
                text: text, Status: status, priority: priority, projectId: projectId

            })

            return res.status(200).json({ task: task })

        } catch (error) {

            return res.status(500).json(error.message)
        }
    }

    static async taskUpdate(req, res) {
        const { text, status, priority } = req.body
        const { id } = req.params

        try {
            await database.Task.update({
                text: text, status: status, priority: priority
            },
                { where: { id: Number(id) } })

            const taskUpdate = await database.Task.findOne({ where: { id: Number(id) } })
            return res.status(200).json(taskUpdate)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async deleTask(req, res) {
        const { id } = req.params
        try {
            await database.Task.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} deleted` })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

}



module.exports = Task