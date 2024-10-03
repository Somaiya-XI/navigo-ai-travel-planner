import {Linking} from 'react-native';

export const googlePhotoUri = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=';
export const apiKeySuffex = `&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;

// Function to open Google Maps with geo coordinates
export const openMap = (geo_coordinates) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${geo_coordinates}`;
  Linking.openURL(url);
};

const extractPlaceName = (fullString) => {
  const splitString = fullString.split(' at ');
  return splitString.length > 1 ? splitString[1] : fullString;
};

// Function to open Google Maps with place name
export const openMapWithPlaceName = (placeName) => {
  const place = extractPlaceName(placeName);
  const encodedPlaceName = encodeURIComponent(place); // Encode the place name for the URL
  const url = `https://www.google.com/maps/search/?api=1&query=${encodedPlaceName}`;
  Linking.openURL(url);
};

// Function to get photo reference using the text search of the place name
export const getPhotoRef = async (placeName) => {
  const responce = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`
  );
  const result = await responce.json();

  return result?.results[0]?.photos[0]?.photo_reference;
};
