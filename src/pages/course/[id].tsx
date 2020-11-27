import React from 'react';
import { IRouteComponentProps } from 'umi';

import s from './[id].less';

const Page: React.FC<IRouteComponentProps> = () => {
  return (
    <div>
      <h1 className={s.title}>Page course/[id].tsx</h1>
    </div>
  );
};

export default Page;
