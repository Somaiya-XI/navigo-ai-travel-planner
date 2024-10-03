import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { createUser } from '../configs';
import { useUserContext } from '../contexts';


const Splash = () => {
  const router = useRouter();
  const {setUserId, setIsActiveUser} = useUserContext();

  onStarted = () => {
    createUser()
      .then((response) => {
        // console.log('CREATION RESPONSE IS THE ID: ', response);
        setUserId(response);
        setIsActiveUser(true);
        router.replace('./tabs/mytrip');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View className='flex-1 bg-white items-center'>
      <View className='h-[30%] mt-24'>
        <Image
          source={require('@/assets/images/TravelPlanning2.png')}
          className='w-[340px]  max-w-[1024px] p-0 object-contain '
        ></Image>
      </View>
        <Text className='font-display text-primary-600 text-center text-8xl mt-16 p-1'>Navigo </Text>
        <View className='flex items-center mx-6 mt-3'>
          <Text className='font-med text-secondary-400 text-justify text-center text-2xl'>
            Dive into your next journey with ease. Experience tailor-made itineraries and travel smarter with AI-driven
            insights!
          </Text>
          <TouchableOpacity className='bg-primary-600 px-6 py-3 rounded-full mt-12' onPress={onStarted}>
            <Text className='font-med text-white text-justify text-center text-2xl'>Get Started</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default Splash;
