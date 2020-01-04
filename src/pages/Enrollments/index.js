import React, { useEffect, useState } from 'react';
import { MdAdd, MdSearch, MdCheckCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  Header,
  Content,
  Table,
  RemoveButton,
  EditButton,
  Buttons,
  Search,
} from './styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [updateEnrollments, setUpdateEnrollments] = useState(false);
  const [search, setSearch] = useState('');

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function listEnrollments() {
      const response = await api.get(`enrollments?q=${search}`);
      const apiFilter = response.data;

      setEnrollments(apiFilter);
    }
    listEnrollments();
  }, [enrollments.student, search]);

  useEffect(() => {
    async function listEnrollments() {
      const response = await api.get(`enrollments?q=${search}`);
      const apiFilter = response.data;

      setEnrollments(apiFilter);
      setUpdateEnrollments(false);
    }
    listEnrollments();
  }, [search, updateEnrollments]);

  async function deleteEnrollment(id) {
    MySwal.fire({
      title: 'Você tem certeza?',
      text: 'Você não irá poder desfazer essa alteração!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar',
    }).then(result => {
      if (result.value) {
        api.delete(`enrollments/${id}`);
        Swal.fire(
          'Deletado!',
          'A matricula foi deletado com sucesso!',
          'success'
        );
        setUpdateEnrollments(true);
      }
    });
  }

  const handleSearch = event => {
    const { value } = event.target;

    if (value.length >= 2 || value.length === 0) {
      setSearch(event.target.value);
    }
  };

  return (
    <Container>
      <Header>
        <strong>Gerenciando matrículas</strong>
        <div>
          <button type="button">
            <Link to="/enrollments/create">
              <div>
                <MdAdd size={20} color="#FFF" />
              </div>
              CADASTRAR
            </Link>
          </button>
          <Search>
            <MdSearch size={16} color="#999" />
            <input
              type="text"
              placeholder="Buscar matrícula"
              onChange={handleSearch}
            />
          </Search>
        </div>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th style={{ textAlign: 'center' }}>PLANO</th>
              <th style={{ textAlign: 'center' }}>INÍCIO</th>
              <th style={{ textAlign: 'center' }}>TÉRMINO</th>
              <th style={{ textAlign: 'center' }}>ATIVA</th>
              <Buttons style={{ textAlign: 'center' }}>&nbsp;</Buttons>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student.name}</td>
                <td style={{ textAlign: 'center' }}>{enrollment.plan.title}</td>
                <td style={{ textAlign: 'center' }}>
                  {format(
                    parseISO(enrollment.start_date),
                    `dd 'de' MMMM 'de' yyyy`,
                    {
                      locale: pt,
                    }
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {format(
                    parseISO(enrollment.end_date),
                    `dd 'de' MMMM 'de' yyyy`,
                    {
                      locale: pt,
                    }
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {enrollment.active ? (
                    <MdCheckCircle size={20} color="#42cb59" />
                  ) : (
                    <MdCheckCircle size={20} color="#dddddd" />
                  )}
                </td>
                <Buttons style={{ textAlign: 'center' }}>
                  <Link to={`/enrollments/edit/${enrollment.id}`}>
                    <EditButton>editar</EditButton>
                  </Link>
                  <RemoveButton onClick={() => deleteEnrollment(enrollment.id)}>
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
