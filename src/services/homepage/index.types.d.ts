import type { Course } from '../course/index.types';

type Banner = {
  /** 图片地址 */
  image: string;
  /** 背景颜色 */
  background?: string;
};

export interface HomePage {
  courses: Course[];
  recommendedCourses: Course[];
  banners: Banner[];
}
