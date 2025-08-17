import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignUp from './pages/SignUp.jsx';

import AdminDashboard from './pages/AdminDashboard.jsx';
import TesterDashboard from './pages/TesterDashboard.jsx';
import DeveloperDashboard from './pages/DeveloperDashboard.jsx';

import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';

import ViewTesters from './pages/ViewTesters.jsx';
import ViewDevelopers from './pages/ViewDevelopers.jsx';
import ManageProjects from './pages/ManageProjects.jsx';
import BugReports from './pages/BugReports.jsx';
import AddUser from './pages/AddUser.jsx';
import AssignProject from './pages/AssignProject.jsx';

import AdminBugDashboard from './pages/AdminBugDashboard.jsx';
import AssignedBugDeveloper from './pages/AssignedBugDeveloper.jsx';
import MyBugReportsTester from './pages/MyBugReportsTester.jsx';
import MyProjectsTester from './pages/MyProjectsTester.jsx';

import PrivateRoute from './routes/PrivateRoute.jsx';

import './App.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* 🔐 Admin Routes */}
        <Route path="/admin" element={<PrivateRoute requiredRole="ROLE_ADMIN" element={<AdminDashboard />} />} />
        <Route path="/viewtester" element={<PrivateRoute requiredRole="ROLE_ADMIN" element={<ViewTesters />} />} />
        <Route path="/viewdeveloper" element={<PrivateRoute requiredRole="ROLE_ADMIN" element={<ViewDevelopers />} />} />
        <Route path="/manageprojects" element={<PrivateRoute requiredRole="ROLE_ADMIN" element={<ManageProjects />} />} />
        <Route path="/bugreport" element={<PrivateRoute requiredRole="ROLE_ADMIN" element={<AdminBugDashboard />} />} />
        <Route path="/adduser" element={<PrivateRoute requiredRole="ROLE_ADMIN" element={<AddUser />} />} />
        <Route path="/assignproject" element={<PrivateRoute requiredRole="ROLE_ADMIN" element={<AssignProject />} />} />

        {/* 🧪 Tester Routes */}
        <Route path="/tester" element={<PrivateRoute requiredRole="ROLE_TESTER" element={<TesterDashboard />} />} />
        <Route path="/reportbug" element={<PrivateRoute requiredRole="ROLE_TESTER" element={<BugReports />} />} />
        <Route path="/mybugs" element={<PrivateRoute requiredRole="ROLE_TESTER" element={<MyBugReportsTester />} />} />
        <Route path="/myprojects" element={<PrivateRoute requiredRole="ROLE_TESTER" element={<MyProjectsTester/>} />} />

        {/* 👨‍💻 Developer Routes */}
        <Route path="/developer" element={<PrivateRoute requiredRole="ROLE_DEVELOPER" element={<DeveloperDashboard />} />} />
        <Route path="/assignedtasks" element={<PrivateRoute requiredRole="ROLE_DEVELOPER" element={<AssignedBugDeveloper />} />} />
      </Routes>
    </Router>
  );
}

export default App;
