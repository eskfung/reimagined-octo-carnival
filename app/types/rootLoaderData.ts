export interface RootLoaderData extends Record<string, unknown> {
  authenticated: boolean;
  env: {
    googleMapsApiKey: string;
  };
}
