import createMapper from 'map-factory';

function query(source = {}) {
  const original = Object.assign({}, source);
  const mapper = createMapper();

  mapper.map('firstname').to('name');

  return mapper.execute(original);
}

const {{{ serviceName }}}Mapper = {
  query
};

export default {{{ serviceName }}}Mapper;
