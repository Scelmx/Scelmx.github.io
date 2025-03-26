import React from 'react';
import { Carousel, Row, Col, Card, Button, Typography } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface SlideItem {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

interface CaseItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Home: React.FC = () => {
  // 示例轮播数据
  const slides: SlideItem[] = [
    {
      id: 1,
      title: '专业的小微企业网站定制服务',
      description: '为您的企业打造独特的在线形象，提升品牌价值',
      image: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      buttonText: '立即咨询',
      buttonLink: '/requirement',
    },
    {
      id: 2,
      title: '响应式设计，全平台兼容',
      description: '无论是电脑、平板还是手机，都能完美呈现',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      buttonText: '查看案例',
      buttonLink: '/cases',
    },
    {
      id: 3,
      title: '专业团队，优质服务',
      description: '从设计到开发，一站式解决您的网站需求',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      buttonText: '了解我们',
      buttonLink: '/about',
    },
  ];

  // 示例案例数据
  const cases: CaseItem[] = [
    {
      id: 1,
      title: '餐饮品牌官网',
      description: '为本地餐饮企业打造现代简约风格的品牌官网',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
    },
    {
      id: 2,
      title: '教育培训机构网站',
      description: '专注于用户体验的教育培训网站设计与开发',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
    },
    {
      id: 3,
      title: '美容护理中心',
      description: '高端美容护理中心的品牌形象展示网站',
      image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
    },
  ];

  return (
    <div>
      {/* 轮播图部分 */}
      <Carousel autoplay effect="fade">
        {slides.map((slide) => (
          <div key={slide.id}>
            <div
              style={{
                height: '100vh',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: '#fff',
                  background: 'rgba(0,0,0,0.5)',
                  padding: 20,
                  borderRadius: 5,
                  width: '80%',
                  maxWidth: 800,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Title level={2} style={{ color: '#fff', marginBottom: 15 }}>
                  {slide.title}
                </Title>
                <Paragraph style={{ fontSize: 18, marginBottom: 20, color: '#fff' }}>
                  {slide.description}
                </Paragraph>
                <Link to={slide.buttonLink}>
                  <Button type="primary" size="large">
                    {slide.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      {/* 案例展示部分 */}
      <div style={{ padding: '50px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={2}>精选案例</Title>
          <Paragraph style={{ color: '#777', fontSize: 16 }}>
            我们为各行各业的小微企业提供了专业的网站定制服务
          </Paragraph>
        </div>

        <Row gutter={[30, 30]} style={{ maxWidth: 1600, margin: '0 auto' }}>
          {cases.map((caseItem) => (
            <Col xs={24} sm={12} md={8} key={caseItem.id}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: 200,
                      backgroundImage: `url(${caseItem.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                }
                style={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)', height: '100%' }}
              >
                <Card.Meta
                  title={caseItem.title}
                  description={caseItem.description}
                  style={{ marginBottom: 15 }}
                />
                <Link to={`/case-detail/${caseItem.id}`}>
                  <Button type="primary">
                    查看详情 <RightOutlined />
                  </Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <Link to="/cases">
            <Button type="primary" size="large">
              查看更多案例
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 