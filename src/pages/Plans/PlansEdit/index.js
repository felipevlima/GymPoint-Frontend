import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';

import { formatPrice } from '~/utils/format';

import { Container, Nav, FormInserts, NumbersDiv, StringDiv } from './styles';
import Mask from '~/components/InputMask';

import api from '~/services/api';

import history from '~/services/history';

export default function PlansEdit({ match }) {
  const { id } = match.params;

  const [plan, setPlan] = useState();
  const [price, setPrice] = useState();
  const [duration, setDuration] = useState();
  const [totalPrice, setTotalPrice] = useState('');

  async function handleSubmit(data) {
    await api.put(`/plans/${id}`, data);
    history.push('/plans');
  }

  useEffect(() => {
    setTotalPrice(formatPrice(price * duration));
  }, [price, duration]);

  useEffect(() => {
    async function getPlan() {
      const response = await api.get(`plans/${id}`);

      setPlan(response.data);
      setPrice(response.data.price);
      setDuration(response.data.duration);
    }
    getPlan();
  }, [id]);

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={plan}>
        <Nav>
          <strong>EDIÇÃO DE PLANO</strong>
          <div>
            <div>
              <Link to="/plans">
                <MdChevronLeft size={20} color="#FFF" />
                VOLTAR
              </Link>
            </div>
            <button type="submit" onClick={handleSubmit}>
              <MdCheck size={18} color="#FFF" />
              SALVAR
            </button>
          </div>
        </Nav>
        <FormInserts>
          <StringDiv>
            <div>
              <div>
                <strong>TÍTULO DO PLANO</strong>
                <Input name="title" placeholder="Diamond" />
              </div>
            </div>
          </StringDiv>

          <NumbersDiv>
            <div>
              <strong>DURAÇÃO (em meses)</strong>
              <Input
                name="duration"
                onChange={e => setDuration(e.target.value)}
              />
            </div>

            <div>
              <strong>PREÇO MENSAL</strong>
              <Mask name="price" prefix="R$" setChange={setPrice} />
            </div>

            <div>
              <strong>PREÇO TOTAL</strong>
              <Input name="" disabled placeholder={totalPrice} />
            </div>
          </NumbersDiv>
        </FormInserts>
      </Form>
    </Container>
  );
}
