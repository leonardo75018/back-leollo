const database = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const mailler = require("../modules/mailer")
const resetPassword = require("../modules/mailer")


const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}


//Constante 
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;


class UserController {
    static async takeAllUsers(req, res) {
        const allUsers = await database.User.findAll();
        return res.status(200).json(allUsers)
    }

    static async register(req, res) {
        const { firstName, lastName, email, password } = req.body
        const passwordtHash = await bcrypt.hash(password, 5);

        try {
            if (firstName === null || firstName === undefined || firstName === '') {
                return res.status(400).json({ error: "not firstName", message: "Le champ firstName n'est pas renseigné" });
            }

            if (typeof firstName !== 'string') {
                return res.status(400).json({ error: 'Le champ firstName doit être une chaîne de caractères' });
            }

            if (lastName === null || lastName === undefined || lastName === '') {
                return res.status(400).json({ error: "not lastName", message: "Le champ lastName n'est pas renseigné" });
            }

            if (typeof lastName !== 'string') {
                return res.status(400).json({ error: 'Le champ lastName doit être une chaîne de caractères' });
            }

            if (email === null || email === undefined || email === '') {
                return res.status(400).json({ error: "not email", message: "Le champ email n'est pas renseigné" });
            }

            if (!EMAIL_REGEX.test(email)) { return res.status(400).json({ error: 'email not valid', message: "veuillez ajouter une addresse email valide" }); }

            if (password === null || password === undefined || password === '') {
                return res.status(400).json({ error: "not password", message: "Le champ password n'est pas renseigné" });
            }

            if (await database.User.findOne({ where: { email: email } })) {
                return res.status(400).send("Cette adresse e-mail est déjà utilisée")
            }
            const user = await database.User.create({
                firstName: firstName, lastName: lastName, email: email, password: passwordtHash
            })
            return res.status(200).json({ user })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async updateUser(req, res) {
        const { firstName, lastName, password } = req.body
        const { id } = req.params

        try {
            await database.User.update({
                firstName: firstName, lastName: lastName
            }
                , { where: { id: Number(id) } })
            const userUpdate = await database.User.findOne({
                where: { id: Number(id) }
            })
            return res.status(200).json(userUpdate)

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params
        try {
            await database.User.destroy({ where: { id: Number(id) } })
            return res.status(200).json({ message: `id ${id} deleted` })

        } catch (error) {
            return res.status(500).json(error.message)
        }
    }


    static async forgotPassword(req, res) {
        const { email } = req.body;
        const { id } = req.params
        try {

            const user = await database.User.findOne({ where: { email: email } })
            if (!user)
                return res.status(400).send({ error: "User not found" })

            const token = crypto.randomBytes(20).toString("hex");

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await database.User.update({
                passwordResetToken: token,
                passwordResetExpires: now,
            }
                , { where: { id: Number(id) } })
            const userUpdate = await database.User.findOne({
                where: { id: Number(id) }
            })

            resetPassword({ email: email, firstName: user.firstName, lastName: user.fastName, token: token })

            // mailler.sendMail({
            //     to: email,
            //     from: "leonardo.kabongo@gmail.com",
            //     template: "resources/email/auth/forgot_password.html",
            //     context: { token }
            // }, (error) => {
            //     if (error)
            //         return res.status(400).send({ error: " Cannot send forgot password email" })
            //     return res.status(200).send("ok")
            // })

        } catch (error) {
            console.log(error)
            return res.status(400).json({ error: "Error on forgat password, try again" })
        }
    }
}

module.exports = UserController