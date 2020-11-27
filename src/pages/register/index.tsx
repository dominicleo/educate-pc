import React from 'react';
import { Helmet, IRouteComponentProps } from 'umi';

import s from './index.less';

const Page: React.FC<IRouteComponentProps> = () => {
  return (
    <div>
      <Helmet>
        <title>注册账号</title>
      </Helmet>
      <h1 className={s.title}>Page register/index</h1>
    </div>
  );
};

export default Page;
