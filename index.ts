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

export default async <T = any>(paths: string[]) => {
  const sources = await globby(paths, {
    expandDirectories: false,
    absolute: true
  });
  const promises = sources.map(path => req<T>(path));
  return await Promise.all(promises);
};
