import createMapper from 'map-factory';

import { Course } from './index.types';

function getCourseListItemMapper() {
  const mapper = createMapper();
  mapper
    .map('planId')
    .to('courseId')
    .map('title')
    .to('courseTitle')
    .map('icon')
    .to('picture')
    .map('price')
    .map('free')
    .map('courseCredit')
    .to('credit')

    .map('studentCount')
    .to('enrolment', undefined, () => 0)

    .map('lessonCount')
    .to('lessonCount', undefined, () => 0)

    .map('teacherId')
    .to('teacher.id')
    .map('teacherImg')
    .to('teacher.avatar')
    .map('teacherName')
    .to('teacher.name');
  return mapper;
}

function getCourseList(source = []): Course[] {
  const mapper = createMapper();
  mapper.map('[]').to('[]', getCourseListItemMapper().each, []);

  return mapper.execute(source);
}

const CourseMapper = {
  getCourseList,
};

export default CourseMapper;
