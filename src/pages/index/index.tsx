import { useRequest } from 'ahooks';
import { List, Space } from 'antd';
import React from 'react';
import { Helmet, history, IRouteComponentProps } from 'umi';

import Container from '@/components/container';
import CourseCard from '@/components/course-card';
import { APP_NAME } from '@/constants/common';
import { Course, CourseGetListParamsSorter } from '@/services/course/index.types.d.ts';
import HomepageService from '@/services/homepage';
import { ArrowRightOutlined, RightOutlined } from '@ant-design/icons';

import Banner from './components/banner';
import s from './index.less';

const LIST_GRID = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 4,
  xxl: 4,
};

interface HeadlineProps {
  title: any;
  subtitle?: any;
}

const Headline: React.FC<HeadlineProps> = ({ title, subtitle }) => {
  return (
    <div className={s.headline}>
      <div className={s.title}>{title}</div>
      <div className={s.subtitle}>{subtitle}</div>
    </div>
  );
};

const More: React.FC<{ onClick?: React.MouseEventHandler<HTMLElement> }> = ({
  onClick,
}) => {
  return (
    <div className={s.more} onClick={onClick}>
      <Space size={6}>
        查看更多
        <RightOutlined />
        <ArrowRightOutlined className={s.arrow} />
      </Space>
    </div>
  );
};

const Page: React.FC<IRouteComponentProps> = () => {
  const { data, loading } = useRequest(
    async () => {
      const response = await HomepageService.query();
      return { ...response, loaded: true };
    },
    {
      cacheKey: 'Homepage',
      staleTime: 10000,
      initialData: {
        courses: [],
        recommendedCourses: [],
        banners: [],
        loaded: false,
      },
    },
  );

  const { courses = [], recommendedCourses = [], banners = [], loaded } =
    data || {};

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

  const renderCourseList = (data: Course[]) => {
    const listProps = {
      loading,
      dataSource: data,
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
      <List grid={LIST_GRID} {...(loaded ? listProps : listPropsLoader)} />
    );
  };

  return (
    <>
      <Helmet>
        <title>{APP_NAME}</title>
      </Helmet>
      <Banner data={banners} loading={loading} />
      <section className={s.section}>
        <Container>
          <Headline title="推荐课程" subtitle="Recommend courses" />
          <div className={s.sectionContent}>
            {renderCourseList(courses)}
            <More
              onClick={() =>
                history.push({
                  pathname: '/course',
                  query: { tab: CourseGetListParamsSorter.RECOMMEND },
                })
              }
            />
          </div>
        </Container>
      </section>
      <div className={s.sections}>
        <section className={s.section}>
          <Container>
            <Headline title="全部课程" subtitle="All courses" />
            <div className={s.sectionContent}>
              {renderCourseList(recommendedCourses)}
              <More onClick={() => history.push('/course')} />
            </div>
          </Container>
        </section>
      </div>
    </>
  );
};

export default Page;
