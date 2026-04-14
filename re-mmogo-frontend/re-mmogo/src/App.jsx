import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';

import Home from './pages/Home.jsx';
import Register from './Register/Register.jsx';
import EnrollMember from './EnrollMember/EnrolMember.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';

import './index.css';

function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      {!isHome && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/enroll-member" element={<EnrollMember />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}