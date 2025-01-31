declare module 'gray-matter' {
  interface GrayMatterFile<T = Record<string, unknown>> {
    data: T;
    content: string;
    excerpt?: string;
    orig: Buffer | string;
    language: string;
    matter: string;
    stringify(): string;
  }

  interface Options {
    excerpt?: boolean | ((file: GrayMatterFile) => string | undefined);
    excerpt_separator?: string;
    engines?: Record<string, unknown>;
    language?: string;
    delimiters?: string | [string, string];
  }

  function matter(
    input: Buffer | string,
    options?: Options
  ): GrayMatterFile;

  export = matter;
} 