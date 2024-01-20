import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';

import Root from './Components/root/root';
import NotFound from "./Components/loadingError/unauthorizedComponent";

import HomeComponent from "./Components/home/home";
import LoginComponent from "./Components/login/loginComponent";

import ExpenseGestionComponent from "./Components/expenses/expenseGestionComponent";
import ExpenseSaisieComponent from "./Components/expenses/expenseSaisieComponent";
import MissionComponent from './Components/missions/missionComponent';
import MissionWaitingComponent from "./Components/validating/missionWaitingComponent";
import PrimesComponent from "./Components/primes/primesComponent";
import PlanningComponent from "./Components/planning/planningComponent";
import MotifComponent from "./Components/motifs/motifComponent";
import NatureComponent from "./Components/natures/natureComponent";
import UserComponent from "./Components/users/userComponent";
import UserFormAdd from "./Components/users/add/UserFormAdd";
import UserFormUpd from "./Components/users/update/UserFormUpdate";
import { CookiesProvider } from 'react-cookie';
import { UserProvider } from './Contexts/UserContext';
import './index.css';
import Home from './Components/home/home';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/" element={<Root />}>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/missions" element={<MissionComponent />} />
        <Route path="/mission/waiting" element={<MissionWaitingComponent />} />
        <Route path="/planning" element={<PlanningComponent />} />
        <Route path="/primes" element={<PrimesComponent />} />
        <Route path="/motifs" element={<MotifComponent />} />
        <Route path="/natures" element={<NatureComponent />} />
        <Route path="/expenses" element={<ExpenseGestionComponent />} />
        <Route path="/expenses/:idMission" element={<ExpenseSaisieComponent />} />
        <Route path="/users" element={<UserComponent />} />
        <Route path="/users/add" element={<UserFormAdd />} />
        <Route path="/users/:idUser" element={<UserFormUpd />} /> 
      </Route>

      <Route path="*" element={<NotFound />} />
    </>
  )
);

root.render(

  <CookiesProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </CookiesProvider>

);

