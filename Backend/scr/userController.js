const express = require('express');
const router = express.Router();
const { cadastrarUsuario } = require('./utils');

// Rota para cadastrar um usuário
router.post('/', (req, res) => {
  try {
    const { fullName, cpf, email, password, userType } = req.body;
    const newUser = cadastrarUsuario(fullName, cpf, email, password, userType);
    res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
