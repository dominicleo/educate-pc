import createMapper from 'map-factory';

interface Query {

}

function query(source = {}): Query {
  const original = Object.assign({}, source);
  const mapping = createMapper();

  mapping.map('firstname').to('name');

  return mapping.execute(original);
}

const UserMapper = {
  query
};

export default UserMapper
