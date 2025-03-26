import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

// 导入布局和页面组件
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Cases from './pages/Cases';
import CaseDetail from './pages/CaseDetail';
import Requirement from './pages/Requirement';

// 导入全局样式
import './App.css';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="cases" element={<Cases />} />
            <Route path="case-detail/:id" element={<CaseDetail />} />
            <Route path="requirement" element={<Requirement />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
