declare function Raku2Load<T = any, U extends string | string[] = string>(
  src: U,
  options?: Raku2Load.Options | false
): U extends string
  ? Promise<Raku2Load.Package<T>>
  : Promise<Raku2Load.Package<T>[]>;

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
