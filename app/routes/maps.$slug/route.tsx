import compact from 'lodash-es/compact';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { PlaceSummary } from '~/components/PlaceSummary';
import { placeDetail } from '~/dataAccess/googlePlaces.server';
import { useGoogleMaps } from '~/hooks/useGoogleMaps';
import { useRootLoaderData } from '~/hooks/useRootLoaderData';

import styles from './styles.module.css';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const places = await Promise.all([
    placeDetail('ChIJCar0f49ZwokR6ozLV-dHNTE'),
    placeDetail('ChIJQ-hJIuBbwokRRUdquw_5w5U'),
  ]);

  return json({
    places: compact(places),
    slug: params['slug'],
  });
};

export default function Map() {
  const {
    authenticated,
    env: { googleMapsApiKey },
  } = useRootLoaderData();
  const { places, slug } = useLoaderData<typeof loader>();
  useGoogleMaps({
    apiKey: googleMapsApiKey,
    mapCenter: places[0]?.location,
    places,
  });

  return (
    authenticated && (
      <main>
        <h1>{slug}</h1>
        <div id="map" className={styles.map} />
        {places.map((place, idx) => (
          <PlaceSummary key={place?.id ?? idx} placeDetail={place} />
        ))}
      </main>
    )
  );
}
