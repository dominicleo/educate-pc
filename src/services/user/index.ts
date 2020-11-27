import fetch from '@/utils/fetch';

import UserMapper from './index.mapper';
import { QueryParams } from './index.types';

async function query(params: QueryParams) {
  const response = await fetch.post('/api/query', params);
  return UserMapper.query(response.data);
}

const UserService = {
  query,
};

export default UserService;
