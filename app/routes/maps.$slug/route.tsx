import { defer, LoaderFunctionArgs } from '@remix-run/node';
import { Await, useLoaderData } from '@remix-run/react';
import { PlaceSummary } from '~/components/PlaceSummary';
import { placeDetail } from '~/dataAccess/googlePlaces.server';
import { useGoogleMaps } from '~/hooks/useGoogleMaps';
import { useRootLoaderData } from '~/hooks/useRootLoaderData';

import styles from './styles.module.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const firstPlace = await placeDetail('ChIJCar0f49ZwokR6ozLV-dHNTE');
  return defer({
    firstPlace: firstPlace?.location,
    places: Promise.all([
      firstPlace,
      placeDetail('ChIJQ-hJIuBbwokRRUdquw_5w5U'),
    ]),
    slug: params['slug'],
  });
};

export default function Map() {
  const {
    authenticated,
    env: { googleMapsApiKey },
  } = useRootLoaderData();
  const { firstPlace, places, slug } = useLoaderData<typeof loader>();
  useGoogleMaps(googleMapsApiKey, firstPlace);

  return (
    authenticated && (
      <main>
        {slug}
        <Await resolve={places}>
          {(places) => {
            return (
              <>
                <div id="map" className={styles.map} />
                {places.map((place, idx) => (
                  <PlaceSummary key={place?.id ?? idx} placeDetail={place} />
                ))}
              </>
            );
          }}
        </Await>
      </main>
    )
  );
}
