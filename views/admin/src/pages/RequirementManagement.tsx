import React, { useState } from 'react';
import { 
  Typography, 
  Space, 
  Table, 
  Card, 
  Button, 
  Input, 
  Row, 
  Col, 
  Tabs, 
  Tag, 
  Dropdown, 
  message, 
  Modal, 
  Form,
  Select,
  Drawer,
  Descriptions,
  Badge,
  Empty,
  List,
  Avatar,
  Tooltip,
  Timeline,
  Upload,
  Divider
} from 'antd';
import { 
  SearchOutlined, 
  DownloadOutlined, 
  UserOutlined, 
  CalendarOutlined, 
  FileTextOutlined,
  PhoneOutlined,
  MailOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  PaperClipOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  UploadOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileZipOutlined,
  FileOutlined,
  CommentOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import type { TabsProps, MenuProps, UploadFile, UploadProps } from 'antd';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

// 需求列表类型定义
interface RequirementItem {
  key: string;
  id: string;
  title: string;
  submitter: string;
  company: string;
  phone: string;
  email: string;
  type: string;
  date: string;
  status: string;
  priority: string;
  hasFiles: boolean;
  note?: string;
}

// 文件类型定义
interface RequirementFile {
  uid: string;
  name: string;
  type: string;
  size: number;
  uploadTime: string;
  url: string;
}

// 处理记录类型定义
interface ProcessRecord {
  id: string;
  operator: string;
  action: string;
  time: string;
  content?: string;
}

// 需求状态颜色映射
const statusColors: Record<string, string> = {
  '未处理': 'error',
  '处理中': 'processing',
  '待确认': 'warning',
  '已完成': 'success',
  '已关闭': 'default'
};

// 优先级颜色映射
const priorityColors: Record<string, string> = {
  '高': '#f5222d',
  '中': '#faad14',
  '低': '#52c41a'
};

// 需求类型选项
const requirementTypes = [
  '企业网站', '电商网站', '品牌网站', '响应式网站', 
  '营销网站', '维护更新', '小程序开发', '其他'
];

// 需求状态选项
const requirementStatuses = [
  '未处理', '处理中', '待确认', '已完成', '已关闭'
];

// 优先级选项
const priorityOptions = ['高', '中', '低'];

// 模拟需求数据
const mockRequirements: RequirementItem[] = [
  {
    key: '1',
    id: 'REQ2023110501',
    title: '健身房官网设计需求',
    submitter: '李明',
    company: '活力健身',
    phone: '13512345678',
    email: 'liming@example.com',
    type: '企业网站',
    date: '2023-11-05',
    status: '未处理',
    priority: '中',
    hasFiles: true
  },
  {
    key: '2',
    id: 'REQ2023110301',
    title: '花店在线商城需求',
    submitter: '张婷',
    company: '馨香花艺',
    phone: '13698765432',
    email: 'zhangting@example.com',
    type: '电商网站',
    date: '2023-11-03',
    status: '处理中',
    priority: '高',
    hasFiles: true
  },
  {
    key: '3',
    id: 'REQ2023103001',
    title: '儿童游乐园网站设计',
    submitter: '王刚',
    company: '童乐园',
    phone: '13887654321',
    email: 'wanggang@example.com',
    type: '品牌网站',
    date: '2023-10-30',
    status: '已完成',
    priority: '中',
    hasFiles: true
  },
  {
    key: '4',
    id: 'REQ2023102801',
    title: '咖啡馆品牌网站设计',
    submitter: '赵琳',
    company: '慢品咖啡',
    phone: '13756789012',
    email: 'zhaolin@example.com',
    type: '响应式网站',
    date: '2023-10-28',
    status: '已完成',
    priority: '中',
    hasFiles: true,
    note: '客户要求在网站首页突出展示咖啡制作工艺和店铺环境'
  },
  {
    key: '5',
    id: 'REQ2023102201',
    title: '养生馆预约网站',
    submitter: '林华',
    company: '康源养生',
    phone: '13898765432',
    email: 'linhua@example.com',
    type: '企业网站',
    date: '2023-10-22',
    status: '待确认',
    priority: '低',
    hasFiles: false,
    note: '客户需要在网站中加入线上预约功能'
  },
  {
    key: '6',
    id: 'REQ2023101501',
    title: '宠物店品牌网站建设',
    submitter: '陈明',
    company: '爱宠生活',
    phone: '13578901234',
    email: 'chenming@example.com',
    type: '品牌网站',
    date: '2023-10-15',
    status: '处理中',
    priority: '高',
    hasFiles: true
  },
  {
    key: '7',
    id: 'REQ2023101001',
    title: '数码产品在线商城',
    submitter: '黄伟',
    company: '智能数码',
    phone: '13612345678',
    email: 'huangwei@example.com',
    type: '电商网站',
    date: '2023-10-10',
    status: '已关闭',
    priority: '中',
    hasFiles: true,
    note: '客户因自身原因暂停项目'
  }
];

// 模拟需求文件
const mockFiles: Record<string, RequirementFile[]> = {
  'REQ2023110501': [
    {
      uid: '1',
      name: '健身房网站需求文档.docx',
      type: 'docx',
      size: 2560000,
      uploadTime: '2023-11-05 14:30',
      url: '#'
    },
    {
      uid: '2',
      name: '参考设计方案.pdf',
      type: 'pdf',
      size: 5120000,
      uploadTime: '2023-11-05 14:32',
      url: '#'
    }
  ],
  'REQ2023110301': [
    {
      uid: '1',
      name: '花店商城需求说明.docx',
      type: 'docx',
      size: 1840000,
      uploadTime: '2023-11-03 10:15',
      url: '#'
    },
    {
      uid: '2',
      name: '商品清单.xlsx',
      type: 'xlsx',
      size: 720000,
      uploadTime: '2023-11-03 10:18',
      url: '#'
    },
    {
      uid: '3',
      name: '设计素材.zip',
      type: 'zip',
      size: 15360000,
      uploadTime: '2023-11-03 10:20',
      url: '#'
    }
  ]
};

// 模拟处理记录
const mockRecords: Record<string, ProcessRecord[]> = {
  'REQ2023110301': [
    {
      id: '1',
      operator: '周晓华',
      action: '创建需求',
      time: '2023-11-03 10:25',
      content: '需求已创建并分配给设计团队'
    },
    {
      id: '2',
      operator: '李明',
      action: '更新状态',
      time: '2023-11-03 14:40',
      content: '状态更新为"处理中"，正在分析需求'
    },
    {
      id: '3',
      operator: '李明',
      action: '添加备注',
      time: '2023-11-04 09:15',
      content: '已与客户沟通确认了功能需求和设计风格，将于下周一提供初步设计方案'
    }
  ],
  'REQ2023102801': [
    {
      id: '1',
      operator: '周晓华',
      action: '创建需求',
      time: '2023-10-28 16:25',
      content: '需求已创建'
    },
    {
      id: '2',
      operator: '王刚',
      action: '更新状态',
      time: '2023-10-29 09:30',
      content: '状态更新为"处理中"'
    },
    {
      id: '3',
      operator: '王刚',
      action: '添加备注',
      time: '2023-10-30 14:20',
      content: '与客户电话沟通，确认了网站结构和主要页面内容'
    },
    {
      id: '4',
      operator: '周晓华',
      action: '更新状态',
      time: '2023-11-15 10:40',
      content: '状态更新为"已完成"，网站已上线'
    }
  ]
};

// 获取文件图标
const getFileIcon = (fileName: string) => {
  if (fileName.endsWith('.pdf')) return <FilePdfOutlined style={{ color: '#ff4d4f' }} />;
  if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) return <FileWordOutlined style={{ color: '#2f54eb' }} />;
  if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) return <FileExcelOutlined style={{ color: '#52c41a' }} />;
  if (fileName.endsWith('.zip') || fileName.endsWith('.rar')) return <FileZipOutlined style={{ color: '#faad14' }} />;
  return <FileOutlined />;
};

