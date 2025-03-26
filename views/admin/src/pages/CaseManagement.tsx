import React, { useState } from 'react';
import { 
  Space, 
  Table, 
  Card, 
  Button, 
  Input, 
  Row, 
  Col, 
  Tag, 
  Dropdown, 
  message, 
  Modal,
  Form,
  Select,
  Badge,
  Tooltip
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined,
  EditOutlined, 
  DeleteOutlined, 
  MoreOutlined, 
  EyeOutlined,
  FilePdfOutlined,
  ExportOutlined,
  SortAscendingOutlined,
  FilterOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Option } = Select;

// 案例状态对应的标签颜色
const statusColors = {
  '已发布': 'success',
  '制作中': 'processing',
  '设计中': 'warning',
  '规划中': 'default',
  '已归档': 'default'
};

// 模拟案例数据
const mockCases = [
  {
    key: '1',
    id: 'CASE2023102501',
    name: '川香餐厅官网',
    client: '川香餐饮有限公司',
    type: '餐饮美食',
    date: '2023-10-25',
    publish_date: '2023-11-10',
    status: '已发布',
    views: 342
  },
  {
    key: '2',
    id: 'CASE2023101801',
    name: '未来学院网站',
    client: '未来教育集团',
    type: '教育培训',
    date: '2023-10-18',
    publish_date: '2023-11-05',
    status: '已发布',
    views: 289
  },
  {
    key: '3',
    id: 'CASE2023100501',
    name: '清颜美容中心',
    client: '清颜美容护理有限公司',
    type: '美容护理',
    date: '2023-10-05',
    publish_date: '2023-10-25',
    status: '已发布',
    views: 176
  },
  {
    key: '4',
    id: 'CASE2023092801',
    name: '自然生活杂货店',
    client: '自然生活有限公司',
    type: '零售商店',
    date: '2023-09-28',
    publish_date: '',
    status: '制作中',
    views: 0
  },
  {
    key: '5',
    id: 'CASE2023091501',
    name: '诚信律师事务所',
    client: '诚信律师事务所',
    type: '专业服务',
    date: '2023-09-15',
    publish_date: '2023-10-10',
    status: '已发布',
    views: 152
  },
  {
    key: '6',
    id: 'CASE2023090301',
    name: '绿色有机农场',
    client: '绿色有机农业发展有限公司',
    type: '农业食品',
    date: '2023-09-03',
    publish_date: '',
    status: '设计中',
    views: 0
  },
  {
    key: '7',
    id: 'CASE2023082001',
    name: '都市健身中心',
    client: '都市健身管理有限公司',
    type: '健康健身',
    date: '2023-08-20',
    publish_date: '2023-09-15',
    status: '已发布',
    views: 231
  }
];

// 案例类型选项
const caseTypes = [
  '餐饮美食', '教育培训', '美容护理', '零售商店', 
  '专业服务', '农业食品', '健康健身', '旅游酒店', 
  '科技数码', '房产建筑', '其他'
];

// 案例状态选项
const caseStatuses = [
  '规划中', '设计中', '制作中', '已发布', '已归档'
];

