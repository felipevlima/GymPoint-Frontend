import React, { useEffect, useState } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  // const [name, setName] = useState('');

  async function loadStudents() {
    const response = await api.get('students');
    const apiFilter = response.data;
    setStudents(apiFilter);
  }

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    async function listStudent() {
      const response = await api.get('students');
      const apiFilter = response.data;

      setStudents(apiFilter);
      setUpdateStudent(false);
    }
    listStudent();
  }, [updateStudent]);

  async function deleteStudent(id) {
    try {
      await api.delete(`students/${id}`);
      toast.success('Usuário deletado');
    } catch (erro) {
      toast.error('Usuário está com um plano ativo');
    } finally {
      setUpdateStudent(true);
    }
  }

  function handleSearch({ nameSearch }) {
    // setName(nameSearch);
    loadStudents();
  }

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
              <Input name="nameSearch" placeholder="Buscar aluno" />
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
