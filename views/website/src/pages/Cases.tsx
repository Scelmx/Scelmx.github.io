import React, { useState } from 'react';
import { Typography, Row, Col, Card, Button, Pagination, Radio } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface CaseItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

const Cases: React.FC = () => {
  // 案例分类选项
  const categories = [
    { value: 'all', label: '全部' },
    { value: 'food', label: '餐饮美食' },
    { value: 'education', label: '教育培训' },
    { value: 'beauty', label: '美容护理' },
    { value: 'retail', label: '零售商店' },
    { value: 'service', label: '服务行业' },
  ];

  // 示例案例数据
  const casesData: CaseItem[] = [
    {
      id: 1,
      title: '川香餐厅官网',
      description: '为本地知名川菜餐厅打造的品牌形象网站，展示菜品特色和线上预订功能。',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'food',
    },
    {
      id: 2,
      title: '未来学院网站',
      description: '专注于少儿编程的教育培训机构网站，包含课程展示和在线报名系统。',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'education',
    },
    {
      id: 3,
      title: '清颜美容中心',
      description: '高端美容护理中心的品牌网站，展示专业服务和在线预约功能。',
      image: 'https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'beauty',
    },
    {
      id: 4,
      title: '自然生活杂货店',
      description: '专注于有机食品和环保用品的零售店网站，包含产品展示和电商功能。',
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'retail',
    },
    {
      id: 5,
      title: '安心家政服务',
      description: '提供专业家政服务的企业网站，展示服务内容和在线预约系统。',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'service',
    },
    {
      id: 6,
      title: '甜蜜烘焙坊',
      description: '专注于手工蛋糕和甜点的烘焙店网站，展示产品和线上订购系统。',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0bfadc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'food',
    },
    {
      id: 7,
      title: '乐途语言中心',
      description: '提供多语种培训的语言学习中心网站，包含课程介绍和学习资源。',
      image: 'https://images.unsplash.com/photo-1511377107391-116a9158639c?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'education',
    },
    {
      id: 8,
      title: '康健按摩理疗',
      description: '专业按摩和理疗中心的品牌网站，展示特色服务和健康资讯。',
      image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'beauty',
    },
    {
      id: 9,
      title: '原木家具店',
      description: '手工原木家具零售店的品牌网站，展示产品特色和定制服务。',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=350&q=80',
      category: 'retail',
    },
  ];

  // 状态管理
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // 根据分类筛选案例
  const filteredCases = casesData.filter(
    (caseItem) => currentCategory === 'all' || caseItem.category === currentCategory
  );

  // 分页处理
  const paginatedCases = filteredCases.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 处理分类变更
  const handleCategoryChange = (e: any) => {
    setCurrentCategory(e.target.value);
    setCurrentPage(1); // 重置当前页码
  };

  // 处理页码变更
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* 页面标题 */}
      <div style={{ backgroundColor: '#f8f9fa', padding: '60px 0', textAlign: 'center', marginBottom: 50, marginTop: 50 }}>
        <Title level={1}>案例展示</Title>
        <Paragraph style={{ fontSize: 18, color: '#777' }}>探索我们为小微企业打造的精彩网站</Paragraph>
      </div>

      <div style={{ padding: '0 20px 50px' }}>
        {/* 筛选栏 */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <Radio.Group
            value={currentCategory}
            onChange={handleCategoryChange}
            buttonStyle="solid"
            size="large"
          >
            {categories.map((category) => (
              <Radio.Button key={category.value} value={category.value}>
                {category.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>

        {/* 案例列表 */}
        <Row gutter={[30, 30]} style={{ maxWidth: 1600, margin: '0 auto' }}>
          {paginatedCases.map((caseItem) => (
            <Col xs={24} sm={12} md={8} key={caseItem.id}>
              <Card
                hoverable
                cover={
                  <div style={{ position: 'relative' }}>
                    <div
                      style={{
                        height: 220,
                        backgroundImage: `url(${caseItem.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: 3,
                        fontSize: 12,
                      }}
                    >
                      {categories.find((cat) => cat.value === caseItem.category)?.label}
                    </span>
                  </div>
                }
                style={{ height: '100%' }}
              >
                <Card.Meta
                  title={caseItem.title}
                  description={caseItem.description}
                  style={{ marginBottom: 15 }}
                />
                <Link to={`/case-detail/${caseItem.id}`}>
                  <Button type="primary">查看详情</Button>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 分页 */}
        {filteredCases.length > pageSize && (
          <div style={{ textAlign: 'center', marginTop: 50 }}>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredCases.length}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cases; 