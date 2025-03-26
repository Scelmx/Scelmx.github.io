import React, { useState } from 'react';
import { Typography, Row, Col, Card, Button, Form, Input, Upload, message, Steps, Collapse, Alert } from 'antd';
import { UploadOutlined, InboxOutlined, PhoneOutlined, MailOutlined, UserOutlined, BankOutlined, DownloadOutlined, FormOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { TextArea } = Input;

interface TemplateItem {
  id: number;
  title: string;
  description: string;
  fileName: string;
}

const Requirement: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // 需求模板数据
  const templates: TemplateItem[] = [
    {
      id: 1,
      title: '通用企业网站需求模板',
      description: '适用于大多数小微企业的通用需求模板，包含基本的网站功能需求调研内容。',
      fileName: '企业网站需求模板.docx',
    },
    {
      id: 2,
      title: '电商网站需求模板',
      description: '适用于需要在线销售产品的企业，包含产品展示、购物车、支付等功能需求。',
      fileName: '电商网站需求模板.docx',
    },
    {
      id: 3,
      title: '服务行业网站需求模板',
      description: '适用于提供专业服务的企业，包含服务介绍、在线预约、案例展示等功能需求。',
      fileName: '服务行业网站需求模板.docx',
    },
  ];

  // 常见问题数据
  const faqs = [
    {
      question: '提交需求后多久能收到回复？',
      answer: '我们会在收到您的需求后1-2个工作日内与您联系，确认需求细节并提供初步方案。',
    },
    {
      question: '如何知道我的网站需要哪些功能？',
      answer: '您可以参考我们的案例，或者下载需求模板，模板中有详细的功能列表供您选择。如有疑问，也可以直接联系我们咨询。',
    },
    {
      question: '一个网站开发需要多长时间？',
      answer: '根据网站的复杂程度不同，一般简单的企业官网需要2-4周，复杂的电商或功能型网站可能需要1-3个月。',
    },
    {
      question: '提交需求需要支付费用吗？',
      answer: '提交需求和获取初步方案是完全免费的。只有在您确认方案并决定合作后，才需要支付首期款项。',
    },
  ];

  // 文件上传配置
  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // 验证文件类型
      const isDocOrPdf = file.type === 'application/msword' || 
                        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
                        file.type === 'application/pdf';
      if (!isDocOrPdf) {
        message.error('请上传DOC、DOCX或PDF文件!');
        return Upload.LIST_IGNORE;
      }

      // 验证文件大小，限制为10MB
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('文件大小不能超过10MB!');
        return Upload.LIST_IGNORE;
      }

      setFileList([...fileList, file]);
      return false; // 阻止自动上传
    },
    fileList,
  };

  // 表单提交处理
  const handleSubmit = (values: any) => {
    if (fileList.length === 0) {
      message.error('请上传需求文档');
      return;
    }

    console.log('表单值:', values);
    console.log('上传文件:', fileList);
    
    // 模拟提交成功
    message.success('需求提交成功，我们将尽快与您联系!');
    setSubmitSuccess(true);
    
    // 重置表单和文件列表
    form.resetFields();
    setFileList([]);
    
    // 5秒后隐藏成功提示
    setTimeout(() => {
      setSubmitSuccess(false);
    }, 5000);
  };

  return (
    <div>
      {/* 页面标题 */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '60px 0', textAlign: 'center', marginBottom: 50, marginTop: 50 }}>
        <Title level={1}>提交需求</Title>
        <Paragraph style={{ fontSize: 18, color: '#777' }}>告诉我们您的网站需求，我们将为您提供专业的解决方案</Paragraph>
      </div>

      <div style={{ padding: '0 20px 50px' }}>
        <Row gutter={30} style={{ maxWidth: 1600, margin: '0 auto' }}>
          {/* 提交步骤说明 */}
          <Col xs={24} lg={24}>
            <Card style={{ marginBottom: 30 }}>
              <Title level={3} style={{ marginBottom: 30 }}>如何提交需求</Title>
              <Steps
                direction="horizontal"
                current={-1}
                items={[
                  {
                    title: '下载需求模板',
                    description: '选择适合您企业类型的需求模板文档',
                    icon: <DownloadOutlined />,
                  },
                  {
                    title: '填写需求文档',
                    description: '按照模板中的指导填写您的具体需求',
                    icon: <FormOutlined />,
                  },
                  {
                    title: '上传需求文档',
                    description: '将文档上传并留下您的联系方式',
                    icon: <UploadOutlined />,
                  },
                ]}
              />
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            {/* 需求模板下载 */}
            <Card title="需求模板下载" style={{ marginBottom: 30 }}>
              {templates.map((template) => (
                <div
                  key={template.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 20,
                    border: '1px solid #eee',
                    borderRadius: 5,
                    marginBottom: 20,
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{ fontSize: 40, marginRight: 20, color: '#3498db' }}>📄</div>
                  <div style={{ flex: 1 }}>
                    <Title level={4} style={{ marginBottom: 5 }}>
                      {template.title}
                    </Title>
                    <Paragraph style={{ color: '#777', marginBottom: 10 }}>
                      {template.description}
                    </Paragraph>
                    <Button
                      type="primary"
                      href={`/templates/${template.fileName}`}
                      download={template.fileName}
                      icon={<DownloadOutlined />}
                    >
                      下载模板
                    </Button>
                  </div>
                </div>
              ))}
            </Card>
          </Col>

          {/* 需求提交表单 */}
          <Col xs={24} lg={12}>
            <Card title="需求提交" style={{ marginBottom: 30 }}>
              {submitSuccess && (
                <Alert
                  message="提交成功！"
                  description="我们已收到您的需求文档，将在1-2个工作日内与您联系。"
                  type="success"
                  showIcon
                  style={{ marginBottom: 20 }}
                />
              )}

              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                  label="上传需求文档"
                  name="requirement"
                  rules={[{ required: true, message: '请上传需求文档!' }]}
                >
                  <Upload.Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到此处上传</p>
                    <p className="ant-upload-hint">
                      支持 .doc, .docx, .pdf 格式，文件大小不超过10MB
                    </p>
                  </Upload.Dragger>
                </Form.Item>

                <Form.Item
                  label="您的姓名"
                  name="name"
                  rules={[{ required: true, message: '请输入您的姓名!' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="请输入您的姓名" />
                </Form.Item>

                <Form.Item
                  label="公司名称"
                  name="company"
                  rules={[{ required: true, message: '请输入公司名称!' }]}
                >
                  <Input prefix={<BankOutlined />} placeholder="请输入公司名称" />
                </Form.Item>

                <Form.Item
                  label="联系电话"
                  name="phone"
                  rules={[
                    { required: true, message: '请输入联系电话!' },
                    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码!' },
                  ]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="请输入联系电话" />
                </Form.Item>

                <Form.Item
                  label="电子邮箱"
                  name="email"
                  rules={[
                    { required: true, message: '请输入电子邮箱!' },
                    { type: 'email', message: '请输入正确的邮箱格式!' },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="请输入电子邮箱" />
                </Form.Item>

                <Form.Item label="其他补充说明（选填）" name="message">
                  <TextArea
                    placeholder="请输入其他需要补充的信息"
                    rows={4}
                    showCount
                    maxLength={500}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" size="large" block>
                    提交需求
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>

        {/* 常见问题 */}
        <Card title="常见问题" style={{ marginBottom: 30 }}>
          <Collapse bordered={false}>
            {faqs.map((faq, index) => (
              <Panel header={faq.question} key={index}>
                <p>{faq.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </Card>
      </div>
    </div>
  );
};

export default Requirement; 