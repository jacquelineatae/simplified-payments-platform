const express = require('express');
const router = express.Router();
const axios = require('axios');
const { consultarSaldo, atualizarSaldo } = require('./utils');

// Rota para transferência
app.post('/api/transfer', async (req, res) => {
    try {
      const { senderCpf, receiverCpf, amount } = req.body;
  
      // Encontrar o usuário remetente
      const sender = users.find(user => user.cpf === senderCpf);
      if (!sender || sender.balance < amount) {
        return res.status(400).json({ message: 'Saldo insuficiente ou usuário não encontrado.' });
      }
  
      // Verificar se o remetente é um lojista
      if (sender.userType === 'lojista') {
        return res.status(400).json({ message: 'Lojistas não podem enviar dinheiro.' });
      }
  
      // Consultar serviço autorizador externo
      const authorizationResponse = await axios.get('https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc');
      if (!authorizationResponse.data.authorized) {
        return res.status(400).json({ message: 'Transferência não autorizada.' });
      }
  
      // Atualizar saldos
      sender.balance -= amount;
  
      // Encontrar o usuário destinatário
      const receiver = users.find(user => user.cpf === receiverCpf);
      if (!receiver) {
        return res.status(400).json({ message: 'Usuário destinatário não encontrado.' });
      }
  
      // Lojistas só podem receber transferências
      if (receiver.userType === 'lojista') {
        return res.status(400).json({ message: 'Somente lojistas podem receber transferências.' });
      }
  
      receiver.balance += amount;
  
      // Simulação de envio de notificação
      const notificationResponse = await axios.post('https://run.mocky.io/v3/54dc2cf1-3add-45b5-b5a9-6bf7e7f1f4a6');
  
      // Verificar se a notificação foi enviada com sucesso
      if (notificationResponse.data.success) {
        res.status(200).json({ message: 'Transferência concluída com sucesso. Notificação enviada.' });
      } else {
        res.status(200).json({ message: 'Transferência concluída com sucesso. Falha ao enviar notificação.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao processar a transferência: ' + error.message });
    }
  });

module.exports = router;  