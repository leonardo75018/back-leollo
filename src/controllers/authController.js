const database = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

authConfig = require("../config/auth");

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}



class Authentification {
    static async login(req, res) {
        const { email, password } = req.body;

        try {

            const user = await database.User.findOne({
                where: { email: email, }
            })
            if (!user)
                return res.status(400).send({ error: "User not found" })

            if (!await bcrypt.compare(password, user.password))
                return res.status(400).send({ error: "Invalid password" })
            user.password = undefined;


            return res.send({
                user,
                token: generateToken({ id: user.id })
            });
        } catch (error) { return res.status(500).json(error.message) }
    }
}
module.exports = Authentification;