import { defer, LoaderFunctionArgs, TypedDeferredData } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import { RootLoaderData } from '~/types/rootLoaderData';
import { isAuthenticated } from '~/util/isAuthenticated.server';

export const headers = () => ({
  'WWW-Authenticate': 'Basic',
});

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<TypedDeferredData<RootLoaderData>> {
  if (!isAuthenticated(request)) {
    return defer({ authenticated: false }, { status: 401 });
  }

  return defer({
    authenticated: true,
  });
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
