import axios from 'axios';

import { SERVICE_URL } from './baseURL';

const fetch = axios.create({
  baseURL: SERVICE_URL,
});

export default fetch;
