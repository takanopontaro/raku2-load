import globby from 'globby';

export type TModule<T = any> = {
  path: string;
  module: T;
};

const _require = eval('require'); // tslint:disable-line

async function req<T = any>(path: string) {
  return {
    path,
    module: await _require(path)
  } as TModule<T>;
}

export default async <T = any>(paths: string[], options?: any) => {
  const sources = options === false ? paths : await globby(paths, options);
  const promises = sources.map(path => req<T>(path));
  return await Promise.all(promises);
};
