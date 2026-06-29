import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/protected/ProtectedRoute';

import Dashboard from './pages/Dashboard/Dashboard';
import Properties from './pages/Properties/Properties';
import PropertyDetails from './pages/Properties/PropertyDetails';
import Tenants from './pages/Tenants/Tenants';
import Maintenance from './pages/Maintenance/Maintenance';
import Financials from './pages/Financials/Financials';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import AddProperty from "./pages/Addproperty/Addproperty";

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Layout (Protected) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="properties/:id" element={<PropertyDetails />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="financials" element={<Financials />} />
            <Route path="add-property" element={<AddProperty />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;