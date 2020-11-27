import { Affix, Button, Col, Input, Menu, Row } from 'antd';
import classnames from 'classnames';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { history, Link } from 'umi';

import Container from '@/components/container';
import { APP_NAME } from '@/constants/common';
import { useAuthorize } from '@/hooks';
import { isArray } from '@/utils';
import { SearchOutlined } from '@ant-design/icons';

import s from './index.less';

const { Search } = Input;

const menus = [
  {
    path: '/',
    title: '首页',
  },
  {
    path: '/learn',
    title: '我的学习',
    children: [
      {
        path: '/lerna/course',
        title: '我的课程',
      },
      {
        path: '/lerna/homework',
        title: '我的作业',
      },
      {
        path: '/lerna/testpaper',
        title: '我的考试',
      },
    ],
  },
  {
    path: '/teach',
    title: '我的教学',
    children: [
      {
        path: '/teach/question',
        title: '题库管理',
      },
      {
        path: '/teach/testpaper',
        title: '试卷管理',
      },
      {
        path: '/teach/check',
        title: '在线批阅',
      },
    ],
  },
];

const Userinfo = () => {
  return <></>;
};

const LoginRegister = () => {
  return (
    <>
      <Col>
        <Link to="/login">登录</Link>
      </Col>
      <Col>
        <Button type="primary" onClick={() => history.push('/register')}>
          立即注册
        </Button>
      </Col>
    </>
  );
};

const GlobalHeader: React.FC = () => {
  const [affixed, setAffixed] = useState(false);
  const { isAuthorize } = useAuthorize();

  const [keyword, setKeyword] = useState('');

  // const { query, pathname } = history.location;
  // const isSearchPage = /^\/course/i.test(pathname);
  // const onSearch = (value: string) => {
  //   if (keyword === value) return;
  //   const type = isSearchPage ? 'replace' : 'push';
  //   const querystring = isSearchPage ? query : {};

  //   querystring.keyword = value ? value : undefined;

  //   history[type]({
  //     pathname: '/course',
  //     query: querystring,
  //   });
  // };

  // const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = event.target;
  //   setKeyword(value);
  //   onSearch(value);
  // };

  // useEffect(() => {
  //   setKeyword(isSearchPage ? query.keyword : '');
  // }, [pathname]);

  return (
    <Affix onChange={(value) => setAffixed(value!)}>
      <header className={classnames(s.wrapper, { [s.affixed]: affixed })}>
        <Container>
          <Row className={s.header} align="middle" gutter={24}>
            <Col span={5}>
              <Link to="/" className={s.logo}>
                {APP_NAME}
              </Link>
            </Col>
            <Col span={8}>
              <Menu mode="horizontal" selectedKeys={[]}>
                {menus.map((menu) =>
                  isArray(menu.children) ? (
                    <Menu.SubMenu
                      key={menu.path}
                      title={<Link to={menu.path}>{menu.title}</Link>}
                    >
                      {menu.children.map((item) => (
                        <Menu.Item key={item.path}>
                          <Link to={item.path}>{item.title}</Link>
                        </Menu.Item>
                      ))}
                    </Menu.SubMenu>
                  ) : (
                    <Menu.Item key={menu.path}>
                      <Link to={menu.path}>{menu.title}</Link>
                    </Menu.Item>
                  ),
                )}
              </Menu>
            </Col>
            <Col span={6}>
              {/* <Search
                value={keyword}
                className={s.search}
                prefix={<SearchOutlined />}
                placeholder="请输入课程名称"
                onChange={onChangeSearchValue}
                onSearch={onSearch}
                allowClear
                enterButton
              /> */}
            </Col>
            <Col xs={{ span: 0 }} md={{ span: 5 }}>
              <Row align="middle" justify="end" gutter={28}>
                {isAuthorize ? <Userinfo /> : <LoginRegister />}
              </Row>
            </Col>
          </Row>
        </Container>
      </header>
    </Affix>
  );
};

export default GlobalHeader;
