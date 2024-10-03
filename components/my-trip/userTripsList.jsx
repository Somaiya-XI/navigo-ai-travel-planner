import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { apiKeySuffex, googlePhotoUri } from '../../components/map';

const UserTripsList = ({trips}) => {
  const [latestTripData, setLatestTripData] = useState(null);
  const [otherPlansData, setOtherPlansData] = useState(null);
  const [userTrips, setUserTrips] = useState(trips);

  const router = useRouter();

  useEffect(() => {
    if (trips.length > 0) {
      const lastTrip = trips[trips.length - 1];
      setLatestTripData(JSON.parse(lastTrip?.tripData));
      setUserTrips(trips.slice(0, -1));
    }
  }, []);

  useEffect(() => {
    if (latestTripData) {
      const newPlansData = userTrips.map((t) => {
        return JSON.parse(t?.tripData);
      });

      setOtherPlansData(newPlansData);
    }
  }, [latestTripData]);

  return (
    <View className='flex-1 bg-white rounded-t-3xl'>
      <Text className='font-semi-bold text-primary-800 text-3xl  px-7 py-4 '>Latest Plan</Text>
      {latestTripData?.locationInfo?.photoRef ? (
        <View className='h-90 bg-secondary-100 rounded-2xl mx-6 p-2'>
          <ImageBackground
            source={{uri: googlePhotoUri + latestTripData?.locationInfo?.photoRef + apiKeySuffex}}
            className='h-72 justify-end overflow-hidden rounded-2xl p-5'
            style={{}}
          >
            <BlurView className='h-20 overflow-hidden rounded-lg p-3' intensity={40} tint='systemThickMaterialLight'>
              <Text className='font-semi-bold text-white text-3xl'>{latestTripData?.locationInfo?.name}</Text>
              <View className='flex flex-row items-center'>
                <Iconify icon='hugeicons:airplane-02' strokeWidth='2' size={22} color='#D3E8E9' />
                <Text className='font-regular text-white text-lg mx-2'>{latestTripData?.traveler?.title} trip</Text>
                <Iconify icon='hugeicons:calendar-03' strokeWidth='2' size={22} color='#D3E8E9' />
                <Text className='font-regular text-white text-lg mx-2'>
                  {moment(latestTripData?.startDate).format('DD MMM')}
                </Text>
              </View>
            </BlurView>
          </ImageBackground>
          <TouchableOpacity
            className='bg-primary-600 px-5 py-3 rounded-full mt-4'
            onPress={() => {
              router.push({
                pathname: '/trip-details/tripPlan',
                params: {trip: JSON.stringify(trips[trips.length - 1])},
              });
            }}
          >
            <Text className='font-med text-white text-justify text-center text-2xl'>Check your trip plan</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <ScrollView className='mx-6 mt-6'>
        {otherPlansData?.length != 0 && (
          <Text className='font-semi-bold text-primary-800 text-3xl mb-3'>Other Plans</Text>
        )}
        {otherPlansData
          ?.slice()
          .reverse()
          .map((plan, index) => (
            <TouchableOpacity
              key={index}
              className='flex flex-row mb-6 items-center'
              onPress={() => {
                router.push({
                  pathname: '/trip-details/tripPlan',
                  params: {trip: JSON.stringify(userTrips[index])},
                });
              }}
            >
              <Image
                source={{uri: googlePhotoUri + plan?.locationInfo?.photoRef + apiKeySuffex}}
                className='h-24 w-28 overflow-hidden rounded-2xl p-5'
              />
              <View className='mx-5'>
                <Text className='font-regular text-primary-400 text-2xl'>{plan?.locationInfo?.name}</Text>
                <Text className='font-light-l text-secondary-400 text-lg'>
                  {moment(plan?.startDate).format('DD MMM')} - {moment(plan?.endDate).format('DD MMM')}{' '}
                </Text>
                <Text className='font-light-l text-secondary-400 text-lg'>Traveler: {plan?.traveler?.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default UserTripsList;
