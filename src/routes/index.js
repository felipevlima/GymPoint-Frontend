import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';

import Enrollments from '../pages/Enrollments';
import EnrollmentsForm from '../pages/EnrollmentsForm';
import EnrollmentsEdit from '../pages/EnrollmentsEdit';

import HelpOrders from '../pages/HelpOrders';

import Plans from '../pages/Plans';
import PlansForm from '../pages/PlansForm';
import PlansEdit from '../pages/PlansEdit';

import Students from '../pages/Students';
import StudentsForm from '../pages/StudentsForm';
import StudentsEdit from '../pages/StudentsEdit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students/create" component={StudentsForm} isPrivate />
      <Route path="/students/edit/:id" component={StudentsEdit} isPrivate />
      <Route path="/students" exact component={Students} isPrivate />

      <Route path="/plans/create" component={PlansForm} isPrivate />
      <Route path="/plans/edit/:id" component={PlansEdit} isPrivate />
      <Route path="/plans" exact component={Plans} isPrivate />

      <Route path="/enrollments/create" component={EnrollmentsForm} isPrivate />
      <Route
        path="/enrollments/edit/:id"
        component={EnrollmentsEdit}
        isPrivate
      />
      <Route path="/enrollments" exact component={Enrollments} isPrivate />

      <Route path="/helporders" component={HelpOrders} isPrivate />

      {/* Rota de error */}
      {/* <Route path="/" component={() => <h1>404</h1>} /> */}
    </Switch>
  );
}
