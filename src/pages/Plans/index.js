import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { formatPrice } from '../../utils/format';

import api from '~/services/api';

import {
  Container,
  Header,
  Content,
  Table,
  RemoveButton,
  EditButton,
  Buttons,
} from './styles';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [updatePlans, setUpdatePlans] = useState(false);

  useEffect(() => {
    async function listPlans() {
      const response = await api.get('plans');
      const apiFilter = response.data;
      const data = apiFilter.map(plan => ({
        ...plan,
        durationFormatted:
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`,
        priceFormatted: formatPrice(plan.price),
      }));
      setPlans(data);
    }
    listPlans();
  }, []);

  useEffect(() => {
    async function listPlans() {
      const response = await api.get('plans');
      const apiFilter = response.data;
      const data = apiFilter.map(plan => ({
        ...plan,
        durationFormatted:
          plan.duration === 1
            ? `${plan.duration} mês`
            : `${plan.duration} meses`,
        priceFormatted: formatPrice(plan.price),
      }));
      setPlans(data);
      setUpdatePlans(false);
    }
    listPlans();
  }, [updatePlans]);

  async function deletePlans(id) {
    try {
      await api.delete(`plans/${id}`);
      toast.success('Plano deletado com sucesso!');
    } catch (erro) {
      toast.error('Plano contem usuários atívos!');
    } finally {
      setUpdatePlans(true);
    }
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando planos</strong>
        <div>
          <button type="button">
            <Link to="/plans/create">
              <div>
                <MdAdd size={20} color="#FFF" />
              </div>
              CADASTRAR
            </Link>
          </button>
        </div>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th style={{ textAlign: 'center' }}>DURAÇÃO</th>
              <th style={{ textAlign: 'center' }}>VALOR p/ MÊS</th>
              <Buttons>&nbsp;</Buttons>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td style={{ textAlign: 'center' }}>
                  {plan.durationFormatted}
                </td>
                <td style={{ textAlign: 'center' }}>{plan.priceFormatted}</td>
                <Buttons>
                  <Link to={`/plans/edit/${plan.id}`}>
                    <EditButton>editar</EditButton>
                  </Link>
                  <RemoveButton onClick={() => deletePlans(plan.id)}>
                    excluir
                  </RemoveButton>
                </Buttons>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
}
