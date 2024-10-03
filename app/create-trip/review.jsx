import { router, useNavigation } from 'expo-router';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { ItemList } from '../../components';
import { useTripContext } from '../../contexts';

const Review = () => {
  const {tripData, setTripData} = useTripContext();

  const data = [
    {
      header: 'Destination',
      detail: tripData?.locationInfo?.name,
      icon: <Iconify icon='hugeicons:share-location-01' size={52} color='#5AA4A3' />,
    },

    {
      header: 'Who is Traveling',
      detail: tripData?.traveler?.title,
      icon: <Iconify icon='hugeicons:train-01' size={52} color='#5AA4A3' />,
    },
    {
      header: 'Travel Date',
      detail: moment(tripData?.startDate).format('DD MMM') + ' to ' + moment(tripData?.endDate).format('DD MMM'),
      icon: <Iconify icon='hugeicons:calendar-03' size={52} color='#5AA4A3' />,
    },
    {
      header: 'Budget',
      detail: tripData?.budget,
      icon: <Iconify icon='hugeicons:money-bag-02' size={52} color='#5AA4A3' />,
    },
  ];
  const nav = useNavigation();

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
        <Text className='font-b text-primary-600 text-4xl'>Your Trip Details</Text>
      </View>
      <View className='flex-1 bg-white rounded-t-3xl'>
        <View className='mx-7 mt-7 mb-1'>
          <Text className='font-semi-bold text-primary-800 text-3xl'>Review selections below</Text>
          <View className='mt-4 mb-7'>
            {data.map((item, index) => (
              <View key={index} className='my-6'>
                <ItemList item={item}></ItemList>
              </View>
            ))}
            <TouchableOpacity
              className='bg-primary-600 px-6 py-3 rounded-full mt-8'
              onPress={() => router.replace('/create-trip/generate')}
            >
              <Text className='font-med text-white text-justify text-center text-2xl'>Build my trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Review;
