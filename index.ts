import globby from 'globby';

import { Package } from './index.d';

const _require = eval('require'); // tslint:disable-line

async function req<T = any>(path: string) {
  return {
    path,
    module: await _require(path)
  } as Package<T>;
}

module.exports = async <T = any>(
  src: string | string[],
  options?: {} | false
) => {
  const paths =
    options === false
      ? src instanceof Array
        ? src
        : [src]
      : await globby(src, options);
  const promises = paths.map(path => req<T>(path));
  const packages = await Promise.all(promises);
  return src instanceof Array ? packages : packages[0];
};
