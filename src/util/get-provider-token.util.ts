export const getProviderToken = (prefix: string, name?: string) => {
  if (name == null) {
    return prefix;
  }

  return `${prefix}_${name}`;
};
