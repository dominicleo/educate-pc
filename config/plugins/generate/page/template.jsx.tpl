import React from 'react';
import s from './{{{ name }}}{{{ cssExt }}}';

const Page = () => {
  return (
    <div>
      <h1 className={s.title}>Page {{{ path }}}</h1>
    </div>
  );
}

export default Page;
