/**
 * Location and reverse-geocoding utilities for Vee Pee Home Care.
 * Handles client-side reverse-geocoding of coordinates into human-readable Vellore addresses.
 */

export async function reverseGeocodeCoords(lat: number, lng: number): Promise<string> {
  // 1. Try OpenStreetMap Nominatim reverse geocoding
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      {
        headers: { 'Accept-Language': 'en' },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.address) {
        const addr = data.address;
        const parts: string[] = [];

        const street = addr.road || addr.pedestrian || addr.suburb || addr.neighbourhood;
        if (street) parts.push(street);

        const locality = addr.residential || addr.hamlet || addr.village || addr.suburb;
        if (locality && !parts.includes(locality)) parts.push(locality);

        const city = addr.city || addr.town || addr.county || addr.state_district || 'Vellore';
        if (city && !parts.includes(city)) parts.push(city);

        if (addr.postcode) {
          parts.push(addr.postcode);
        } else if (addr.state) {
          parts.push(addr.state);
        }

        if (parts.length > 0) {
          return parts.join(', ');
        }
        if (data.display_name) {
          return data.display_name.split(', ').slice(0, 4).join(', ');
        }
      }
    }
  } catch {
    // Fall back to secondary geocoding service
  }

  // 2. Fallback to BigDataCloud client reverse geocoding service
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { signal: controller.signal }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const parts: string[] = [];
      if (data.locality) parts.push(data.locality);
      if (data.city && data.city !== data.locality) parts.push(data.city);
      if (data.principalSubdivision) parts.push(data.principalSubdivision);
      if (data.postcode) parts.push(data.postcode);

      if (parts.length > 0) {
        return parts.join(', ');
      }
    }
  } catch {
    // Fall back to coordinate string
  }

  // 3. Fallback when network lookup is unavailable
  return `GPS: ${lat.toFixed(4)}, ${lng.toFixed(4)} (Vellore)`;
}
