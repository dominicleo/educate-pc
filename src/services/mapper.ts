import createMapper from 'map-factory';

export function PaginationMapper<T = any>(
  source: any = {},
  transform?: (data: any) => T[],
): { list: T[]; total: 0 } {
  const mapper = createMapper();

  mapper
    .map('content')
    .to('list', transform, [])
    .map('totalElements')
    .to('total', undefined, () => 0);

  return mapper.execute(source);
}
