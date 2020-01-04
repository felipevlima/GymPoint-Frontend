import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdClose } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import pt from 'date-fns/locale/pt';
import { format, addMonths } from 'date-fns';
import moment from 'moment';

import Box from '~/components/Box';
import DatePicker from '~/components/DatePicker';
import InputSelect from '~/components/InputSelect';
import InputSelectPlan from '~/components/InputSelectPlans';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/utils/format';

import { Container, Header, ColumnFilds, InLineFilds } from './styles';

export default function EnrollmentsForm() {
  const schema = Yup.object().shape({
    student: Yup.string().required('Aluno obrigatório'),
    plan: Yup.string().required('Aluno obrigatório'),
    start_date: Yup.date().required('Data obrigatória'),
  });

  const [students, setStudents] = useState({});
  const [student, setStudent] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});
  const [initialData, setInitialData] = useState({});

  async function loadPlans() {
    const response = await api
      .get('plans')
      .then(r => r.data)
      .then(d =>
        d.map(p => ({
          label: p.title,
          value: p.id,
          duration: p.duration,
          price: p.price,
          total_price: p.totalPrice,
        }))
      );

    setPlans(response);
  }

  async function loadStudents() {
    const response = await api
      .get('students')
      .then(r => r.data)
      .then(d =>
        d.map(s => ({
          label: s.name,
          value: s.id,
        }))
      );

    setStudents(response);
  }

  const end_date = useMemo(() => {
    if (!plan.duration) {
      return '';
    }
    const { duration } = plan;
    const formattedDate = format(
      addMonths(startDate, duration),
      "dd'/'MM'/'yyyy",
      {
        locale: pt,
      }
    );
    return formattedDate;
  }, [plan, startDate]);

  const formatDate = moment(startDate).toISOString();

  const totalPrice = useMemo(() => {
    if (!plan.total_price) {
      return '';
    }
    const { total_price } = plan;
    const format_Price = formatPrice(total_price);

    return format_Price;
  }, [plan]);

  useEffect(() => {
    loadPlans();
    loadStudents();

    setInitialData({
      end_date,
      totalPrice,
    });
  }, [end_date, startDate, totalPrice]);// eslint-disable-line

  async function handleSubmit() {
    const studentId = student.value;
    const planId = plan.value;

    try {
      await api.post('/enrollments', {
        student_id: studentId,
        plan_id: planId,
        start_date: formatDate,
      });
      toast.success('Matrícula realizada com sucesso!');
    } catch (erro) {
      toast.error('Matrícula já existe no sistema!');
    } finally {
      history.push('/enrollments');
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={initialData}>
        <Header>
          <strong>Cadastro de plano</strong>
          <div>
            <div>
              <Link to="/enrollments">
                <MdClose size={20} color="#FFF" />
                CANCELAR
              </Link>
            </div>
            <button type="submit" onClick={handleSubmit}>
              <MdCheck size={18} color="#FFF" />
              SALVAR
            </button>
          </div>
        </Header>
        <Box>
          <strong>Nome</strong>
          <InputSelect
            name="student"
            options={students}
            setChange={setStudent}
          />
          <InLineFilds>
            <ColumnFilds>
              <strong>Plano</strong>
              <InputSelectPlan
                name="plan"
                options={plans}
                setChange={setPlan}
              />
            </ColumnFilds>
            <ColumnFilds>
              <strong>Data</strong>
              <>
                <DatePicker name="date" setChange={setStartDate} />
              </>
            </ColumnFilds>
            <ColumnFilds>
              <strong>Data final</strong>
              <Input ntype="data" name="end_date" readOnly disabled />
            </ColumnFilds>
            <ColumnFilds>
              <strong>Valor Total</strong>
              <Input type="text" name="totalPrice" readOnly disabled />
            </ColumnFilds>
          </InLineFilds>
        </Box>
      </Form>
    </Container>
  );
}
