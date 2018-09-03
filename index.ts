import globby from 'globby';

export type Package<T = any> = {
  path: string;
  module: T;
};

const _require = eval('require'); // tslint:disable-line

async function req<T = any>(path: string) {
  return {
    path,
    module: await _require(path)
  } as Package<T>;
}

module.exports = async <T = any>(src: string | string[], options?: any) => {
  const paths =
    options === false
      ? src instanceof Array
        ? src
        : [src]
      : await globby(src, options);
  const promises = paths.map(path => req<T>(path));
  return await Promise.all(promises);
};
