import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { themeSettings } from './theme';

import useAuth from './hooks/useAuth';

import Layout from './scenes/layout';
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import Product from "./scenes/product";
import Login from './scenes/login';
import Customers from './scenes/customers';
import Payments from './scenes/payments';
import Overview from './scenes/overview';
import Daily from './scenes/daily';

function App() {
    const mode = useSelector((state) => state.globalSlice.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Navigate to="/tableau-de-bord" replace />}
                />
                <Route path="/tableau-de-bord" element={<Dashboard />} />
                <Route path="/articles" element={<Products />} />
                <Route path="/articles/:id" element={<Product />} />
                <Route path="/clients" element={<Customers />} />
                <Route path="/paiements" element={<Payments />} />
                <Route path="/vue-d-ensemble" element={<Overview />} />
                <Route path="/journalier" element={<Daily />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

function PrivateRoute() {
  const accessToken = useAuth();

  const { pathname } = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: pathname }} replace />
  );
}

export default App
