import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Popup from 'reactjs-popup';
import { Input, Form } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import history from '../../services/history';

import { Container, Header, Help, Box } from './styles';
import api from '../../services/api';

export default function HelpOrders() {
  const schema = Yup.object().shape({
    name: Yup.string(),
    id: Yup.string(),
    answer: Yup.string().required('Resposta é obrigatória!'),
  });

  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function listHelpOrders() {
      const response = await api.get('admin/help-orders');
      const apiFilter = response.data.helpOrders;
      setHelpOrders(apiFilter);
    }
    listHelpOrders();
  }, []);

  async function handleAwnser(data) {
    await api.post(`/admin/help-orders/${data.id}/answer`, data);
    toast.success('Resposta enviada com sucesso');
    history.push('/helporders');
  }

  return (
    <Container>
      <Header>Pedidos de auxílio</Header>
      <Box>
        {helpOrders.length === 0 ? (
          <strong className="nohelp">Sem pedidos de auxílio no momento</strong>
        ) : (
          helpOrders.map(help => (
            <Help key={help.id}>
              <li>{help.student.name}</li>

              <div>
                <Popup
                  trigger={
                    <button type="button" className="button">
                      responder
                    </button>
                  }
                  modal
                  closeOnDocumentClick
                >
                  <div className="modal">
                    <Form
                      initialData={help}
                      onSubmit={handleAwnser}
                      schema={schema}
                    >
                      <div>
                        <div>
                          <strong>ALUNO:</strong>
                          <Input
                            name="name"
                            disabled
                            placeholder={help.student.name}
                            // value={help.student.name}
                          />
                        </div>
                        <div>
                          <strong>Numero da pergunta:</strong>
                          <Input
                            name="id"
                            disabled
                            placeholder={help.id}
                            // value={help.id}
                          />
                        </div>
                      </div>
                      <strong>PERGUNTA DO ALUNO</strong>

                      <p>{help.question}</p>
                      <strong>SUA RESPOSTA</strong>

                      <Input
                        name="answer"
                        multiline
                        placeholder="Escreva sua resposta aqui..."
                      />
                      <button type="submit">ENVIAR RESPOSTA</button>
                    </Form>
                  </div>
                </Popup>
              </div>
            </Help>
          ))
        )}
      </Box>
    </Container>
  );
}
