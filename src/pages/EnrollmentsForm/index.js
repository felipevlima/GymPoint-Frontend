/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useMemo } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import { format, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { MdCheck, MdClose } from 'react-icons/md';
import DatePicker from '~/components/DatePicker';
import InputAsyncSelect from '~/components/InputSelect';
import InputSelectPlans from '~/components/InputSelectPlans';
import { formatPrice } from '~/utils/format';

import api from '../../services/api';
import history from '../../services/history';

import 'react-datepicker/dist/react-datepicker.css';

import Box from '~/components/Box';

import { Nav, InputFilds } from './styles';

export default function EnrollmentsForm() {
  const [plans, setPlans] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [plan, setPlan] = useState({});
  const [initialData, setInitialData] = useState({});

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório!'),
    plan_name: Yup.string().required('Plano é obrigatório!'),
    start_date: Yup.string().required('Data é obrigatoria!'),
  });

  async function handleSubmit(data) {
    try {
      await api.post('/enrollments', {
        student_id: data.student.id,
        plan_id: data.plan.id,
        start_date: data.start_date,
      });
      toast.success('Matrícula realizada com sucesso!');
      history.push('/enrollments');
    } catch (erro) {
      toast.error(erro.response.data.error);
    }
  }

  async function loadOptions(inputValue) {
    const response = await api
      .get('students', {
        params: { name: `${inputValue}` },
      })
      .then(r => r.data)
      .then(r =>
        r.map(student => ({
          label: student.name,
          value: student.id,
        }))
      );
    return response;
  }

  async function loadPlans() {
    const response = await api
      .get('plans', {
        params: { page: 1, per_page: 100 },
      })
      .then(r => r.data)
      .then(d =>
        d.map(p => ({
          label: p.title,
          value: p.id,
          duration: p.duration,
          price: p.price,
        }))
      );

    setPlans(response);
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

  const totalPrice = useMemo(() => {
    if (!plan.price) return '';

    return formatPrice(Number(plan.duration) * Number(plan.price));
  }, [plan.duration, plan.price]);

  useEffect(() => {
    loadPlans();

    setInitialData({
      end_date,
      totalPrice,
    });
  }, [end_date, startDate, totalPrice]);

  return (
    <Form schema={schema} onSubmit={handleSubmit} initialData={initialData}>
      <Nav>
        <strong>Cadastro de matrícula</strong>
        <div>
          <div>
            <Link to="/enrollments">
              <MdClose size={20} color="#FFF" />
              CANCELAR
            </Link>
          </div>
          <button type="submit">
            <MdCheck size={18} color="#FFF" />
            SALVAR
          </button>
        </div>
      </Nav>

      <Box>
        <InputAsyncSelect
          name="student"
          loadOptions={loadOptions}
          label="ALUNO"
        />

        <InputFilds>
          <div className="formline">
            <label>
              <strong>PLANO</strong>
              <InputSelectPlans
                name="plan"
                options={plans}
                setChange={setPlan}
              />
            </label>
            <label>
              <strong>DATA DE INÍCIO</strong>
              <DatePicker name="start_date" setChange={setStartDate} />
            </label>
            <label>
              <strong>DATA DE TÉRMINO</strong>
              <Input name="end_date" readOnly className="readOnly" />
            </label>
            <label>
              <strong>VALOR FINAL</strong>
              <Input name="totalPrice" readOnly className="readOnly" />
            </label>
          </div>
        </InputFilds>
      </Box>
    </Form>
  );
}
