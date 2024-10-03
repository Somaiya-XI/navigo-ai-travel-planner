import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import LottieView from 'lottie-react-native';
import { AI_PROMPT } from '../../components';
import { chatSession, storeTrip } from '../../configs';
import { useTripContext, useUserContext } from "../../contexts";

const GenerateTrip = () => {
  const nav = useNavigation();
  const router = useRouter();
  const {tripData, setTripData} = useTripContext();
  const {userId} = useUserContext();

  const [landing, setLoading] = useState(false);

  const generateTrip = async () => {
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', tripData?.locationInfo?.name)
      .replace('{noDays}', tripData?.totalDays)
      .replace('{noNights}', tripData?.totalDays - 1)
      .replace('{traveler}', tripData?.traveler?.traveling)
      .replace('{budget}', tripData?.budget)
      .replace('{departure_city}', 'Riyadh, Saudi Arabia')
      .replace('{noDays}', tripData?.totalDays)
      .replace('{noNights}', tripData?.totalDays - 1);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    // console.log(result.response.text());
    // console.log(FINAL_PROMPT);

    setLoading(false);
    const generatedData = JSON.parse(result.response.text());

    const db_promise = storeTrip(userId, JSON.stringify(tripData), JSON.stringify(generatedData));
    db_promise.then(() => router.push('tabs/mytrip'));
  };

  useEffect(() => {
    generateTrip();
  }, []);

  useEffect(() => {
    nav.setOptions({
      headerTitle: () => <Text className='text-left text-secondary-600 font-b text-3xl w-full'></Text>,
      headerLeft: () => <></>,
      headerShown: true,
      headerTransparent: true,
      headerBackTitleVisible: false,
      headerBackVisible: false,
    });
  }, []);

  return (
    <View className='flex-1 bg-white h-[100%] items-center justify-center'>
      <View className='items-center justify-center'>
        <Text className='font-semi-bold text-primary-800 text-4xl '>Please Wait...</Text>
        <Text className='font-regular text-secondary-400 text-2xl mt-2 '> We are working to generate your trip</Text>
        <View className='flex h-64 w-64'>
          <LottieView
            source={require('./../../assets/images/loading.json')}
            style={{width: '100%', height: '100%'}}
            autoPlay
            loop
          />
        </View>
      </View>
      {/* <TouchableOpacity
        className='bg-primary-600 px-6 py-3 rounded-full mt-12'
        onPress={() => router.push('tabs/mytrip')}
      >
        <Text className='font-med text-white text-justify text-center text-2xl'>Continue</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default GenerateTrip;
