import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { MdCheck, MdClose } from 'react-icons/md';
import { formatPrice } from '~/utils/format';

import { Container, Nav, FormInserts, NumbersDiv, StringDiv } from './styles';
import Mask from '~/components/InputMask';
import api from '../../services/api';

import history from '../../services/history';

export default function PlansForm() {
  const schema = Yup.object().shape({
    title: Yup.string().required('O títuto é obrigatório'),
    duration: Yup.string().required('A duração é obrigatória'),
    price: Yup.string().required('O preço é obrigatório'),
  });

  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    setTotalPrice(formatPrice(price * duration));
  }, [price, duration]);

  async function handleSubmit(data) {
    await api.post('/plans', data);
    history.push('/plans');
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Nav>
          <strong>Cadastro de plano</strong>
          <div>
            <div>
              <Link to="/plans">
                <MdClose size={20} color="#FFF" />
                CANCELAR
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
                placeholder="0"
                onChange={e => setDuration(e.target.value)}
              />
            </div>

            <div>
              <strong>PREÇO MENSAL</strong>
              <Mask name="price" prefix="R$" setChange={setPrice} />
            </div>

            <div>
              <strong>PREÇO TOTAL</strong>
              <Input name="totalPrice" disabled placeholder={totalPrice} />
            </div>
          </NumbersDiv>
        </FormInserts>
      </Form>
    </Container>
  );
}
