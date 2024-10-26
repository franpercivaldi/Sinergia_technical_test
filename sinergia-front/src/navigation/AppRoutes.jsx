import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CalendarPage from '../pages/CalendarPage';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
