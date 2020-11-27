import { Card } from 'antd';
import React from 'react';
import { history, IRouteComponentProps, Link } from 'umi';

import { APP_NAME } from '@/constants/common';

import s from './index.less';

const CARD_LAYOUT_PAGES_TABS = [
  {
    key: '/login',
    tab: '账号登录',
  },
  {
    key: '/register',
    tab: '注册账号',
  },
];

const CARD_LAYOUT_PAGES = ['login', 'register'];
const CARD_LAYOUT_REG = new RegExp(`^\\/(${CARD_LAYOUT_PAGES.join('|')})`);

const UserLayout: React.FC<IRouteComponentProps> = (props) => {
  const {
    location: { pathname, query },
    children,
  } = props;

  let content = children;

  if (CARD_LAYOUT_REG.test(pathname)) {
    content = (
      <Card
        tabList={CARD_LAYOUT_PAGES_TABS}
        activeTabKey={pathname}
        className={s.main}
        onTabChange={(key) => history.replace({ pathname: key, query })}
        bordered={false}
      >
        {children}
      </Card>
    );
  }

  return (
    <div className={s.layout}>
      <div className={s.header}>
        <Link to="/">{APP_NAME}</Link>
      </div>
      <div className={s.logo} />
      <div className={s.content}>{content}</div>
    </div>
  );
};

export default UserLayout;
