import fetch from '@/utils/fetch';
import {{{ serviceName }}}Mapper from './{{{ name }}}.mapper';

async function query(params) {
  const response = await fetch.post('/api/query', params);
  return {{{ serviceName }}}}Mapper(response.data);
}

const {{{ serviceName }}}Service = {
  query
};

export default {{{ serviceName }}}Service
