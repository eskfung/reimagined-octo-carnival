import { Loader } from '@googlemaps/js-api-loader';
import { useEffect } from 'react';
import type { LatLng } from '~/types/latLng';

export function useGoogleMaps(apiKey: string, mapCenter?: LatLng | null) {
  useEffect(() => {
    (async function () {
      try {
        const { Map } = await new Loader({
          apiKey,
          libraries: ['maps'],
          version: 'weekly',
        }).importLibrary('maps');

        new Map(document.getElementById('map')!, {
          center: {
            lat: mapCenter?.latitude ?? 0,
            lng: mapCenter?.longitude ?? 0,
          },
          zoom: 4,
        });
      } catch (e) {
        console.log('::useGoogleMaps failed to load', JSON.stringify(e));
      }
    })();
  }, [apiKey, mapCenter]);
}
