import fetch from '@/utils/fetch';

import { PaginationMapper } from '../mapper';
import CourseMapper from './index.mapper';

import type { CourseGetListParmas } from './index.types';

async function getList(params: CourseGetListParmas) {
  const response = await fetch.post('/course/list', params);
  return PaginationMapper(response.data, CourseMapper.getCourseList);
}

const CourseService = {
  getList,
};

export default CourseService;
