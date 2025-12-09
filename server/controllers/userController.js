const userServices = require("../services/userServices");

exports.register = async (req, res) => {
    try {
        await userServices.createUser(req.body);

        res.render("login", { regtext: "Conta registrada com sucesso! Faça login para acessar", color: "green" })
    }
    catch (err) {
        res.status(err.status).render("login", { regtext: `Houve um erro ao registrar sua conta - ${err}`, color: "red" });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await userServices.login(req.body);
        req.session.username = user.username;
        req.session.userId = user._id;
        res.redirect("/?login=true");
    }
    catch (err) {
        res.status(err.status).render("login", { regtext: `Erro ao fazer login - ${err}`, color: "red" });
    }
}

exports.getLoginPage = (req, res) => {
    res.render('login', { regtext: "", color: "green" });
}