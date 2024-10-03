import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Iconify } from 'react-native-iconify';
import { NewTripCard, UserTripsList } from '../../components';
import { getUserTrips } from '../../configs';
import { useUserContext } from '../../contexts';

const Mytrip = () => {
  const [userTrips, setUserTrips] = useState([]);
  const {userId} = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const fetchUserTrips = async () => {
      try {
        if (userId) {
          const trips = await getUserTrips(userId);
          setUserTrips(trips);
        }
      } catch (error) {
        console.error('Failed to fetch user trips:', error);
      }
    };

    fetchUserTrips();
  }, []);

  return (
    <View className={`flex-1 ${userTrips?.length != 0 ? 'bg-secondary-200' : 'bg-white'} pt-16`}>
      {userTrips?.length != 0 && (
        <View className='flex flex-row items-center justify-between px-7 pt-8 pb-4'>
          <Text className='font-b text-primary-600 text-4xl'>My Trips</Text>
          <TouchableOpacity onPress={() => router.push('/create-trip/search')}>
            <Iconify icon='hugeicons:add-circle' strokeWidth='2' size={30} color='#F06039' style={{margin: 2}} />
          </TouchableOpacity>
        </View>
      )}

      {userTrips?.length == 0 ? <NewTripCard /> : <UserTripsList trips={userTrips} />}
    </View>
  );
};

export default Mytrip;
