const API_KEY = process.env.GOOGLE_PLACES_API_KEY ?? '';

const fieldMask = ['id', 'displayName', 'formattedAddress'];

/**
 * @see https://developers.google.com/maps/documentation/places/web-service/place-details
 */
export const placeDetail = async (placeId: string) => {
  const res = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': fieldMask.join(','),
      },
    }
  );

  if (res.status === 200) {
    return await res.json();
  } else {
    console.error(`::googlePlaces/${placeId}`, await res.text());
    return null;
  }
};
