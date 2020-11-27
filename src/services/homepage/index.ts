import fetch from '@/utils/fetch';

import HomepageMapper from './index.mapper';

async function query() {
  const response = await fetch.get('/course/findMainCourse');
  const mockdata = Object.assign(response.data, {
    banners: [
      {
        image: '/images/banner.png',
        background:
          'linear-gradient(180deg,rgba(100,92,243,1) 0%,rgba(104,149,250,1) 100%)',
      },
    ],
  });
  return HomepageMapper.query(mockdata);
}

const HomepageService = {
  query,
};

export default HomepageService;
