import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { apiKeySuffex, getPhotoRef, googlePhotoUri } from '../../components/map';

const HotelsCard = ({hotel}) => {
  const [photoRef, setPhotoRef] = useState();

  useEffect(() => {
    getPhoto();
  }, []);

  const getPhoto = async () => {
    const ref = await getPhotoRef(hotel.hotel_name);
    setPhotoRef(ref);
  };

  return (
    <View className='flex mr-4'>
      <Image source={{uri: googlePhotoUri + photoRef + apiKeySuffex}} className='h-24 w-36 rounded-2xl'></Image>
      <View className='w-36 '>
        <Text className='font-med text-primary-600 text-2xl mt-2 '>{hotel?.hotel_name}</Text>
      </View>
      <View className='flex flex-row justify-start'>
        <View className='flex-row gap-0.5 items-center'>
          <Iconify icon='hugeicons:star' strokeWidth='2' size={20} color='#5AA4A3' />
          <Text className='font-regular text-primary-400 text-lg  mr-1'>{hotel?.rating}</Text>
        </View>
        <View className='flex-row gap-0.5 items-center'>
          <Iconify icon='hugeicons:money-bag-02' strokeWidth='2' size={20} color='#5AA4A3' />
          <Text className='font-regular text-primary-400 text-lg'>{hotel?.price}</Text>
        </View>
      </View>
    </View>
  );
};

export default HotelsCard;
