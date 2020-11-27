import { Button, Result } from 'antd';
import React from 'react';
import { Helmet, history, IRoute, IRouteComponentProps } from 'umi';

import s from './[any].less';

const NotFound: React.FC<IRouteComponentProps> & IRoute = () => {
  const onClick = () => {
    history.push('/');
  };
  return (
    <div className={s.wrapper}>
      <Helmet>
        <title>页面不存在</title>
      </Helmet>
      <Result
        status="404"
        title="404"
        subTitle="对不起，您访问的页面不存在。"
        extra={
          <Button type="primary" onClick={onClick}>
            回到首页
          </Button>
        }
      />
    </div>
  );
};

NotFound.path = undefined;

export default NotFound;
