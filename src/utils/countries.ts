import countries from "world-countries";

// get country coordinates
export const getCountryCoordinates = (countryCode: string) => {
    const countryData = countries.find(c => c.cca3 === countryCode);
    if (countryData) {
        return countryData.latlng;
    }
    return null;
}
