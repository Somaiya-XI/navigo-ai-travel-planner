import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { showSuccess } from '../../components';
import { deleteUserSession } from '../../configs';
import { useUserContext } from '../../contexts';

const Profile = () => {
      const {setUserId,setIsActiveUser,setIsLoading } = useUserContext();
        const router = useRouter();


  const clearSpecificKey = async (key) => {
    try {
      await deleteUserSession();
      await AsyncStorage.removeItem(key);
      setUserId(null);
      setIsActiveUser(false);
      setIsLoading(false);
    } catch (error) {
      console.log('Error clearing AsyncStorage key:', error);
    }
  };

  const clearUser = () => {
    clearSpecificKey('userSession');
    showSuccess('Your Account Deleted Successfully');
    router.push('/');
  };

  const showDeleteAlert = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to leave? This action results on deleting all your trip data.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Leave', onPress: () => clearUser()},
      ],
      {cancelable: false}
    );
  };

  return (
    <View className='flex-1 bg-white items-center justify-center bg-white'>
      <TouchableOpacity className='bg-primary-600 px-6 py-3 rounded-full mt-12' onPress={showDeleteAlert}>
        <Text className='font-med text-white text-justify text-center text-2xl'>Log Me Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
