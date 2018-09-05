declare function Raku2Load<T extends string | string[], U = any>(
  src: T,
  options?: Raku2Load.Options | false
): T extends string
  ? Promise<Raku2Load.Package<U>>
  : Promise<Raku2Load.Package<U>[]>;

declare namespace Raku2Load {
  type Options = {
    cwd?: string;
    [key: string]: any;
  };
  type Package<T = any> = {
    path: string;
    module: T;
  };
}

export = Raku2Load;
