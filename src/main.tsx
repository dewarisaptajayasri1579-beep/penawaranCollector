import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import DemoSelection from './demo/DemoSelection.tsx';
import DemoApp from './demo/App.tsx';
import AdminApp from './demo/admin/AdminIndex.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/demo" element={<DemoSelection />} />
        <Route path="/demo/collector" element={<DemoApp />} />
        <Route path="/demo/admin" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
