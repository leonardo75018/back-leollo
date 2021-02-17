const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;




const emailVerify = (email, res) => {
    if (!EMAIL_REGEX.test(email)) { return { error: 'email not valid', message: "veuillez ajouter une addresse email valide" }; }

}

const firstNameVerify = (firstName) => {
    return console.log("ok")
}

const lastNameVerify = (lastName) => {
    return console.log("ok")
}




module.exports = { emailVerify, firstNameVerify, lastNameVerify }





