import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Iconify } from 'react-native-iconify';
import { useTripContext, useUserContext } from '../../contexts';

const SearchPlace = () => {
  const nav = useNavigation();
  const router = useRouter();
  const {tripData, setTripData} = useTripContext();
  const {user, userLocation, setUserLocation} = useUserContext();
  const [errorStyle, setErrorStyle] = useState(false);

  useEffect(() => {
    console.log(userLocation);
    setTripData((p) => ({...p, departure_city: userLocation}));
  }, [userLocation]);

  useEffect(() => {
    nav.setOptions({
      headerTitle: () => <Text className='text-left text-secondary-lavender font-semi-bold text-3xl w-full'></Text>,
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()}>
          <Iconify icon='hugeicons:arrow-left-01' size={30} color='#044C71' />
        </TouchableOpacity>
      ),

      headerShown: true,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerBackVisible: false,
    });
  }, []);
  return (
    <View className='flex-1 bg-secondary-200'>
      <View className='flex-1 bg-white rounded-t-3xl mt-24'>
        <View className='mx-7 mt-7 mb-1'>
          <View className='flex-row items-center'>
            <Text className='ml-2 font-b text-primary-600 text-4xl'>Departed From </Text>
            <TextInput
              selectionColor={'#AACAEE'}
              className='font-regular text-secondary-600 text-4xl'
              placeholder={userLocation ? `${userLocation}` : ''}
              value={userLocation}
              onChangeText={setUserLocation}
            ></TextInput>
            <View className='ml-1'>
              {userLocation ? (
                <Iconify icon='hugeicons:global-editing' size={20} color='#F06039' />
              ) : (
                <Iconify icon='hugeicons:location-add-01' size={25} color='#F06039' />
              )}
            </View>
          </View>
          <View className='h-32 bg-secondary-200 rounded-3xl mt-3 pt-6'>
            <View className='flex-row items-center ml-3 mb-3.5'>
              <Iconify icon='fluent:sparkle-28-filled' size={24} color='#F0603999' flip='vertical' />
              <Text className='font-regular text-secondary-600  text-2xl'>Where are you traveling next? </Text>
            </View>
            <View className='mx-1.5'>
              <GooglePlacesAutocomplete
                onFail={(error) => console.error(error)}
                fetchDetails={true}
                placeholder={errorStyle? 'Please Search for a place!' :'Search for a place'} 
                styles={{
                  textInput: {
                    height: 55,
                    borderRadius: 50,
                    paddingLeft: 20,
                    backgroundColor: '#F6F6F9',
                    color:'#044C71',
                    fontFamily: 'fira-r',
                    fontSize: 16,
                    borderWidth: errorStyle? 1.7:0,
                    borderColor: '#b91c1c',
                  },
                  listView: {
                    position: 'absolute', // Make the suggestions list absolute
                    top: 66, // Adjust top based on the input field's height and padding
                    zIndex: 10000, // Bring it above other components
                    width: '100%', // Take full width of the container
                    alignSelf: 'center',
                    borderRadius: 34,
                    backgroundColor: '#F6F6F966',
                  },
                  row: {
                    backgroundColor: '#F6F6F966',
                    paddingTop: 12,
                  },
                  description: {
                    color: '#044C71',
                    fontFamily: 'fira-r',
                    fontSize: 16,
                    marginLeft: 9,
                  },
                  separator: {
                    height: 0,
                    backgroundColor: '#F6F6F966',
                  },
                  poweredContainer: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 0,
                    backgroundColor: '#F6F6F966',
                  },
                  powered: {
                    width: 90,
                    height: 10,
                  },
                }}
                textInputProps={{
                  selectionColor: '#AACAEE',
                  placeholderTextColor:  errorStyle?'#b91c1c':'#044C714D',
                }}
                onPress={(data, details = null) => {
                  setTripData((p) => ({
                    ...p,
                    locationInfo: {
                      name: data.description,
                      coordinates: details?.geometry.location,
                      photoRef: details?.photos[0]?.photo_reference,
                      url: details?.url,
                    },
                  }));
                }}
                query={{
                  key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                  language: 'en',
                }}
              />
            </View>
          </View>
          <View className='mt-96 h-[21%] justify-end'>
            <TouchableOpacity
              className='flex bg-primary-600 px-6 py-3 rounded-full mt-12'
              onPress={() => {
                tripData?.locationInfo?.name && tripData?.departure_city
                  ? router.push('/create-trip/traveler')
                  : setErrorStyle(true)
              }}
            >
              <Text className='font-med text-white text-justify text-center text-2xl'>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchPlace;
