import createMapper from 'map-factory';

interface Query {

}

function query(source = {}): Query {
  const original = Object.assign({}, source);
  const mapper = createMapper();

  mapper.map('firstname').to('name');

  return mapper.execute(original);
}

const {{{ serviceName }}}Mapper = {
  query
};

export default {{{ serviceName }}}Mapper;
