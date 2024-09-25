import { defer, LoaderFunctionArgs, TypedDeferredData } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { fetchFromEnv } from '~/services/env.server';
import { RootLoaderData } from '~/types/rootLoaderData';
import { isAuthenticated } from '~/util/isAuthenticated.server';

export const headers = () => ({
  'WWW-Authenticate': 'Basic',
});

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<TypedDeferredData<RootLoaderData>> {
  return defer(
    {
      authenticated: isAuthenticated(request),
      env: {
        googleMapsApiKey: fetchFromEnv('GOOGLE_MAPS_API_KEY'),
      },
    },
    {
      status: isAuthenticated(request) ? 200 : 401,
    }
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
