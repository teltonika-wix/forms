export const extractSearchParams = <UrlParams extends string[]>(
  urlInstance: URL,
  params: UrlParams,
): (string | null)[] => {
  return params.map((parameter) => {
    return urlInstance.searchParams.get(parameter);
  });
};
