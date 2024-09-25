import { Loader } from '@googlemaps/js-api-loader';
import { useEffect } from 'react';

export function useGoogleMaps(apiKey: string) {
  useEffect(() => {
    (async function () {
      try {
        const { Map } = await new Loader({
          apiKey,
          libraries: ['maps'],
          version: 'weekly',
        }).importLibrary('maps');

        new Map(document.getElementById('map'), {
          center: {
            lat: 0,
            lng: 0,
          },
          zoom: 4,
        });
      } catch (e) {
        console.log('::useGoogleMaps failed to load', JSON.stringify(e));
      }
    })();
  }, [apiKey]);
}
