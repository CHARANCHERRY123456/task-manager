import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Login from '../pages/Login';
import DashBoard from '../pages/Dashboard';

import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<DashBoard />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default AppRoutes;