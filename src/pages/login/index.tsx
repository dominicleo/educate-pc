import React from 'react';
import { Helmet, IRouteComponentProps } from 'umi';

import s from './index.less';

const Page: React.FC<IRouteComponentProps> = () => {
  return (
    <div>
      <Helmet>
        <title>账号登录</title>
      </Helmet>
      <h1 className={s.title}>Page login/index</h1>
    </div>
  );
};

export default Page;
