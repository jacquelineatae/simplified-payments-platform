const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./userController');
const transferController = require('./transferController');

// Configuração do Mongoose
mongoose.connect('url_de_conexao_com_o_MongoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB!');
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/api/users', userController);
app.use('/api/transfer', transferController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
