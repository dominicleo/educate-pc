import React from 'react';
import { IRouteComponentProps } from 'umi';
import s from './index.less';

const Page: React.FC<IRouteComponentProps> = () => {
  return (
    <div>
      <h1 className={s.title}>Page authorize/index</h1>
    </div>
  );
}

export default Page;
