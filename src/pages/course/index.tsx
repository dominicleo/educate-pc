import { useDebounceFn, useRequest, useUpdateEffect } from 'ahooks';
import { Breadcrumb, Button, Checkbox, Col, List, Pagination, Row, Spin } from 'antd';
import { PaginationConfig } from 'antd/lib/pagination';
import { query } from 'express';
import React from 'react';
import { Helmet, history, IRouteComponentProps, Link } from 'umi';

import Container from '@/components/container';
import CourseCard from '@/components/course-card';
import { CourseService } from '@/services';
import {
    Course, CourseGetListParamsSorter, CourseGetListParmas
} from '@/services/course/index.types.d.ts';
import useUrlState from '@ahooksjs/use-url-state';

import s from './index.less';

const TABS = [
  {
    value: CourseGetListParamsSorter.NEW,
    label: '最新',
  },
  {
    value: CourseGetListParamsSorter.HOT,
    label: '最热',
  },
  {
    value: CourseGetListParamsSorter.RECOMMEND,
    label: '推荐',
  },
];

const LIST_GRID = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 4,
  xxl: 4,
};

const DEFAULT_PARAMS: CourseGetListParmas = {
  page: 1,
  size: 12,
  tab: CourseGetListParamsSorter.NEW,
};

const Page: React.FC<IRouteComponentProps> = () => {
  const [params, setParams] = useUrlState(DEFAULT_PARAMS, {
    navigateMode: 'replace',
  });

  const isFree = params.hasOwnProperty('isfree');

  const { data, loading, run: query } = useRequest(
    async () => {
      const { page, size, keyword, tab } = params;
      const response = await CourseService.getList({
        keyword,
        tab,
        isfree: isFree,
        page: Number(page),
        size: Number(size),
      });
      return { ...response, loaded: true };
    },
    {
      cacheKey: 'CourseList',
      initialData: { list: [], total: 0, loaded: false },
      refreshDeps: [params.page, params.size, params.tab, params.isfree],
    },
  );

  // 关键词搜索防抖
  const { run: onSearch } = useDebounceFn(
    () => {
      params.page > 1 ? setParams({ page: undefined }) : query();
    },
    { wait: 500 },
  );

  // 搜索关键词变化
  useUpdateEffect(onSearch, [params.keyword]);

  // 分页器事件
  const onChangePagination: PaginationConfig['onChange'] = (
    page,
    pageSize = params.size,
  ) => {
    setParams({
      page: page === 1 ? undefined : page,
      size: pageSize === Number(params.size) ? undefined : pageSize,
    });
  };

  // 切换排序方式
  const onChangeTab = (tab: CourseGetListParamsSorter) => {
    setParams({ page: undefined, tab });
  };

  // 筛选免费课程
  const onChangeFree = (checked: boolean) => {
    setParams({ page: undefined, isfree: checked ? true : undefined });
  };

  const title = params.keyword ? '课程搜索' : '课程列表';

  const { list, total, loaded } = data || {};

  const renderItem = ({
    courseId,
    courseTitle,
    picture,
    teacher,
    lessonCount,
    price,
    free,
    enrolment,
  }: Course) => (
    <List.Item key={courseId}>
      <CourseCard
        title={courseTitle}
        cover={picture}
        avatar={teacher?.avatar}
        name={teacher?.name}
        lessonCount={lessonCount}
        price={price}
        free={free}
        enrolment={enrolment}
        onClick={() => {
          history.push(`/course/${courseId}`);
        }}
      />
    </List.Item>
  );

  const listProps = {
    loading: loading,
    dataSource: list,
    pagination: {
      current: Number(params.page),
      pageSize: Number(params.size),
      total,
      onChange: onChangePagination,
      hideOnSinglePage: true,
      showQuickJumper: true,
      responsive: true,
    },
    renderItem,
  };

  const listPropsLoader = {
    dataSource: Array.from(Array(8)).fill({}),
    renderItem: () => (
      <List.Item>
        <CourseCard.Loader />
      </List.Item>
    ),
  };

  return (
    <Container className={s.wrapper}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb className={s.breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
        {!!params.keyword && (
          <Breadcrumb.Item>{params.keyword}</Breadcrumb.Item>
        )}
      </Breadcrumb>

      <Row className={s.filters} align="middle" justify="space-between">
        <Col>
          {TABS.map(({ value, label }) => (
            <Button
              key={value}
              type={params.tab === value ? 'primary' : 'link'}
              onClick={() => onChangeTab(value)}
              disabled={!loaded}
            >
              {label}
            </Button>
          ))}
        </Col>
        <Col>
          <Checkbox
            checked={isFree}
            onChange={(event) => onChangeFree(event.target.checked)}
            disabled={!loaded}
          >
            免费课程
          </Checkbox>
        </Col>
      </Row>

      <List {...(loaded ? listProps : listPropsLoader)} grid={LIST_GRID} />
    </Container>
  );
};

export default Page;
