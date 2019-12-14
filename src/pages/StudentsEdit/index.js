import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdChevronLeft } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container, Nav, FormInserts, NumbersDiv, StringDiv } from './styles';
import api from '../../services/api';

import history from '../../services/history';

export default function StudentsEdit({ match }) {
  const { id } = match.params;

  const [student, setStudent] = useState();

  async function handleSubmit(data) {
    await api.put(`/students/${id}`, data);
    history.push('/students');
  }

  useEffect(() => {
    async function getStudent() {
      const response = await api.get(`students/${id}`);

      setStudent(response.data);
    }
    getStudent();
  }, [id]);

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={student}>
        <Nav>
          <strong>Edição de aluno</strong>
          <div>
            <div>
              <Link to="/students">
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
                <strong>NOME COMPLETO</strong>
                <Input name="name" placeholder="John Doe" />
              </div>

              <div>
                <strong>ENDEREÇO DE E-MAIL</strong>
                <Input
                  name="email"
                  type="email"
                  placeholder="exemplo@dominio.com"
                />
              </div>
            </div>
          </StringDiv>

          <NumbersDiv>
            <div>
              <strong>IDADE</strong>
              <Input name="age" />
            </div>

            <div>
              <strong>PESO (em kg)</strong>
              <Input name="weight" />
            </div>

            <div>
              <strong>ALTURA</strong>
              <Input name="height" />
            </div>
          </NumbersDiv>
        </FormInserts>
      </Form>
    </Container>
  );
}

// StudentsEdit.propTypes = {
//   id: PropTypes.element,
// };
