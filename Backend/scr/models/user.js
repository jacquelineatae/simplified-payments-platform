const mongoose = require('mongoose');

// Definindo o esquema do usuário
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  userType: {
    type: String,
    enum: ['comum', 'lojista'], 
    required: true,
  },
});

// Criando o modelo 'User' com o esquema definido
const User = mongoose.model('User', userSchema);

module.exports = User;
