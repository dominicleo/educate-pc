import { Col, Layout, Row, Space } from 'antd';
import React from 'react';
import { IRouteComponentProps } from 'umi';

import { APP_NAME } from '@/constants/common';
import { CopyrightOutlined } from '@ant-design/icons';

import GlobalFooter from './components/footer';
import GlobalHeader from './components/header';
import s from './index.less';
import UserLayout from './user';

const { Content } = Layout;

const USER_LAYOUT_PAGES = ['login', 'register', 'profile', 'authorize'];
const USER_LAYOUT_REG = new RegExp(`^\\/(${USER_LAYOUT_PAGES.join('|')})`);

const BasicLayout: React.FC<IRouteComponentProps> = (props) => {
  if (USER_LAYOUT_REG.test(props.location.pathname)) {
    return <UserLayout {...props}>{props.children}</UserLayout>;
  }
  return (
    <Layout className={s.layout}>
      <GlobalHeader />
      <Content className={s.content}>{props.children}</Content>
      <GlobalFooter
        links={[
          {
            title: (
              <Space size={5}>
                <CopyrightOutlined />
                <span>{APP_NAME}</span>
              </Space>
            ),
            href: '/',
          },
          {
            title: '使用规范',
            href: '/',
          },
          {
            title: '隐私政策',
            href: '/',
          },
        ]}
        copyright={
          <Row gutter={20}>
            <Col>
              <a href="http://www.beian.miit.gov.cn/" target="blank">
                苏ICP备16043541
              </a>
            </Col>
            <Col>
              <a
                className={s.beian}
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32100302010407"
                target="blank"
              >
                <img src="https://img.alicdn.com/tfs/TB1..50QpXXXXX7XpXXXXXXXXXX-40-40.png" />
                苏公网安备 32100302010407
              </a>
            </Col>
          </Row>
        }
      />
    </Layout>
  );
};

export default BasicLayout;
