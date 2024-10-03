import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { OptionsList, budgetList } from '../../components';
import { useTripContext } from '../../contexts';

const Budget = () => {
  const nav = useNavigation();
  const router = useRouter();
  const [selected, setSelected] = useState();
  const {tripData, setTripData} = useTripContext();

  useEffect(() => {
    setTripData({...tripData, budget: selected?.title});
  }, [selected]);

  useEffect(() => {
    nav.setOptions({
      headerTitle: () => <Text className='text-left text-secondary-600 font-b text-3xl w-full'></Text>,
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
    <View className='flex-1 bg-secondary-200 pt-16'>
      <View className='flex flex-row items-center justify-between px-7 pt-8 pb-4'>
        <Text className='font-b text-primary-600 text-4xl'>Budget</Text>
      </View>
      <View className='flex-1 bg-white rounded-t-3xl'>
        <View className='mx-7 mt-7 mb-1'>
          <Text className='font-semi-bold text-primary-800 text-3xl'>Choose the spending habits</Text>
          <View className='mt-6'>
            {budgetList.map((item, index) => (
              <TouchableOpacity key={index} className='my-4' onPress={() => setSelected(item)}>
                <OptionsList option={item} selectedOption={selected}></OptionsList>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className='bg-primary-600 px-6 py-3 rounded-full mt-12'
              onPress={() =>{ if(selected) router.push('/create-trip/review')}}
            >
              <Text className='font-med text-white text-justify text-center text-2xl'>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Budget;
