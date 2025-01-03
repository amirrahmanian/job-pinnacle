import { join } from 'path/posix';

export const concatUrl = (baseUrl: string, ...paths: string[]) => {
  const url = new URL(baseUrl);

  url.pathname = join(url.pathname, ...paths);

  return url.href;
};
