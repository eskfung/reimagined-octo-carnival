import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';
import type { LatLng } from '~/types/latLng';
import { PlaceDetail } from '~/types/place';

interface LoadMapArgs {
  loader: Loader;
  mapCenter?: LatLng | null;
}

const loadMap = async ({ loader, mapCenter }: LoadMapArgs) => {
  try {
    const { Map } = await loader.importLibrary('maps');

    return new Map(document.getElementById('map')!, {
      center: {
        lat: mapCenter?.latitude ?? 0,
        lng: mapCenter?.longitude ?? 0,
      },
      gestureHandling: 'auto',
      /**
       * @see https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions.mapId
       * @todo 👀
       */
      mapId: 'DEMO_MAP_ID',
      zoom: 14,
    });
  } catch (e) {
    console.log('::useGoogleMaps failed to load', JSON.stringify(e));
  }
};

interface DrawPlacesArgs {
  loader: Loader;
  map?: google.maps.Map;
  places: PlaceDetail[];
}

const drawPlaces = async ({ loader, map, places }: DrawPlacesArgs) => {
  if (!map) {
    return;
  }
  const { AdvancedMarkerElement } = await loader.importLibrary('marker');

  return places.map(({ location }) => {
    new AdvancedMarkerElement({
      map,
      position: { lat: location?.latitude ?? 0, lng: location?.longitude ?? 0 },
    });
  });
};

interface UseGoogleMapsArgs {
  apiKey: string;
  mapCenter?: LatLng | null;
  places: PlaceDetail[];
}

export function useGoogleMaps({
  apiKey,
  mapCenter,
  places,
}: UseGoogleMapsArgs) {
  const loader = useRef(
    new Loader({
      apiKey,
      libraries: ['marker', 'maps'],
      version: 'weekly',
    })
  );

  useEffect(() => {
    (async function () {
      const map = await loadMap({ loader: loader.current, mapCenter });
      await drawPlaces({ loader: loader.current, map, places });
    })();
  }, [apiKey, mapCenter, places]);
}
