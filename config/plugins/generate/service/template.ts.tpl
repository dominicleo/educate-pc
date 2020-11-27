import fetch from '@/utils/fetch';
{{#mapper}}
import {{{ serviceName }}}Mapper from './{{{ name }}}.mapper';
{{/mapper}}
import { QueryParams } from './{{{ name }}}.types';

async function query(params: QueryParams) {
  const response = await fetch.post('/api/query', params);
{{#mapper}}
  return {{{ serviceName }}}Mapper.query(response.data);
{{/mapper}}
{{^mapper}}
  return response.data;
{{/mapper}}
}

const {{{ serviceName }}}Service = {
  query
};

export default {{{ serviceName }}}Service
