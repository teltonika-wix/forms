export type IPAddressInfo = {
  bogon: boolean; // Indicates whether the IP address is a bogon (unallocated or reserved address).
  city?: string | null;
  countryCode: string; // The ISO 3166-1 alpha-2 country code. This should always be a 2-character string.
  countryName: string;
  ip: string; // The IP address. It should be a valid IPv4 address in dotted decimal format.
  loc?: string | null; // The geographical coordinates in "latitude,longitude" format.
  region?: string | null; // The name of the region or state.
};
