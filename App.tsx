import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { ServiceList } from './pages/ServiceList';
import { ServiceDetail } from './pages/ServiceDetail';
import { Booking } from './pages/Booking';
import { Layout } from './components/Layout';

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/booking/:id?" element={<Booking />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}