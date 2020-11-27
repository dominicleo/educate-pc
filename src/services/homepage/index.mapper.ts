import createMapper from 'map-factory';

import CourseMapper from '../course/index.mapper';

import type { HomePage } from './index.types';

function query(source = {}): HomePage {
  const original = Object.assign({}, source);
  const mapper = createMapper();

  mapper
    .map('allCourses')
    .to('courses', CourseMapper.getCourseList, [])
    .map('recommendedCourses')
    .to('recommendedCourses', CourseMapper.getCourseList, [])
    .map('banners');

  return mapper.execute(original);
}

const HomepageMapper = {
  query,
};

export default HomepageMapper;
