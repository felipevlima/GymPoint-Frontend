import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdClose } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import moment from 'moment';

import { parseISO, format, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/utils/format';

import Box from '~/components/Box';
import DatePicker from '~/components/DatePicker';
import InputSelect from '~/components/InputSelect';

import {
  Container,
  Header,
  ColumnFilds,
  InLineFilds,
  InputSelectPlan,
} from './styles';

export default function EnrollmentsEdit({ match }) {
  const { id } = match.params;

  const [enrollment, setEnrollment] = useState(null);
  const [students, setStudents] = useState({});
  const [student, setStudent] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const [plans, setPlans] = useState({});
  const [plan, setPlan] = useState({});

  const [initialData, setInitialData] = useState({});
  const [initialDate, setInicialDate] = useState(new Date());

  async function loadEnrrolment(id) {
    const response = await api.get(`enrollments/${id}`);
    const { data } = response;

    const formattedDate = format(parseISO(data.start_date), `dd'/'MM'/'yyyy`);

    setEnrollment({
      ...data,
      start_date: formattedDate,
    });

    const studentLoaded = {
      value: data.student.id,
      label: data.student.name,
    };

    const pl = {
      value: response.data.plan.id,
      label: response.data.plan.title,
      price: response.data.plan.price,
      duration: response.data.plan.duration,
    };

    setStartDate(formattedDate);
    setStudent(studentLoaded);
    setPlan(pl);
  }

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
    const formattedDate = addMonths(startDate, duration);

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
    loadEnrrolment(id);

    // loadRegistrationLocated();

    loadPlans();
    loadStudents();

    setInitialData({
      end_date,
      totalPrice,
    });
  }, [end_date, id, totalPrice]);

  async function handleSubmit() {
    const studentId = student.value;
    const planId = plan.value;

    try {
      await api.post('/enrollments', {
        student_id: studentId,
        plan_id: planId,
        start_date: formatDate,
      });
      // toast.success('Matrícula realizada com sucesso!');
    } catch (erro) {
      // toast.error('Matrícula já existe no sistema!');
    } finally {
      history.push('/enrollments');
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema="" initialData={initialData}>
        <Header>
          <strong>Edição de plano</strong>
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
            placeholder="Digite o nome do aluno..."
            name="student"
            value={student}
            options={students}
            setChange={setStudent}
          />
          <InLineFilds>
            <ColumnFilds>
              <strong>Plano</strong>
              <InputSelectPlan
                placeholder="Escolha o plano..."
                name="plan"
                value={plan}
                options={plans}
                setChange={setPlan}
              />
            </ColumnFilds>
            <ColumnFilds>
              <strong>Data</strong>
              <>
                <DatePicker
                  name="date"
                  selected={initialDate}
                  onChange={date => setStartDate(date)}
                />
              </>
            </ColumnFilds>
            <ColumnFilds>
              <strong>Data final</strong>
              <Input type="data" name="end_date" readOnly disabled />
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
