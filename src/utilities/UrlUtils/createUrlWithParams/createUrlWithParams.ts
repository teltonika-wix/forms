export type URLSearchProps = ConstructorParameters<typeof URLSearchParams>[0];

export type CreateUrlWithParamsData = {
  baseUrl: string;
  endpoint?: string;
  searchParams: URLSearchProps;
};

export const createUrlWithParams = ({
  baseUrl,
  endpoint,
  searchParams,
}: CreateUrlWithParamsData): string => {
  const url = new URL(endpoint ? `${baseUrl}${endpoint}` : baseUrl);
  const apiQueryParams = new URLSearchParams(searchParams);
  url.search = apiQueryParams.toString();

  return url.toString();
};
