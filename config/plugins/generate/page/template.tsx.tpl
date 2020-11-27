import React from 'react';
import { IRouteComponentProps } from 'umi';
import s from './{{{ name }}}{{{ cssExt }}}';

const Page: React.FC<IRouteComponentProps> = () => {
  return (
    <div>
      <h1 className={s.title}>Page {{{ path }}}</h1>
    </div>
  );
}

export default Page;
