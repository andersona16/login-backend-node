const User = require('../models/User');
const mongoose = require('mongoose');

exports.getUserById = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: "ID inválido!" });
    }

    try {
        const user = await User.findById(id, "-password");
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        res.status(500).json({ msg: "Erro ao buscar o usuário." });
    }
};