// 获取文件大小显示
const getFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const RequirementManagement: React.FC = () => {
  // 需求列表数据状态
  const [data, setData] = useState(mockRequirements);
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 当前选中的需求ID
  const [currentId, setCurrentId] = useState<string>('');
  // 详情抽屉是否可见
  const [drawerVisible, setDrawerVisible] = useState(false);
  // 备注编辑框是否可见
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  // 文件列表
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // 搜索关键字
  const [searchText, setSearchText] = useState('');
  // 表单状态
  const [form] = Form.useForm();
  const [noteForm] = Form.useForm();
  
  // 获取当前需求数据
  const getCurrentRequirement = () => {
    return data.find(item => item.id === currentId);
  };
  
  // 显示需求详情
  const showDetail = (id: string) => {
    setCurrentId(id);
    setDrawerVisible(true);
  };
  
  // 关闭需求详情
  const closeDetail = () => {
    setDrawerVisible(false);
  };
  
  // 显示备注编辑框
  const showNoteModal = () => {
    const current = getCurrentRequirement();
    noteForm.setFieldsValue({ note: current?.note || '' });
    setNoteModalVisible(true);
  };
  
  // 关闭备注编辑框
  const closeNoteModal = () => {
    setNoteModalVisible(false);
  };
  
  // 保存备注
  const saveNote = () => {
    noteForm.validateFields().then(values => {
      const newData = [...data];
      const index = newData.findIndex(item => item.id === currentId);
      if (index > -1) {
        newData[index] = {
          ...newData[index],
          note: values.note
        };
        setData(newData);
        message.success('备注已保存');
        setNoteModalVisible(false);
      }
    });
  };
  
  // 更新需求状态
  const updateStatus = (id: string, status: string) => {
    Modal.confirm({
      title: '确认更新状态',
      content: `确定将需求状态更新为"${status}"吗？`,
      onOk() {
        const newData = [...data];
        const index = newData.findIndex(item => item.id === id);
        if (index > -1) {
          newData[index] = {
            ...newData[index],
            status
          };
          setData(newData);
          message.success(`需求状态已更新为"${status}"`);
        }
      }
    });
  };
  
  // 更新需求优先级
  const updatePriority = (id: string, priority: string) => {
    const newData = [...data];
    const index = newData.findIndex(item => item.id === id);
    if (index > -1) {
      newData[index] = {
        ...newData[index],
        priority
      };
      setData(newData);
      message.success(`需求优先级已更新为"${priority}"`);
    }
  };
  
  // 删除需求
  const deleteRequirement = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      icon: <ExclamationCircleOutlined />,
      content: '确定要删除此需求吗？此操作不可撤销。',
      okType: 'danger',
      onOk() {
        const newData = data.filter(item => item.id !== id);
        setData(newData);
        setDrawerVisible(false);
        message.success('需求已删除');
      }
    });
  };
  
  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value);
    
    if (value) {
      const filteredData = mockRequirements.filter(item => 
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.submitter.toLowerCase().includes(value.toLowerCase()) ||
        item.company.toLowerCase().includes(value.toLowerCase()) ||
        item.id.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(mockRequirements);
    }
  };
  
  // 表格列定义
  const columns = [
    {
      title: '需求ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '需求标题',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: RequirementItem) => (
        <a onClick={() => showDetail(record.id)}>{text}</a>
      ),
    },
    {
      title: '提交者',
      dataIndex: 'submitter',
      key: 'submitter',
      render: (text: string, record: RequirementItem) => (
        <span>{text} / {record.company}</span>
      ),
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag>{type}</Tag>,
      filters: requirementTypes.map(type => ({ text: type, value: type })),
      onFilter: (value: any, record: RequirementItem) => record.type === value,
    },
    {
      title: '提交日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a: RequirementItem, b: RequirementItem) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => (
        <Tag color={priorityColors[priority]}>{priority}</Tag>
      ),
      filters: priorityOptions.map(p => ({ text: p, value: p })),
      onFilter: (value: any, record: RequirementItem) => record.priority === value,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge status={statusColors[status] as any} text={status} />
      ),
      filters: requirementStatuses.map(status => ({ text: status, value: status })),
      onFilter: (value: any, record: RequirementItem) => record.status === value,
    },
    {
      title: '附件',
      key: 'files',
      dataIndex: 'hasFiles',
      render: (hasFiles: boolean) => (
        hasFiles ? <PaperClipOutlined style={{ color: '#1890ff' }} /> : '-'
      ),
      filters: [
        { text: '有附件', value: true },
        { text: '无附件', value: false },
      ],
      onFilter: (value: any, record: RequirementItem) => record.hasFiles === value,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: RequirementItem) => (
        <Space size="small">
          <Tooltip title="查看详情">
            <Button type="text" icon={<EyeOutlined />} onClick={() => showDetail(record.id)} />
          </Tooltip>
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: '标记为未处理',
                  disabled: record.status === '未处理',
                  onClick: () => updateStatus(record.id, '未处理'),
                },
                {
                  key: '2',
                  label: '开始处理',
                  disabled: record.status === '处理中',
                  onClick: () => updateStatus(record.id, '处理中'),
                },
                {
                  key: '3',
                  label: '标记为待确认',
                  disabled: record.status === '待确认',
                  onClick: () => updateStatus(record.id, '待确认'),
                },
                {
                  key: '4',
                  label: '标记为已完成',
                  disabled: record.status === '已完成',
                  onClick: () => updateStatus(record.id, '已完成'),
                },
                {
                  key: '5',
                  label: '关闭需求',
                  disabled: record.status === '已关闭',
                  onClick: () => updateStatus(record.id, '已关闭'),
                },
                { type: 'divider' },
                {
                  key: '6',
                  label: '设为高优先级',
                  disabled: record.priority === '高',
                  onClick: () => updatePriority(record.id, '高'),
                },
                {
                  key: '7',
                  label: '设为中优先级',
                  disabled: record.priority === '中',
                  onClick: () => updatePriority(record.id, '中'),
                },
                {
                  key: '8',
                  label: '设为低优先级',
                  disabled: record.priority === '低',
                  onClick: () => updatePriority(record.id, '低'),
                },
              ]
            }}
            trigger={['click']}
          >
            <Button type="text" icon={<EditOutlined />} />
          </Dropdown>
          <Tooltip title="删除">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => deleteRequirement(record.id)} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];
  
  // 详情抽屉中的选项卡项
  const detailTabItems: TabsProps['items'] = [
    {
      key: '1',
      label: '需求信息',
      children: (
        <>
          {getCurrentRequirement() && (
            <Descriptions column={{ xs: 1, sm: 2 }} bordered>
              <Descriptions.Item label="需求ID">{getCurrentRequirement()?.id}</Descriptions.Item>
              <Descriptions.Item label="提交日期">{getCurrentRequirement()?.date}</Descriptions.Item>
              <Descriptions.Item label="类型">{getCurrentRequirement()?.type}</Descriptions.Item>
              <Descriptions.Item label="状态">
                <Badge 
                  status={statusColors[getCurrentRequirement()?.status || ''] as any} 
                  text={getCurrentRequirement()?.status} 
                />
              </Descriptions.Item>
              <Descriptions.Item label="提交者">{getCurrentRequirement()?.submitter}</Descriptions.Item>
              <Descriptions.Item label="公司">{getCurrentRequirement()?.company}</Descriptions.Item>
              <Descriptions.Item label="联系电话">{getCurrentRequirement()?.phone}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{getCurrentRequirement()?.email}</Descriptions.Item>
              <Descriptions.Item label="优先级" span={2}>
                <Tag color={priorityColors[getCurrentRequirement()?.priority || '中']}>
                  {getCurrentRequirement()?.priority}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="需求备注" span={2}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>{getCurrentRequirement()?.note || '暂无备注'}</div>
                  <Button type="link" onClick={showNoteModal}>编辑备注</Button>
                </div>
              </Descriptions.Item>
            </Descriptions>
          )}
        </>
      ),
    },
    {
      key: '2',
      label: '需求文件',
      children: (
        <>
          {mockFiles[currentId] ? (
            <List
              itemLayout="horizontal"
              dataSource={mockFiles[currentId]}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <Button type="link" key="download" icon={<DownloadOutlined />}>
                      下载
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={getFileIcon(item.name)}
                    title={item.name}
                    description={
                      <Space>
                        <Text type="secondary">{getFileSize(item.size)}</Text>
                        <Text type="secondary">上传时间: {item.uploadTime}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          ) : (
            <Empty description="暂无文件" />
          )}
          
          <Divider />
          
          <Upload.Dragger 
            multiple
            action="#"
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">支持单个或批量上传</p>
          </Upload.Dragger>
          
          {fileList.length > 0 && (
            <div style={{ marginTop: 16, textAlign: 'right' }}>
              <Button 
                type="primary" 
                onClick={() => {
                  message.success('文件上传成功');
                  setFileList([]);
                }}
              >
                <UploadOutlined /> 上传文件
              </Button>
            </div>
          )}
        </>
      ),
    },
    {
      key: '3',
      label: '处理记录',
      children: (
        <>
          {mockRecords[currentId] ? (
            <Timeline
              items={mockRecords[currentId].map(record => ({
                color: 
                  record.action === '创建需求' ? 'blue' :
                  record.action === '更新状态' ? 'green' :
                  record.action === '添加备注' ? 'orange' : 'gray',
                children: (
                  <>
                    <div style={{ fontWeight: 'bold', marginBottom: 4 }}>
                      {record.action}
                      <span style={{ float: 'right', fontWeight: 'normal', fontSize: '0.9em' }}>
                        {record.time}
                      </span>
                    </div>
                    <div style={{ marginBottom: 2 }}>操作人: {record.operator}</div>
                    {record.content && <div>{record.content}</div>}
                  </>
                )
              }))}
            />
          ) : (
            <Empty description="暂无处理记录" />
          )}
          
          <Divider />
          
          <Form layout="vertical">
            <Form.Item label="添加处理记录">
              <TextArea rows={4} placeholder="输入处理记录内容..." />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Button 
                type="primary" 
                icon={<CommentOutlined />}
                onClick={() => message.success('处理记录已添加')}
              >
                添加记录
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
  ];
  
  return (
    <div>
      <Card>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
          <Col flex="auto">
            <Input.Search
              placeholder="搜索需求标题、提交者或公司"
              allowClear
              enterButton={<><SearchOutlined /> 搜索</>}
              size="middle"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              onSearch={handleSearch}
              style={{ maxWidth: 400 }}
            />
          </Col>
        </Row>
        
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowClassName={(record) => record.status === '未处理' ? 'ant-table-row-highlight' : ''}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: total => `共 ${total} 个需求`,
          }}
        />
      </Card>
      
      {/* 需求详情抽屉 */}
      <Drawer
        title={
          <Space>
            <span>{getCurrentRequirement()?.title}</span>
            <Tag color={priorityColors[getCurrentRequirement()?.priority || '中']}>
              {getCurrentRequirement()?.priority}
            </Tag>
            <Badge 
              status={statusColors[getCurrentRequirement()?.status || ''] as any} 
              text={getCurrentRequirement()?.status} 
            />
          </Space>
        }
        width={700}
        placement="right"
        onClose={closeDetail}
        open={drawerVisible}
        extra={
          <Space>
            <Button onClick={closeDetail}>关闭</Button>
            <Button 
              type="primary" 
              onClick={() => updateStatus(currentId, '处理中')}
              disabled={getCurrentRequirement()?.status === '处理中' || getCurrentRequirement()?.status === '已完成' || getCurrentRequirement()?.status === '已关闭'}
            >
              开始处理
            </Button>
          </Space>
        }
      >
        <Tabs defaultActiveKey="1" items={detailTabItems} />
      </Drawer>
      
      {/* 备注编辑弹窗 */}
      <Modal
        title="编辑需求备注"
        open={noteModalVisible}
        onCancel={closeNoteModal}
        onOk={saveNote}
      >
        <Form form={noteForm} layout="vertical">
          <Form.Item
            name="note"
            label="需求备注"
            rules={[{ required: false }]}
          >
            <TextArea rows={6} placeholder="输入需求相关的备注信息..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RequirementManagement; 