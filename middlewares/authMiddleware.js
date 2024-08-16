const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const autHeader = req.headers['authorization'];
    const token = autHeader && autHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" });
    }

    try {
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        console.log("Erro ao verificar o token:", error);
        res.status(400).json({ msg: "Token inválido!" });
    }
};
