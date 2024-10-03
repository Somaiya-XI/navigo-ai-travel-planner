import { Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { View } from 'react-native';
import 'react-native-url-polyfill/auto';


import Toast from 'react-native-toast-message';
import { Splash, toastConfig } from '../components';
import { useUserContext } from '../contexts';

export default function Index() {
  const {isLoading, isActiveUser} = useUserContext();

  return (
    <View className='flex-1'>
      <StatusBar style='dark' />
      {isActiveUser ? <Redirect href={'./tabs/mytrip'}></Redirect> :<Splash />  }
      <Toast config={toastConfig} />
    </View>
  );
}

