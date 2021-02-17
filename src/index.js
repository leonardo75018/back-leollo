const express = require("express");
const bodyParser = require("body-parser")
const routes = require("./routes/index")

const app = express();
const port = 3000

routes(app)

app.listen(port, () => console.log(`Serveur lancé sur la porte ${port}`));

module.exports = app; 