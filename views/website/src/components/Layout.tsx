import React, { useState, useEffect } from 'react';
import { Layout as AntLayout, Menu, Row, Col } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';

const { Header, Content, Footer } = AntLayout;

const Layout: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动事件
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <Header style={{
        background: '#fff',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        position: 'fixed',
        top: 0,
        zIndex: 1000,
        width: '100%',
        padding: '0 20px',
        transition: 'box-shadow 0.3s ease'
      }}>
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <div style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#3498db',
              lineHeight: '64px'
            }}>
              <Link to="/" style={{ color: '#3498db' }}>微企定制</Link>
            </div>
          </Col>
          <Col>
            <Menu
              mode="horizontal"
              selectedKeys={[currentPath]}
              style={{ border: 'none', lineHeight: '64px' }}
              items={[
                {
                  key: '/',
                  label: <Link to="/">首页</Link>,
                },
                {
                  key: '/about',
                  label: <Link to="/about">关于我们</Link>,
                },
                {
                  key: '/cases',
                  label: <Link to="/cases">案例</Link>,
                },
                {
                  key: '/requirement',
                  label: <Link to="/requirement">需求提交</Link>,
                },
              ]}
            />
          </Col>
        </Row>
      </Header>

      <Content>
        <Outlet />
      </Content>

      <Footer style={{ background: '#2c3e50', color: '#fff', padding: '60px 0 20px', marginTop: 50 }}>
        <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 20px' }}>
          <Row gutter={[40, 30]} style={{ marginBottom: 40 }}>
            <Col xs={24} sm={8}>
              <h3 style={{ marginBottom: 24, fontSize: 18, fontWeight: 600 }}>关于我们</h3>
              <p style={{ lineHeight: 1.8, textAlign: 'justify', marginBottom: 0 }}>微企定制是专注于为小微企业提供高质量网站定制服务的团队，我们致力于帮助小微企业提升品牌形象，拓展在线业务。</p>
            </Col>
            <Col xs={24} sm={8}>
              <h3 style={{ marginBottom: 24, fontSize: 18, fontWeight: 600 }}>联系我们</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <li style={{ marginBottom: 12, lineHeight: 1.8 }}>电话：123-4567-8910</li>
                <li style={{ marginBottom: 12, lineHeight: 1.8 }}>邮箱：contact@weiqi.com</li>
                <li style={{ marginBottom: 0, lineHeight: 1.8 }}>地址：北京市朝阳区科技园A座501</li>
              </ul>
            </Col>
            <Col xs={24} sm={8}>
              <h3 style={{ marginBottom: 24, fontSize: 18, fontWeight: 600 }}>快速链接</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: 24, justifyContent: 'center' }}>
                <li style={{ marginBottom: 12, lineHeight: 1.8 }}><Link to="/" style={{ color: '#fff' }}>首页</Link></li>
                <li style={{ marginBottom: 12, lineHeight: 1.8 }}><Link to="/about" style={{ color: '#fff' }}>关于我们</Link></li>
                <li style={{ marginBottom: 12, lineHeight: 1.8 }}><Link to="/cases" style={{ color: '#fff' }}>案例</Link></li>
                <li style={{ marginBottom: 0, lineHeight: 1.8 }}><Link to="/requirement" style={{ color: '#fff' }}>需求提交</Link></li>
              </ul>
            </Col>
          </Row>
          <div style={{ textAlign: 'center', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <p style={{ marginBottom: 0 }}>&copy; {new Date().getFullYear()} 微企定制 版权所有</p>
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default Layout;