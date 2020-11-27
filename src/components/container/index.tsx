import React from 'react';
import classnames from 'classnames';
import './index.less';

interface ContainerProps {
  id?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const Container: React.FC<ContainerProps> = (props) => {
  const { id, className, children, onClick } = props;
  const cls = classnames('container', { [`${className}`]: !!className });

  return (
    <div id={id} className={cls} onClick={onClick}>
      {children}
    </div>
  );
};

export default Container;
