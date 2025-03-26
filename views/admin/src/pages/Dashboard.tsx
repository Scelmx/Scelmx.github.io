import React from 'react';
import { Card, Row, Col, Statistic, Table, Button, Typography, List, Badge } from 'antd';
import { 
  FileOutlined, 
  EyeOutlined, 
  FileTextOutlined, 
  MessageOutlined,
  RiseOutlined,
  FallOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title } = Typography;

// 模拟统计数据
const statisticsData = [
  {
    title: '案例总数',
    value: 48,
    icon: <FileOutlined />,
    color: '#3498db',
    suffix: '篇',
    change: 8.2,
    changeType: 'rise'
  },
  {
    title: '本月访问量',
    value: 2689,
    icon: <EyeOutlined />,
    color: '#2ecc71',
    suffix: '次',
    change: 12.5,
    changeType: 'rise'
  },
  {
    title: '待处理需求',
    value: 16,
    icon: <FileTextOutlined />,
    color: '#e74c3c',
    suffix: '条',
    change: -3.1,
    changeType: 'fall'
  },
  {
    title: '新联系请求',
    value: 9,
    icon: <MessageOutlined />,
    color: '#f39c12',
    suffix: '条',
    change: 5.4,
    changeType: 'rise'
  }
];

// 模拟最近案例数据
const recentCasesData = [
  {
    key: '1',
    id: 'CASE2023102501',
    name: '川香餐厅官网',
    type: '餐饮美食',
    date: '2023-10-25',
    status: '已发布'
  },
  {
    key: '2',
    id: 'CASE2023101801',
    name: '未来学院网站',
    type: '教育培训',
    date: '2023-10-18',
    status: '已发布'
  },
  {
    key: '3',
    id: 'CASE2023100501',
    name: '清颜美容中心',
    type: '美容护理',
    date: '2023-10-05',
    status: '已发布'
  },
  {
    key: '4',
    id: 'CASE2023092801',
    name: '自然生活杂货店',
    type: '零售商店',
    date: '2023-09-28',
    status: '制作中'
  }
];

// 模拟最新需求数据
const latestRequirementsData = [
  {
    id: 'REQ2023110501',
    title: '健身房官网设计需求',
    submitter: '李明 / 活力健身',
    date: '2023-11-05',
    status: '未处理'
  },
  {
    id: 'REQ2023110301',
    title: '花店在线商城需求',
    submitter: '张婷 / 馨香花艺',
    date: '2023-11-03',
    status: '处理中'
  },
  {
    id: 'REQ2023103001',
    title: '儿童游乐园网站设计',
    submitter: '王刚 / 童乐园',
    date: '2023-10-30',
    status: '已处理'
  },
  {
    id: 'REQ2023102801',
    title: '咖啡馆品牌网站设计',
    submitter: '赵琳 / 慢品咖啡',
    date: '2023-10-28',
    status: '已处理'
  }
];

// 案例列表列定义
const casesColumns = [
  {
    title: '案例ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '案例名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '创建日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <span>
        <Badge
          status={status === '已发布' ? 'success' : 'processing'}
          text={status}
        />
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <span>
        <Button type="link" size="small">查看</Button>
        <Button type="link" size="small">编辑</Button>
      </span>
    ),
  },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4}>欢迎回来，管理员</Title>
          </Col>
          <Col>
            <Button type="primary" icon={<ReloadOutlined />}>
              刷新数据
            </Button>
          </Col>
        </Row>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statisticsData.map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card hoverable>
              <Statistic
                title={
                  <div style={{ color: item.color, fontWeight: 'bold' }}>
                    {item.icon} {item.title}
                  </div>
                }
                value={item.value}
                suffix={item.suffix}
                valueStyle={{ color: item.color }}
              />
              <div style={{ marginTop: 8 }}>
                <span>
                  {item.changeType === 'rise' ? (
                    <RiseOutlined style={{ color: '#2ecc71' }} />
                  ) : (
                    <FallOutlined style={{ color: '#e74c3c' }} />
                  )}
                  <span style={{ 
                    marginLeft: 4, 
                    color: item.changeType === 'rise' ? '#2ecc71' : '#e74c3c' 
                  }}>
                    {Math.abs(item.change)}%
                  </span>
                  <span style={{ marginLeft: 4, color: '#999' }}>较上月</span>
                </span>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* 最近案例表格 */}
      <Card 
        title="最近案例" 
        extra={<Link to="/case-management">查看更多</Link>}
        style={{ marginBottom: 24 }}
      >
        <Table 
          columns={casesColumns} 
          dataSource={recentCasesData} 
          pagination={false} 
          size="middle"
        />
      </Card>
      
      {/* 最新需求列表 */}
      <Card 
        title="最新需求" 
        extra={<Link to="/requirement-management">查看更多</Link>}
      >
        <List
          itemLayout="horizontal"
          dataSource={latestRequirementsData}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="link" key="view">查看</Button>,
                <Button type="link" key="process">处理</Button>
              ]}
            >
              <List.Item.Meta
                title={<Link to={`/requirement-management/detail/${item.id}`}>{item.title}</Link>}
                description={
                  <span>
                    提交人: {item.submitter} | 提交日期: {item.date} | 
                    状态: <Badge 
                      status={
                        item.status === '未处理' ? 'error' : 
                        item.status === '处理中' ? 'processing' : 'success'
                      } 
                      text={item.status} 
                    />
                  </span>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Dashboard; 