const CaseManagement: React.FC = () => {
  // 表格数据状态
  const [data, setData] = useState(mockCases);
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 选中的行键
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 是否显示新增/编辑案例弹窗
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 当前编辑的案例数据
  const [currentCase, setCurrentCase] = useState<any>(null);
  // 搜索关键字
  const [searchText, setSearchText] = useState('');
  // 表单引用
  const [form] = Form.useForm();

  // 处理表格选择变化
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // 表格选择配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 显示新增案例弹窗
  const showAddModal = () => {
    setCurrentCase(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // 显示编辑案例弹窗
  const showEditModal = (record: any) => {
    setCurrentCase(record);
    form.setFieldsValue({
      name: record.name,
      client: record.client,
      type: record.type,
      status: record.status,
    });
    setIsModalVisible(true);
  };

  // 处理弹窗取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 处理表单提交
  const handleFormSubmit = () => {
    form.validateFields().then(values => {
      setLoading(true);
      
      // 模拟提交请求延迟
      setTimeout(() => {
        const newData = [...data];
        
        if (currentCase) {
          // 编辑现有案例
          const index = newData.findIndex(item => item.key === currentCase.key);
          if (index > -1) {
            newData[index] = {
              ...newData[index],
              ...values,
            };
            setData(newData);
            message.success('案例已更新！');
          }
        } else {
          // 添加新案例
          const newCase = {
            key: `${data.length + 1}`,
            id: `CASE${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}${data.length + 1}`,
            date: new Date().toISOString().slice(0, 10),
            publish_date: '',
            views: 0,
            ...values,
          };
          newData.unshift(newCase);
          setData(newData);
          message.success('新案例已添加！');
        }
        
        setLoading(false);
        setIsModalVisible(false);
      }, 1000);
    }).catch(errorInfo => {
      console.log('验证失败:', errorInfo);
    });
  };

  // 删除案例
  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除此案例吗？此操作不可逆。',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const newData = data.filter(item => item.key !== key);
        setData(newData);
        message.success('案例已删除');
      },
    });
  };

  // 批量删除案例
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的案例');
      return;
    }
    
    Modal.confirm({
      title: '确认批量删除',
      content: `您确定要删除选中的 ${selectedRowKeys.length} 个案例吗？此操作不可逆。`,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        const newData = data.filter(item => !selectedRowKeys.includes(item.key));
        setData(newData);
        setSelectedRowKeys([]);
        message.success(`已删除 ${selectedRowKeys.length} 个案例`);
      },
    });
  };

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value);
    
    if (value) {
      const filteredData = mockCases.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.client.toLowerCase().includes(value.toLowerCase()) ||
        item.id.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(mockCases);
    }
  };

  // 更多操作下拉菜单项
  const moreActions: MenuProps['items'] = [
    {
      key: 'view',
      label: '查看详情',
      icon: <EyeOutlined />,
    },
    {
      key: 'export',
      label: '导出PDF',
      icon: <FilePdfOutlined />,
    },
    {
      key: 'archive',
      label: '归档案例',
      icon: <ExportOutlined />,
    },
  ];

  // 处理下拉菜单点击
  const handleMenuClick = (key: string, record: any) => {
    switch (key) {
      case 'view':
        message.info(`查看案例: ${record.name}`);
        break;
      case 'export':
        message.info(`导出案例: ${record.name}`);
        break;
      case 'archive':
        // 更新状态为已归档
        const newData = [...data];
        const index = newData.findIndex(item => item.key === record.key);
        if (index > -1) {
          newData[index] = {
            ...newData[index],
            status: '已归档',
          };
          setData(newData);
          message.success(`案例 ${record.name} 已归档`);
        }
        break;
      default:
        break;
    }
  };

  // 表格列定义
  const columns = [
    {
      title: '案例ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
    },
    {
      title: '案例名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <a onClick={() => showEditModal(record)}>{text}</a>
      ),
    },
    {
      title: '客户',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag>{type}</Tag>,
    },
    {
      title: '创建日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: '发布日期',
      dataIndex: 'publish_date',
      key: 'publish_date',
      render: (date: string) => date || '-',
      sorter: (a: any, b: any) => {
        if (!a.publish_date) return 1;
        if (!b.publish_date) return -1;
        return new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime();
      },
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      key: 'views',
      sorter: (a: any, b: any) => a.views - b.views,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={statusColors[status as keyof typeof statusColors] as any} text={status} />
      ),
      filters: caseStatuses.map(status => ({ text: status, value: status })),
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="编辑">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => showEditModal(record)} 
            />
          </Tooltip>
          <Tooltip title="删除">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record.key)} 
            />
          </Tooltip>
          <Dropdown 
            menu={{ 
              items: moreActions,
              onClick: ({ key }) => handleMenuClick(key, record) 
            }} 
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col flex="auto">
            <Input.Search
              placeholder="搜索案例名称、客户或ID"
              allowClear
              enterButton={<><SearchOutlined /> 搜索</>}
              size="middle"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onSearch={handleSearch}
              style={{ maxWidth: 400 }}
            />
          </Col>
          <Col>
            <Space>
              <Button 
                icon={<FilterOutlined />}
              >
                筛选
              </Button>
              <Button 
                icon={<SortAscendingOutlined />}
              >
                排序
              </Button>
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={showAddModal}
              >
                新增案例
              </Button>
            </Space>
          </Col>
        </Row>
        
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 16 }}>
            <Space>
              <span>已选择 {selectedRowKeys.length} 项</span>
              <Button type="link" onClick={() => setSelectedRowKeys([])}>取消选择</Button>
              <Button danger onClick={handleBatchDelete}>批量删除</Button>
            </Space>
          </Row>
        )}
        
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 个案例`,
          }}
        />
      </Card>

      {/* 新增/编辑案例弹窗 */}
      <Modal
        title={currentCase ? '编辑案例' : '新增案例'}
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={handleFormSubmit}
        confirmLoading={loading}
        maskClosable={false}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          name="caseForm"
        >
          <Form.Item
            name="name"
            label="案例名称"
            rules={[{ required: true, message: '请输入案例名称' }]}
          >
            <Input placeholder="请输入案例名称" />
          </Form.Item>
          
          <Form.Item
            name="client"
            label="客户名称"
            rules={[{ required: true, message: '请输入客户名称' }]}
          >
            <Input placeholder="请输入客户名称" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="案例类型"
            rules={[{ required: true, message: '请选择案例类型' }]}
          >
            <Select placeholder="请选择案例类型">
              {caseTypes.map(type => (
                <Option key={type} value={type}>{type}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="status"
            label="案例状态"
            rules={[{ required: true, message: '请选择案例状态' }]}
          >
            <Select placeholder="请选择案例状态">
              {caseStatuses.map(status => (
                <Option key={status} value={status}>{status}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CaseManagement; 