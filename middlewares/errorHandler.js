module.exports = function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ msg: "Ocorreu um erro interno no servidor!" });
};
