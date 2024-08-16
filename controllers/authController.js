const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    // Validations...

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: passwordHash });
    try {
        await user.save();
        res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro no servidor, tente novamente mais tarde!" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    // Validations...

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return res.status(401).json({ msg: "Senha inválida!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' });
    res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
};
