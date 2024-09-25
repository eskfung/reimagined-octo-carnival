import { defer, type LoaderFunction } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { PlaceSummary } from '~/components/PlaceSummary';
import { placeDetail } from '~/dataAccess/googlePlaces.server';
import { useRootLoaderData } from '~/hooks/useRootLoaderData';

export const loader: LoaderFunction = ({ params }) => {
  return defer({
    places: Promise.all([
      placeDetail('ChIJCar0f49ZwokR6ozLV-dHNTE'),
      placeDetail('ChIJQ-hJIuBbwokRRUdquw_5w5U'),
    ]),
    slug: params['slug'],
  });
};

export default function Map() {
  const { authenticated } = useRootLoaderData();
  const { places, slug } = useLoaderData<typeof loader>();

  return (
    authenticated && (
      <main>
        {slug}
        <Await resolve={places}>
          {(places) =>
            places.map((place) => (
              <PlaceSummary key={place.id} placeDetail={place} />
            ))
          }
        </Await>
      </main>
    )
  );
}
