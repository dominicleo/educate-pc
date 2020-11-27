import './index.less';

import { useInViewport } from 'ahooks';
import { Avatar, Col, Divider, Row, Skeleton, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import { hasOwnProperty } from '@/utils';

import Ellipsis from '../ellipsis';

interface CourseCardLoaderProps {
  prefixCls?: string;
}

const CourseCardLoader: React.FC<CourseCardLoaderProps> = ({ prefixCls }) => {
  return (
    <div className={`${prefixCls} ${prefixCls}-loader`}>
      <div className={`${prefixCls}-cover`} />
      <div className={`${prefixCls}-content`}>
        <Skeleton paragraph={{ rows: 4 }} />
      </div>
    </div>
  );
};

CourseCardLoader.defaultProps = {
  prefixCls: 'course-card',
};

interface CourseCard {
  prefixCls?: string;
  /** 课程名称 */
  title: string;
  /** 课程封面 */
  cover?: string;
  /** 头像 */
  avatar?: string;
  /** 姓名 */
  name?: string;
  /** 课时数量 */
  lessonCount: number;
  /** 价格 */
  price: string | number;
  /** 是否免费 */
  free: boolean;
  /** 报名人数 */
  enrolment?: number;
  /** 点击事件 */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const CourseCard: React.FC<CourseCard> & {
  Loader: React.FC<CourseCardLoaderProps>;
} = ({
  prefixCls,
  title,
  cover,
  avatar,
  name,
  lessonCount,
  price,
  free,
  enrolment,
  onClick,
}) => {
  const [coverURL, setCoverURL] = useState('');

  const element = useRef<any>();
  const isInViewport = useInViewport(element);
  const isMounted = useRef<any>(false);

  const setCover = async () => {
    if (coverURL || !isInViewport || !cover) return;

    const response = await axios(cover);
    if (!/image/i.test(response?.headers['content-type'])) return;
    const isOSS = hasOwnProperty(response.headers, 'x-oss-request-id');
    const resource = isOSS
      ? `${cover}?x-oss-process=resize,m_mfit,h_280`
      : cover;

    if (!isMounted.current) return;
    setCoverURL(resource);
  };

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setCover();
  }, [cover, isInViewport]);

  return (
    <div ref={element} className={prefixCls} onClick={onClick}>
      <div
        className={`${prefixCls}-cover`}
        style={coverURL ? { backgroundImage: `url(${coverURL})` } : {}}
      />
      <div className={`${prefixCls}-content`}>
        <Space direction="vertical" size={20}>
          <Ellipsis className={`${prefixCls}-title`} rows={2}>
            {title}
          </Ellipsis>
          <Space size={8} align="center" className={`${prefixCls}-details`}>
            {(!!avatar || !!name) && (
              <Avatar size={22} src={avatar} srcSet={avatar}>
                {name}
              </Avatar>
            )}
            {!!name && <div className={`${prefixCls}-name`}>{name}</div>}
            {lessonCount && lessonCount > 0 && (
              <span className={`${prefixCls}-lesson-count`}>
                {lessonCount}课时
              </span>
            )}
          </Space>
        </Space>
        <Divider />
        <Row align="middle" justify="space-between">
          <Col>
            {free ? (
              <div className={`${prefixCls}-free`}>免费</div>
            ) : (
              <div className={`${prefixCls}-price`}>
                <span className={`${prefixCls}-unit`}>￥</span>
                <span className={`${prefixCls}-amount`}>{price}</span>
              </div>
            )}
          </Col>
          <Col>
            <div className={`${prefixCls}-extra`}>{enrolment}人报名</div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

CourseCard.defaultProps = {
  prefixCls: 'course-card',
  enrolment: 0,
};

CourseCard.Loader = CourseCardLoader;

export default CourseCard;
