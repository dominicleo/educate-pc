import type { PaginationParams } from '@/services/types';

export interface CourseTeacher {
  /** 教师 ID */
  id: number;
  /** 头像 */
  avatar: string;
  /** 姓名 */
  name: string;
  /** 职称 */
  officer: string;
  /** 简介 */
  profile: string;
}

export interface Course {
  /** 课程 ID */
  courseId: number;
  /** 标题 */
  courseTitle: string;
  /** 图片 */
  picture: string;
  /** 价格 */
  price: string;
  /** 是否免费 */
  free: boolean;
  /** (default: 0) 学分 */
  credit: number;
  /** 教师信息 */
  teacher: CourseTeacher;
  /** 课时数量 */
  lessonCount: number;
  /** 报名人数 */
  enrolment: number;
}

export enum CourseGetListParamsSorter {
  /** 最新 */
  NEW = 'NEW',
  /** 最热 */
  HOT = 'HOT',
  /** 推荐 */
  RECOMMEND = 'RECOMMEND',
}

export interface CourseGetListParmas extends PaginationParams {
  /** 搜索关键字 */
  keyword?: string;
  /** 免费课程 */
  isfree?: boolean;
  /** 课程排序类型 */
  tab?: CourseGetListParamsSorter;
}
