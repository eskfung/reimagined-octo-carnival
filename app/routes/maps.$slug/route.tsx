import { defer, type LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useRootLoaderData } from '~/hooks/useRootLoaderData';

export const loader: LoaderFunction = ({ params }) => {
  return defer({
    slug: params['slug'],
  });
};

export default function Map() {
  const { authenticated } = useRootLoaderData();
  const { slug } = useLoaderData<typeof loader>();

  return authenticated && <main>{slug}</main>;
}
