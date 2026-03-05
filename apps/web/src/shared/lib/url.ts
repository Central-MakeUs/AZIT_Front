export const getQueryParam = (
  key: string,
  search: string = window.location.search
): string | undefined => {
  const value = new URLSearchParams(search).get(key);

  if (!value) {
    return undefined;
  }

  return value;
};
