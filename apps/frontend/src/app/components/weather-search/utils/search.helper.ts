export type SearchParameters = {
  cityName?: string;
  IATACode?: string;
  lat?: number;
  lon?: number;
  lang?: string;
  days?: string;
};

export function validateSearchInput(
  mode: 'city' | 'iata' | 'geo',
  text: string,
): { valid: boolean; error: string | null } {
  if (mode === 'city') {
    if (text.length < 3) {
      return { valid: false, error: 'City name must be at least 3 characters long.' };
    }
  } else if (mode === 'iata') {
    if (text.length !== 3) {
      return { valid: false, error: 'IATA code must be exactly 3 characters long.' };
    }
  } else if (mode === 'geo') {
    const coords = text.split(',');
    if (coords.length !== 2 || isNaN(Number(coords[0])) || isNaN(Number(coords[1]))) {
      return { valid: false, error: 'Geolocation must be in the format: latitude,longitude' };
    }
  }

  return { valid: true, error: null };
}

export function getSearchParamsQuery(inputs: {
  searchMode: string;
  searchModeText: string;
  lat: string;
  lon: string;
  days?: string;
  languageCode: string;
}): string {
  const { searchMode, searchModeText, lat, lon, languageCode, days } = inputs;
  const searchParams: SearchParameters = {};
  switch (searchMode) {
    case 'city':
      searchParams.cityName = searchModeText;
      break;
    case 'iata':
      searchParams.IATACode = searchModeText;
      break;
    case 'geo':
      searchParams.lat = parseFloat(lat);
      searchParams.lon = parseFloat(lon);
      break;
  }
  searchParams.lang = languageCode || 'en';
  if (days) {
    searchParams.days = days;
  }
  const query = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value != null) {
      if (key === 'lat' && searchParams.lon != null) {
        query.set('geo', `${searchParams.lat},${searchParams.lon}`);
      } else if (key !== 'lon' && key !== 'lat') {
        query.set(key, value.toString());
      }
    }
  });

  return query.toString();
}
