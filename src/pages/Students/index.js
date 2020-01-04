import React, { useEffect, useState } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Form, Input } from '@rocketseat/unform';

import api from '~/services/api';

import {
  Container,
  Header,
  Search,
  Content,
  Table,
  RemoveButton,
  EditButton,
  Buttons,
} from './styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [updateStudent, setUpdateStudent] = useState(false);
  const [search, setSearch] = useState('');

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get(`students?q=${search}`);
      setStudents(response.data);
    }

    loadStudents();
  }, [search]);

  useEffect(() => {
    async function listStudent() {
      const response = await api.get(`students?q=${search}`);

      setStudents(response.data);
      setUpdateStudent(false);
    }
    listStudent();
  }, [search, updateStudent]);

  async function deleteStudent(id) {
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
        api.delete(`students/${id}`);
        Swal.fire(
          'Deletado!',
          'O estudante foi deletado com sucesso!',
          'success'
        );
        setUpdateStudent(true);
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
        <strong>Gerenciando alunos</strong>
        <div>
          <button type="button">
            <Link to="/students/create">
              <div>
                <MdAdd size={20} color="#FFF" />
              </div>
              CADASTRAR
            </Link>
          </button>
          <Form>
            <Search onSubmit={handleSearch}>
              <MdSearch size={16} color="#999" />
              <Input
                name="nameSearch"
                placeholder="Buscar aluno"
                onChange={handleSearch}
              />
            </Search>
          </Form>
        </div>
      </Header>
      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <Buttons>&nbsp;</Buttons>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td style={{ paddingLeft: '12px' }}>{student.age}</td>
                <Buttons>
                  <Link to={`/students/edit/${student.id}`}>
                    <EditButton>editar</EditButton>
                  </Link>
                  <RemoveButton onClick={() => deleteStudent(student.id)}>
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
