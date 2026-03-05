export const getQueryParam = (
  key: string,
  search: string = window.location.search
): string | undefined => {
  const value = new URLSearchParams(search).get(key);

  return value ?? undefined;
};
