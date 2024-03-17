import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';

import Root from './Components/root/root';
import Unauthorized from "./Components/Modules/loadingError/unauthorizedComponent";

import HomeComponent from "./Components/Pages/home/home";
import LoginComponent from "./Components/Pages/login/loginComponent";

import ExpenseGestionComponent from "./Components/Pages/expenses/expenseGestionComponent";
import ExpenseSaisieComponent from "./Components/Pages/expenses/expenseSaisieComponent";
import MissionComponent from './Components/Pages/missions/missionComponent';
import MissionWaitingComponent from "./Components/Pages/validating/missionWaitingComponent";
import PrimesComponent from "./Components/Pages/primes/primesComponent";
import PlanningComponent from "./Components/Pages/planning/planningComponent";
import MotifComponent from "./Components/Pages/motifs/motifComponent";
import NatureComponent from "./Components/Pages/natures/natureComponent";
import UserComponent from "./Components/Pages/users/userComponent";
import UserFormAdd from "./Components/Pages/users/add/UserFormAdd";
import UserFormUpd from "./Components/Pages/users/update/UserFormUpdate";
import { CookiesProvider } from 'react-cookie';
import { UserProvider } from './Contexts/UserContext';
import RoleGuard from './Components/root/guards/RoleGuard';
import LoginGuard from './Components/root/guards/LoginGuard'

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginComponent />}/>
      <Route path="/"  element={<Root />}>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/missions" element={<MissionComponent />} />
        <Route path="/mission/waiting" element={<MissionWaitingComponent />} />
        <Route path="/planning" element={<PlanningComponent />} />
        <Route path="/primes" element={<PrimesComponent />} />
        <Route path="/motifs" element={<RoleGuard allowedRoles={[3, 2]}><MotifComponent /></RoleGuard>}/>
        <Route path="/natures" element={<RoleGuard allowedRoles={[3, 2]}><NatureComponent /></RoleGuard>}/>
        <Route path="/expenses" element={<ExpenseGestionComponent />} />
        <Route path="/expenses/:idMission" element={<ExpenseSaisieComponent />} />
        <Route path="/users" element={<RoleGuard allowedRoles={[3]}><UserComponent /></RoleGuard>} />
        <Route path="/users/add" element={<RoleGuard allowedRoles={[3]}><UserFormAdd /></RoleGuard>} />
        <Route path="/users/:idUser" element={<RoleGuard allowedRoles={[3]}><UserFormUpd /></RoleGuard>}/> 
      </Route>
      <Route path="/unauthorized" element={<LoginGuard ><Unauthorized /></LoginGuard>} />
      <Route path="*" element={<LoginGuard ><Unauthorized /></LoginGuard>} />
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

