import {useRouter} from 'expo-router';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Iconify} from 'react-native-iconify';

const NewTripCard = () => {
  const router = useRouter();

  return (
    <View className='flex items-center p-9 gap-5 mt-36'>
      <Iconify icon='hugeicons:location-10' size={40} color='#E93119' />
      <Text className='font-semi-bold text-primary-800 text-justify text-center text-4xl'>No planned trips</Text>
      <Text className='font-regular text-secondary-400 text-justify text-center text-lg'>
        It seems like it’s the perfect moment to plan your next adventure! Don’t miss out—
      </Text>
      <TouchableOpacity
        className='bg-primary-600 px-6 py-3 rounded-full'
        onPress={() => router.push('/create-trip/search')}
      >
        <Text className='font-med text-white text-justify text-center text-2xl'>Start a new trip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewTripCard;
