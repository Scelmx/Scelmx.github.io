import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CaseManagement from '../pages/CaseManagement';
import RequirementManagement from '../pages/RequirementManagement';

// 用于验证用户是否已登录的组件
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 检查本地存储中是否有用户信息
  const isAuthenticated = localStorage.getItem('adminUser') !== null;

  if (!isAuthenticated) {
    // 重定向到登录页面
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

// 路由配置
const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: '',
        element: <Navigate to="/dashboard" />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'cases',
        element: <CaseManagement />,
      },
      {
        path: 'requirements',
        element: <RequirementManagement />,
      },
      // 可以在此处添加更多路由
      {
        path: 'users',
        // 用户管理页面暂未实现
        element: <div>用户管理 - 开发中</div>,
      },
      {
        path: 'settings',
        // 系统设置页面暂未实现
        element: <div>系统设置 - 开发中</div>,
      },
      {
        path: '*',
        element: <Navigate to="/dashboard" />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export default routes; 