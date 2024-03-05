const User = require('./models/user'); 

async function cadastrarUsuario(fullName, cpf, email, password, userType) {
  try {
    // Verificar se o CPF ou e-mail já existem na "base de dados"
    const existingUser = await User.findOne({ $or: [{ cpf }, { email }] });
    if (existingUser) {
      throw new Error('CPF ou e-mail já cadastrados.');
    }

    const newUser = new User({
      fullName,
      cpf,
      email,
      password,
      balance: 0,
      userType,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    throw new Error(`Erro ao cadastrar usuário: ${error.message}`);
  }
}

async function consultarSaldo(cpf) {
  try {
    const user = await User.findOne({ cpf });
    return user;
  } catch (error) {
    throw new Error(`Erro ao consultar saldo: ${error.message}`);
  }
}

async function atualizarSaldo(usuario, valor) {
  try {
    usuario.balance += valor;
    await usuario.save();
  } catch (error) {
    throw new Error(`Erro ao atualizar saldo: ${error.message}`);
  }
}

module.exports = { cadastrarUsuario, consultarSaldo, atualizarSaldo };
