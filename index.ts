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

export const load = async <T = any>(paths: string[]) => {
  const promises = (await globby(paths)).map(path => req<T>(path));
  return await Promise.all(promises);
}
