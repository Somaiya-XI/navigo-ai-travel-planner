import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../configs';

const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [userId, setUserId] = useState(null);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [isLocationFetched, setIsLocationFetched] = useState(false);

  const getCurrentLocation = async () => {
    try {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return null;
      }
      let location = await Location.getCurrentPositionAsync({});
      return location;
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  };

  const getGeoCode = async (location) => {
    try {
      const address = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      return address[0]?.subregion;
    } catch (error) {
      console.error('Error getting geocode:', error);
      return null;
    }
  };

  const initializeUserLocation = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('userLocation');
      if (storedLocation) {
        // console.log('Loaded LOCATION from storage:', storedLocation);
        setUserLocation(storedLocation);
      } else {
        const currentLocation = await getCurrentLocation();
        if (currentLocation) {
          const geoCode = await getGeoCode(currentLocation);
          if (geoCode) {
            setUserLocation(geoCode);
            // console.log('setting the user location into storage: ', geoCode);
            await AsyncStorage.setItem('userLocation', geoCode);
          }
        }
        setIsLocationFetched(true);
      }
    } catch (err) {
      console.log('Error initializing user location:', err);
    }
  };

  useEffect(() => {
    const initializeUserSession = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userSession');
        if (storedUserId) {
          //console.log('Loaded session from storage:', storedUserId);
          setUserId(storedUserId);
          setIsActiveUser(true);
        } else {
          const fetchedUserId = await getCurrentUser();
          if (fetchedUserId) {
            //console.log('Fetched session from server:', fetchedUserId);
            setUserId(fetchedUserId);
            setIsActiveUser(true);
            await AsyncStorage.setItem('userSession', fetchedUserId);
          } else {
            setIsActiveUser(false);
          }
        }
      } catch (err) {
        // console.log('Error initializing user session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUserSession();
    initializeUserLocation();
  }, []);

  useEffect(() => {
    const checkLocation = async () => {
      if (isLocationFetched) return;
      const currentLocation = await getCurrentLocation();
      if (currentLocation) {
        const geoCode = await getGeoCode(currentLocation);
        if (userLocation && geoCode && geoCode !== userLocation) {
          console.error('fetched is: ', geoCode, 'current is: ', userLocation);
          setUserLocation(geoCode);
          await AsyncStorage.setItem('userLocation', geoCode);
        }
      }
    };

    checkLocation();
  }, []);

  const userValues = {
    userId,
    setUserId,
    isActiveUser,
    setIsActiveUser,
    isLoading,
    setIsLoading,
    userLocation,
    setUserLocation,
  };

  return <UserContext.Provider value={userValues}>{children}</UserContext.Provider>;
};

export default UserContextProvider;

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('context must be used in context provider');
  }
  return context;
}
