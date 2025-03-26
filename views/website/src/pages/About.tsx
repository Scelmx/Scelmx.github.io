import React from 'react';
import { Typography, Row, Col, Card, Divider } from 'antd';
import { SettingOutlined, BgColorsOutlined, MobileOutlined, RocketOutlined, SafetyOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  avatar: string;
  contacts: { type: string; link: string }[];
}

interface Capability {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const About: React.FC = () => {
  // 团队成员数据
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: '张伟',
      role: '创始人 / 项目总监',
      description: '拥有10年网站设计和开发经验，曾服务于多家知名企业。',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      contacts: [
        { type: '微信', link: '#' },
        { type: '微博', link: '#' },
        { type: '邮箱', link: '#' },
      ],
    },
    {
      id: 2,
      name: '李娜',
      role: 'UI/UX设计师',
      description: '专注于用户体验和界面设计，擅长创造美观且实用的网站设计。',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      contacts: [
        { type: '微信', link: '#' },
        { type: '微博', link: '#' },
        { type: '邮箱', link: '#' },
      ],
    },
    {
      id: 3,
      name: '王强',
      role: '前端开发工程师',
      description: '精通HTML、CSS、JavaScript等前端技术，追求卓越的代码质量。',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      contacts: [
        { type: '微信', link: '#' },
        { type: '微博', link: '#' },
        { type: '邮箱', link: '#' },
      ],
    },
    {
      id: 4,
      name: '赵丽',
      role: '后端工程师',
      description: '负责系统架构和后端开发，确保网站稳定、高效运行。',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      contacts: [
        { type: '微信', link: '#' },
        { type: '微博', link: '#' },
        { type: '邮箱', link: '#' },
      ],
    },
  ];

  // 能力展示数据
  const capabilities: Capability[] = [
    {
      id: 1,
      icon: <SettingOutlined style={{ fontSize: 40, color: '#3498db' }} />,
      title: '响应式设计',
      description: '我们的网站设计适配所有设备，无论是电脑、平板还是手机，都能完美呈现。',
    },
    {
      id: 2,
      icon: <BgColorsOutlined style={{ fontSize: 40, color: '#3498db' }} />,
      title: '创意UI设计',
      description: '我们的设计师会为您创造独特的视觉体验，让您的网站脱颖而出。',
    },
    {
      id: 3,
      icon: <MobileOutlined style={{ fontSize: 40, color: '#3498db' }} />,
      title: '用户体验优化',
      description: '我们注重用户体验，确保您的网站易于导航，提高用户转化率。',
    },
    {
      id: 4,
      icon: <RocketOutlined style={{ fontSize: 40, color: '#3498db' }} />,
      title: '性能优化',
      description: '我们的网站加载速度快，性能优秀，提供更好的用户体验。',
    },
    {
      id: 5,
      icon: <SafetyOutlined style={{ fontSize: 40, color: '#3498db' }} />,
      title: 'SEO优化',
      description: '我们的网站符合搜索引擎优化标准，帮助您提高网站排名。',
    },
    {
      id: 6,
      icon: <SafetyOutlined style={{ fontSize: 40, color: '#3498db' }} />,
      title: '安全可靠',
      description: '我们注重网站安全，保护您的网站免受黑客攻击。',
    },
  ];

  return (
    <div>
      {/* 页面标题 */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '60px 0', textAlign: 'center', marginBottom: 50, marginTop: 50 }}>
        <Title level={1}>关于我们</Title>
        <Paragraph style={{ fontSize: 18, color: '#777' }}>了解我们的团队与企业实力</Paragraph>
      </div>

      <div style={{ padding: '0 20px', maxWidth: 1600, margin: '0 auto' }}>
        {/* 公司简介 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginBottom: 50 }}>
          <div style={{ flex: '1 1 400px' }}>
            <img
              src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
              alt="关于微企定制"
              style={{ width: '100%', borderRadius: 5, boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
            />
          </div>
          <div style={{ flex: '1 1 400px' }}>
            <Title level={3}>我们的故事</Title>
            <Paragraph>
              微企定制成立于2018年，是一家专注于为小微企业提供高质量网站定制服务的团队。
              我们深知在当今数字化时代，一个专业的网站对于小微企业的品牌建设和业务拓展有着至关重要的作用。
            </Paragraph>
            <Paragraph>
              五年来，我们已经为超过200家小微企业提供了网站设计和开发服务，帮助他们在数字世界中建立起专业的品牌形象，
              提升了企业的影响力和竞争力。
            </Paragraph>
            <Paragraph>
              我们的团队由一群充满激情和创造力的设计师、开发者和营销专家组成，他们拥有丰富的经验和专业知识，
              致力于为客户提供最优质的服务。
            </Paragraph>
          </div>
        </div>

        <Divider />

        {/* 能力展示 */}
        <div style={{ marginBottom: 50 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Title level={2}>我们的能力</Title>
            <Paragraph style={{ fontSize: 16, color: '#777' }}>我们提供全方位的网站定制服务</Paragraph>
          </div>

          <Row gutter={[30, 30]}>
            {capabilities.map((item) => (
              <Col xs={24} sm={12} md={8} key={item.id}>
                <Card
                  hoverable
                  style={{ textAlign: 'center', padding: '10px 0', height: '100%' }}
                >
                  <div style={{ fontSize: 40, marginBottom: 20 }}>{item.icon}</div>
                  <Title level={4}>{item.title}</Title>
                  <Paragraph>{item.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <Divider />

        {/* 团队介绍 */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Title level={2}>我们的团队</Title>
            <Paragraph style={{ fontSize: 16, color: '#777' }}>专业的人做专业的事</Paragraph>
          </div>

          <Row gutter={[30, 30]}>
            {teamMembers.map((member) => (
              <Col xs={24} sm={12} md={6} key={member.id}>
                <Card
                  hoverable
                  cover={
                    <div style={{ height: 250, backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  }
                  style={{ height: '100%' }}
                >
                  <Card.Meta
                    title={<Title level={4}>{member.name}</Title>}
                    description={
                      <>
                        <p style={{ color: '#777', marginBottom: 10 }}>{member.role}</p>
                        <p>{member.description}</p>
                      </>
                    }
                  />
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15 }}>
                    {member.contacts.map((contact, index) => (
                      <a
                        key={index}
                        href={contact.link}
                        style={{
                          width: 30,
                          height: 30,
                          backgroundColor: '#3498db',
                          color: '#fff',
                          borderRadius: '50%',
                          display: 'inline-flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          margin: '0 5px',
                        }}
                      >
                        {contact.type.charAt(0)}
                      </a>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default About; 