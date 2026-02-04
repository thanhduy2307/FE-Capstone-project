import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Login from './pages/login/index.jsx';
import HomePage from './pages/home/index.jsx';
import Unauthorized from './pages/unauthorized/index.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import AdminDashboard from './pages/admin-dashboard/index.jsx';
import AdminTheses from './pages/admin-theses/index.jsx';
import AdminPeriods from './pages/admin-periods/index.jsx';
import AdminLecturers from './pages/admin-lecturers/index.jsx';
import AdminStudents from './pages/admin-students/index.jsx';
import SupervisorLayout from './components/SupervisorLayout.jsx';
import SupervisorDashboard from './pages/supervisor-dashboard/index.jsx';
import SupervisorTheses from './pages/supervisor-theses/index.jsx';
import CoordinatorLayout from './components/CoordinatorLayout.jsx';
import CoordinatorDashboard from './pages/coordinator-dashboard/index.jsx';
import CoordinatorTheses from './pages/coordinator-theses/index.jsx';
import ReviewerLayout from './components/ReviewerLayout.jsx';
import ReviewerDashboard from './pages/reviewer-dashboard/index.jsx';
import ReviewerTheses from './pages/reviewer-theses/index.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes - Protected with role restriction */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="theses" element={<AdminTheses />} />
          <Route path="periods" element={<AdminPeriods />} />
          <Route path="lecturers" element={<AdminLecturers />} />
          <Route path="students" element={<AdminStudents />} />
        </Route>
        
        {/* Supervisor Routes - Protected with role restriction */}
        <Route
          path="/supervisor"
          element={
            <ProtectedRoute allowedRoles={['supervisor']}>
              <SupervisorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SupervisorDashboard />} />
          <Route path="theses" element={<SupervisorTheses />} />
        </Route>
        
        {/* Coordinator Routes - Protected with role restriction */}
        <Route
          path="/coordinator"
          element={
            <ProtectedRoute allowedRoles={['coordinator']}>
              <CoordinatorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CoordinatorDashboard />} />
          <Route path="theses" element={<CoordinatorTheses />} />
        </Route>
        
        {/* Reviewer Routes - Protected with role restriction */}
        <Route
          path="/reviewer"
          element={
            <ProtectedRoute allowedRoles={['reviewer']}>
              <ReviewerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ReviewerDashboard />} />
          <Route path="theses" element={<ReviewerTheses />} />
        </Route>
        
        {/* Catch all - redirect to home or login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
