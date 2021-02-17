const bodyParser = require("body-parser");
const users = require("./usersRoute")
const projects = require("./projectsRoute")
const task = require("./taskRoute")







module.exports = app => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(users, projects, task)
}