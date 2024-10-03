import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { DaysSheet, HotelsCard } from './../../components';

const TripPlan = () => {
  const nav = useNavigation();
  const router = useRouter();
  const {trip} = useLocalSearchParams();
  const [currentTripData, setCurrentTripData] = useState(null);

  useEffect(() => {
    const parsedTrip = JSON.parse(trip);
    setCurrentTripData(JSON.parse(parsedTrip?.tripPlan));
  }, []);

  useEffect(() => {
    nav.setOptions({
      headerTitle: () => <Text className='text-left text-secondary-600 font-b text-3xl w-full'></Text>,
      headerLeft: () => (
        <TouchableOpacity onPress={() => router.back()} className=''>
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
    <View className='flex-1 bg-secondary-200 pt-16'>
      <View className='flex flex-row items-center justify-between px-7 pt-8 pb-4'>
        <Text className='font-b text-primary-600 text-4xl'>{currentTripData?.trip_details?.destination}</Text>
      </View>
      <View className='flex-1 bg-white rounded-t-3xl'>
        <ScrollView className='mx-7 mt-7 mb-1'>
          <Text className='font-semi-bold text-primary-800 text-3xl pb-3.5'>Flight</Text>
          <View className='flex flex-row bg-secondary-200 items-center justify-between  rounded-2xl px-3 py-4'>
            <View className='flex flex-column justify-center gap-1'>
              <Text className='font-med text-secondary-600 text-2xl '>
                {!/airlines?/i.test(currentTripData?.flights?.flight_details[0]?.airline)
                  ? `${currentTripData?.flights?.flight_details[0]?.airline} airlines`
                  : currentTripData?.flights?.flight_details[0]?.airline}
              </Text>

              <Text className='font-regular text-secondary-400 text-xl '>
                {currentTripData?.flights?.flight_details[0]?.price}
                <Text className='font-regular text-secondary-400 text-lg '> approx.</Text>
              </Text>
            </View>
            <TouchableOpacity
              className='bg-primary-600 px-6 py-2 rounded-full'
              onPress={() => {
                Linking.openURL(currentTripData?.flights?.flight_details[0]?.booking_url);
              }}
            >
              <Text className='font-med text-white text-justify text-center text-lg'>Book</Text>
            </TouchableOpacity>
          </View>
          <View className='mt-7'>
            <Text className='font-semi-bold text-primary-800 text-3xl pb-3.5'>Hotel Reccomendations</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={currentTripData?.hotels?.hotel_options}
              renderItem={({item, index}) => <HotelsCard hotel={item}></HotelsCard>}
            ></FlatList>
          </View>
          <View className=' mt-7'>
            <Text className='font-semi-bold text-primary-800 text-3xl pb-3.5'>Day Plans</Text>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={Object.keys(currentTripData?.itinerary || {})}
              keyExtractor={(item) => item}
              renderItem={({item, index}) => <DaysSheet tripPlan={currentTripData} day={item} dayNo={index + 1} />}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default TripPlan;
