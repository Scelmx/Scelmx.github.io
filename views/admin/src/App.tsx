import React from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import './App.css';
import routes from './routes';

// 路由组件
const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
