import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'umi';

import Container from '@/components/container';

import s from './index.less';

interface LinkProps {
  title: React.ReactNode;
  href: string;
}

interface GlobalFooterProps {
  links?: LinkProps[];
  copyright?: React.ReactNode;
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({ links, copyright }) => {
  return (
    <footer className={s.wrapper}>
      <Container>
        <Row className={s.footer} align="middle">
          <Col flex={1}>
            <Row gutter={30}>
              {links &&
                links.map((link, index) => (
                  <Col key={`footer_link_${index}`}>
                    <Link to={link.href}>{link.title}</Link>
                  </Col>
                ))}
            </Row>
          </Col>
          <Col>{copyright}</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default GlobalFooter;
