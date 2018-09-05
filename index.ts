import globby from 'globby';
import ndPath from 'path';

import { Options, Package } from './index.d';

const _require = eval('require'); // tslint:disable-line

async function req<T = any>(path: string) {
  return { path, module: await _require(path) } as Package<T>;
}

function isLocalModule(path: string) {
  return ndPath.isAbsolute(path) || /^\./.test(path);
}

module.exports = async <T = any>(src: string | string[], options?: Options) => {
  const cwd = (options && options.cwd) || null;
  const paths = src instanceof Array ? src : [src];
  const modules = paths
    .filter(path => !cwd && !isLocalModule(path))
    .map(path => req<T>(path));
  const locals = paths
    .filter(path => !!cwd || isLocalModule(path))
    .map(path => {
      return (async () => {
        const ps = await globby(path, {
          ...options,
          absolute: true,
          expandDirectories: false
        });
        return ps.map(p => req<T>(p));
      })();
    });
  const map = await Promise.all(locals);
  const promises = map.reduce((mods, arr) => [...mods, ...arr], modules);
  const packages = await Promise.all(promises);
  return src instanceof Array ? packages : packages[0];
};
