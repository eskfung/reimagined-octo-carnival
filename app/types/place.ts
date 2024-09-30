import type { LatLng } from '~/types/latLng';

/**
 * Simplification that should intersect with a Place from @types/google.maps
 * @see https://developers.google.com/maps/documentation/javascript/using-typescript
 */
export type PlaceDetail = {
  displayName?: string | null;
  formattedAddress?: string | null;
  id: string;
  location?: LatLng | null;
};
