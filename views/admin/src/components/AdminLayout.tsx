import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button, theme } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  ContactsOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = Layout;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 用于检查用户是否已登录
  useEffect(() => {
    const userInfo = localStorage.getItem('adminUser');
    if (!userInfo) {
      navigate('/login');
      return;
    }
    try {
      const user = JSON.parse(userInfo);
      setUsername(user.username);
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  // 退出登录
  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/login');
  };

  // 用户菜单
  const userItems: MenuProps['items'] = [
    {
      key: '1',
      label: <span>个人资料</span>,
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: <span>系统设置</span>,
      icon: <SettingOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: <span onClick={handleLogout}>退出登录</span>,
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  // 侧边栏菜单
  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">仪表盘</Link>,
    },
    {
      key: '/cases',
      icon: <AppstoreOutlined />,
      label: <Link to="/cases">案例管理</Link>,
    },
    {
      key: '/requirements',
      icon: <FileTextOutlined />,
      label: <Link to="/requirements">需求管理</Link>,
    },
    {
      key: '/contacts',
      icon: <ContactsOutlined />,
      label: <Link to="/contacts">联系信息管理</Link>,
    },
    {
      key: 'system',
      icon: <SettingOutlined />,
      label: '系统设置',
      children: [
        {
          key: '/users',
          label: <Link to="/users">用户管理</Link>,
        },
        {
          key: '/settings',
          label: <Link to="/settings">系统配置</Link>,
        },
      ],
    },
  ];

  // 当前选中的菜单项
  const selectedKeys = [location.pathname];
  // 打开的子菜单
  const openKeys = location.pathname.split('/').filter(Boolean).map(path => `/${path}`);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        theme="dark"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
        }}
      >
        <div style={{ 
          height: 64, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? 0 : '0 16px',
          color: '#fff',
          fontSize: collapsed ? 18 : 20,
          fontWeight: 'bold',
          margin: '16px 0',
        }}>
          {collapsed ? '微企' : '微企定制管理系统'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 48 : 160, transition: 'all 0.2s' }}>
        <Header style={{ 
          padding: 0, 
          background: colorBgContainer,
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 99,
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <span style={{ marginLeft: 12, fontSize: 16 }}>
              {/* 可以根据当前路径显示页面标题 */}
              {location.pathname === '/dashboard' && '仪表盘'}
              {location.pathname === '/cases' && '案例管理'}
              {location.pathname === '/requirements' && '需求管理'}
              {location.pathname === '/contacts' && '联系信息管理'}
              {location.pathname === '/users' && '用户管理'}
              {location.pathname === '/settings' && '系统配置'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
            <Button
              type="text"
              icon={<BellOutlined />}
              style={{ fontSize: '16px', marginRight: 12 }}
            />
            <Dropdown menu={{ items: userItems }} placement="bottomRight" arrow>
              <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                <span>{username || 'Admin'}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          background: colorBgContainer, 
          borderRadius: borderRadiusLG,
          overflow: 'initial',
          minHeight: 280
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout; 