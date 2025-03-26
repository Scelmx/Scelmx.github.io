import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Typography, Row, Col, Card, Button, Divider, Tag, Image, Space } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined, TagOutlined, GlobalOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface CaseDetailData {
  id: number;
  title: string;
  description: string;
  headerImage: string;
  category: string;
  date: string;
  client: string;
  clientDescription: string;
  projectType: string;
  technologies: string[];
  projectUrl: string;
  background: string;
  designIdea: string;
  features: string[];
  process: string[];
  results: string;
  images: string[];
  relatedCases: number[];
}

const caseDetailsData: Record<number, CaseDetailData> = {
  1: {
    id: 1,
    title: '川香餐厅官网',
    description: '为本地知名川菜餐厅打造的品牌形象网站，展示菜品特色和线上预订功能。',
    headerImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    category: '餐饮美食',
    date: '2023-10-15',
    client: '川香餐厅',
    clientDescription: '成立于2015年的本地知名川菜餐厅，有三家连锁店。',
    projectType: '企业官网',
    technologies: ['React', 'Node.js', 'MongoDB'],
    projectUrl: 'http://www.example.com',
    background: '川香餐厅是一家成立于2015年的本地连锁川菜餐厅，在当地拥有很高的知名度。随着线上订餐平台的兴起，客户希望打造一个专业的品牌官网，以展示餐厅特色、菜品信息，并提供线上预订功能，吸引更多顾客。',
    designIdea: '设计采用了富有中国传统元素的现代简约风格，大量使用红色和金色作为主色调，体现川菜的热情与活力。在功能设计上，注重突出菜品展示和预订流程，同时提供门店地址、营业时间等关键信息，方便用户快速获取所需信息。',
    features: [
      '响应式设计，适配各种设备',
      '菜品分类展示，高清图片与详细介绍',
      '在线预订系统，方便用户预约就餐',
      '各门店地址与电话查询',
      '餐厅动态与优惠活动发布',
    ],
    process: [
      '与客户进行多次沟通，明确网站需求与目标',
      '设计网站原型与页面布局，确定色彩方案',
      '开发前端界面，实现响应式布局',
      '开发后端系统，实现预订功能',
      '网站测试与优化，确保各功能正常运行',
      '上线部署，提供使用培训',
    ],
    results: '网站上线后一个月内，餐厅线上预订量增加了30%，网站访问量达到日均300人次。客户对网站的设计与功能非常满意，认为网站很好地展示了餐厅形象，提升了品牌价值，同时简化了预订流程，提高了客户体验。',
    images: [
      'https://images.unsplash.com/photo-1555396273-3ed3cdb5ed0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    relatedCases: [6, 4, 9],
  },
  2: {
    id: 2,
    title: '未来学院网站',
    description: '专注于少儿编程的教育培训机构网站，包含课程展示和在线报名系统。',
    headerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    category: '教育培训',
    date: '2023-08-20',
    client: '未来学院',
    clientDescription: '专注于3-16岁青少年编程教育的培训机构。',
    projectType: '企业官网 + 在线教育',
    technologies: ['Vue.js', 'Spring Boot', 'MySQL'],
    projectUrl: 'http://www.example.com',
    background: '未来学院是一家专注于少儿编程教育的培训机构，随着业务规模扩大，传统的线下宣传和管理方式已不能满足需求。客户希望建立一个专业的网站，不仅能展示课程信息、师资力量，还能提供在线报名、学员管理等功能，提升招生效率和管理水平。',
    designIdea: '网站设计采用了活泼明快的风格，使用蓝色和橙色作为主色调，符合面向青少年的产品特性。界面设计简洁清晰，重点突出课程内容和报名流程，让家长和学生能够轻松获取所需信息并完成报名。',
    features: [
      '课程分类展示，详细介绍各类编程课程',
      '教师团队介绍，展示专业师资力量',
      '在线报名系统，支持课程预约和学费支付',
      '学员作品展示区，展示学习成果',
      '学员管理系统，记录学习进度和成绩',
      '家校沟通平台，方便家长与教师交流',
    ],
    process: [
      '需求分析，确定网站功能模块和设计风格',
      '网站架构设计，规划各功能模块之间的关系',
      '原型设计和页面布局，确定用户界面',
      '前端开发，实现响应式设计',
      '后端系统开发，实现数据管理和业务逻辑',
      '功能测试和性能优化，确保系统稳定运行',
      '上线部署和人员培训',
    ],
    results: '网站上线后，未来学院的在线报名人数较以往增长了50%，管理效率提升明显，大大减轻了行政人员的工作负担。家长对在线报名和进度查询功能的反馈非常积极，认为这些功能方便了他们对孩子学习情况的了解和参与。',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    relatedCases: [7, 3, 5],
  },
  // 其他案例数据...
};

// 示例相关案例数据
const relatedCasesData = [
  {
    id: 3,
    title: '清颜美容中心',
    description: '高端美容护理中心的品牌网站，展示专业服务和在线预约功能。',
    image: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
  },
  {
    id: 4,
    title: '自然生活杂货店',
    description: '专注于有机食品和环保用品的零售店网站，包含产品展示和电商功能。',
    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
  },
  {
    id: 5,
    title: '安心家政服务',
    description: '提供专业家政服务的企业网站，展示服务内容和在线预约系统。',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
  },
  {
    id: 6,
    title: '甜蜜烘焙坊',
    description: '专注于手工蛋糕和甜点的烘焙店网站，展示产品和线上订购系统。',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0bfadc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
  },
  {
    id: 7,
    title: '乐途语言中心',
    description: '提供多语种培训的语言学习中心网站，包含课程介绍和学习资源。',
    image: 'https://images.unsplash.com/photo-1511377107391-116a9158639c?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
  },
  {
    id: 9,
    title: '原木家具店',
    description: '手工原木家具零售店的品牌网站，展示产品特色和定制服务。',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
  },
];

const CaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [caseData, setCaseData] = useState<CaseDetailData | null>(null);
  const [relatedCases, setRelatedCases] = useState<any[]>([]);

  useEffect(() => {
    if (id && caseDetailsData[Number(id)]) {
      setCaseData(caseDetailsData[Number(id)]);

      // 获取相关案例数据
      if (caseDetailsData[Number(id)].relatedCases) {
        const related = caseDetailsData[Number(id)].relatedCases.map(relatedId =>
          relatedCasesData.find(item => item.id === relatedId)
        ).filter(Boolean);
        setRelatedCases(related);
      }
    }
    // 滚动到页面顶部
    window.scrollTo(0, 0);
  }, [id]);

  if (!caseData) {
    return (
      <div style={{ maxWidth: 1200, margin: '100px auto', textAlign: 'center' }}>
        <Title level={2}>案例不存在或已被删除</Title>
        <Link to="/cases">
          <Button type="primary" icon={<ArrowLeftOutlined />} size="large" style={{ marginTop: 20 }}>
            返回案例列表
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* 案例头部信息 */}
      <div
        style={{
          height: 400,
          backgroundImage: `url(${caseData.headerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '30px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            color: '#fff',
          }}
        >
          <div style={{ maxWidth: 1600, margin: '0 auto', padding: '0 20px' }}>
            <Tag color="blue" style={{ marginBottom: 16, fontSize: 14, padding: '2px 12px' }}>
              {caseData.category}
            </Tag>
            <Title level={1} style={{ color: '#fff', marginBottom: 16, fontSize: 36, fontWeight: 600 }}>
              {caseData.title}
            </Title>
            <Space size={24} style={{ fontSize: 15 }}>
              <span>
                <ClockCircleOutlined style={{ marginRight: 8 }} /> {caseData.date}
              </span>
              <span>
                <TagOutlined style={{ marginRight: 8 }} /> {caseData.projectType}
              </span>
              <span>
                <UserOutlined style={{ marginRight: 8 }} /> {caseData.client}
              </span>
            </Space>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1600, margin: '0 auto', padding: '50px 20px' }}>
        <Row gutter={[40, 40]}>
          {/* 主要内容区域 */}
          <Col xs={24} md={16}>
            <div style={{ marginBottom: 40 }}>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, textAlign: 'justify' }}>{caseData.description}</Paragraph>
            </div>

            {/* 项目背景 */}
            <div style={{ marginBottom: 40 }}>
              <Title level={3} style={{ fontWeight: 600 }}>项目背景</Title>
              <Divider style={{ marginTop: 16, marginBottom: 24 }} />
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, textAlign: 'justify' }}>{caseData.background}</Paragraph>
            </div>

            {/* 设计理念 */}
            <div style={{ marginBottom: 40 }}>
              <Title level={3} style={{ fontWeight: 600 }}>设计理念</Title>
              <Divider style={{ marginTop: 16, marginBottom: 24 }} />
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, textAlign: 'justify' }}>{caseData.designIdea}</Paragraph>
            </div>

            {/* 功能特点 */}
            <div style={{ marginBottom: 40 }}>
              <Title level={3} style={{ fontWeight: 600 }}>功能特点</Title>
              <Divider style={{ marginTop: 16, marginBottom: 24 }} />
              <ul style={{ paddingLeft: 24, marginBottom: 0 }}>
                {caseData.features.map((feature, index) => (
                  <li key={index} style={{ fontSize: 16, textAlign: 'left', marginBottom: 12, lineHeight: 1.8 }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* 实施过程 */}
            <div style={{ marginBottom: 40 }}>
              <Title level={3} style={{ fontWeight: 600 }}>实施过程</Title>
              <Divider style={{ marginTop: 16, marginBottom: 24 }} />
              <ol style={{ paddingLeft: 24, marginBottom: 0 }}>
                {caseData.process.map((step, index) => (
                  <li key={index} style={{ fontSize: 16, textAlign: 'left', marginBottom: 12, lineHeight: 1.8 }}>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* 项目成果 */}
            <div style={{ marginBottom: 40 }}>
              <Title level={3} style={{ fontWeight: 600 }}>项目成果</Title>
              <Divider style={{ marginTop: 16, marginBottom: 24 }} />
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, textAlign: 'justify' }}>{caseData.results}</Paragraph>
            </div>

            {/* 项目图片 */}
            <div style={{ marginBottom: 50 }}>
              <Title level={3} style={{ fontWeight: 600 }}>项目展示</Title>
              <Divider style={{ marginTop: 16, marginBottom: 24 }} />
              <Image.PreviewGroup>
                <Row gutter={[24, 24]}>
                  {caseData.images.map((image, index) => (
                    <Col xs={24} sm={12} key={index}>
                      <Image
                        src={image}
                        alt={`${caseData.title} - 图片${index + 1}`}
                        style={{ width: '100%', borderRadius: '4px' }}
                      />
                    </Col>
                  ))}
                </Row>
              </Image.PreviewGroup>
            </div>
          </Col>

          {/* 侧边栏 */}
          <Col xs={24} md={8}>
            <Card style={{ marginBottom: 30, borderRadius: '4px' }}>
              <Title level={4} style={{ fontWeight: 600, marginBottom: 16 }}>客户信息</Title>
              <Divider style={{ marginTop: 0, marginBottom: 20 }} />
              <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 15 }}>客户名称:</p>
              <p style={{ marginBottom: 20, fontSize: 15 }}>{caseData.client}</p>
              <p style={{ marginBottom: 0, fontSize: 15, lineHeight: 1.8 }}>{caseData.clientDescription}</p>
            </Card>

            <Card style={{ marginBottom: 30, borderRadius: '4px' }}>
              <Title level={4} style={{ fontWeight: 600, marginBottom: 16 }}>项目信息</Title>
              <Divider style={{ marginTop: 0, marginBottom: 20 }} />
              <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 15 }}>项目类型:</p>
              <p style={{ marginBottom: 20, fontSize: 15 }}>{caseData.projectType}</p>
              <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 15 }}>使用技术:</p>
              <div style={{ marginBottom: 20 }}>
                {caseData.technologies.map((tech, index) => (
                  <Tag key={index} color="blue" style={{ marginBottom: 8, marginRight: 8 }}>
                    {tech}
                  </Tag>
                ))}
              </div>
              <p style={{ fontWeight: 'bold', marginBottom: 8, fontSize: 15 }}>项目地址:</p>
              <p style={{ marginBottom: 0, fontSize: 15 }}>
                <a href={caseData.projectUrl} target="_blank" rel="noopener noreferrer">
                  <GlobalOutlined /> 访问网站
                </a>
              </p>
            </Card>

            <Card style={{ marginBottom: 30, borderRadius: '4px' }}>
              <Title level={4} style={{ fontWeight: 600, marginBottom: 16 }}>需要类似网站?</Title>
              <Divider style={{ marginTop: 0, marginBottom: 20 }} />
              <p style={{ marginBottom: 20, fontSize: 15, lineHeight: 1.8 }}>我们可以为您的企业打造类似的高质量网站，提升品牌形象和用户体验。</p>
              <Link to="/requirement">
                <Button type="primary" block size="large">
                  立即咨询
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>

        {/* 相关案例 */}
        {relatedCases.length > 0 && (
          <div style={{ marginTop: 60 }}>
            <Title level={3} style={{ fontWeight: 600, textAlign: 'center' }}>相关案例</Title>
            <Divider style={{ marginTop: 16, marginBottom: 40 }} />
            <Row gutter={[30, 30]}>
              {relatedCases.map((relatedCase) => (
                <Col xs={24} sm={12} md={8} key={relatedCase.id}>
                  <Card
                    hoverable
                    style={{ borderRadius: '8px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}
                    cover={
                      <div
                        style={{
                          height: 200,
                          backgroundImage: `url(${relatedCase.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    }
                    bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                  >
                    <Card.Meta
                      title={<span style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, display: 'block' }}>{relatedCase.title}</span>}
                      description={<div style={{ lineHeight: 1.6, color: 'rgba(0,0,0,0.65)', marginBottom: 16 }}>{relatedCase.description}</div>}
                      style={{ marginBottom: 'auto' }}
                    />
                    <Link to={`/case-detail/${relatedCase.id}`}>
                      <Button type="primary" style={{ borderRadius: '4px' }}>查看详情</Button>
                    </Link>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* 返回按钮 */}
        <div style={{ marginTop: 80, textAlign: 'center' }}>
          <Link to="/cases">
            <Button
              icon={<ArrowLeftOutlined />}
              size="large"
              style={{
                padding: '0 30px',
                height: '44px',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontWeight: '500'
              }}
            >
              返回案例列表
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail; 