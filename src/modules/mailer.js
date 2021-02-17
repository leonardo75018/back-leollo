
const nodemailer = require("nodemailer");
const smtp_config = require("../config/smtp.json")



module.exports = function sendPassword(email, fistName, lastName, identifiant, password) {

    const transporter = nodemailer.createTransport({
        host: smtp_config.host,
        port: smtp_config.port,
        secure: false,
        auth: {
            user: smtp_config.user,
            pass: smtp_config.pass
        },
        tls: {
            rejectUnauthorized: false
        }

    });


    async function run() {
        const mailSend = await transporter.sendMail({
            from: "leonardo.nodemon@gmail.com",
            to: `${email}`,
            subject: 'Identifiant Mariage.online',
            html: `<p>Bonjour ${fistName} ${lastName}, <br> 
                    Bienvenue sur <a href="http://localhost:3000/mariage.online/login"> Mariage.oneline </a> <br> 
                    Notre equipe travaille en ce momment sur la mise en place de vous photos. 
                    <br><br>
                  
                   Veuillez trouver ci-dessous les identifiants vous permettant de vous y connecter:  <br> <br> 

                   Identifiant :  ${identifiant}  <br> 
                   Mot de passe: ${password}  <br> <br> <br> 
                   L'équipe Mariage.online vous remercie de votre confiance,
                   
                   </p >`
        })
        // console.log(mailSend)

    }

    run()
}


























// const path = require("path")
// const nodemailer = require("nodemailer")
// const hbs = require('nodemailer-express-handlebars')


// const { host, port, user, pass } = require("../config/mail.json");
// const { extName } = require("path");

// const transport = nodemailer.createTransport({
//     host,
//     port,
//     auth: { user, pass },
// });

// const handlebarOptions = {
//     viewEngine: "handlebars",
//     viwPath: path.resolve("./src/resources/mail/"),
//     extName: ".html"
// }


// transport.use("compile", hbs, handlebarOptions);



// module.exports = transport;