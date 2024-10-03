import { useNavigation, useRouter } from 'expo-router';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Iconify } from 'react-native-iconify';
import { ItemList } from '../../components';
import { useTripContext } from '../../contexts';

const DateSelect = () => {
  const nav = useNavigation();
  const router = useRouter();
  const {tripData, setTripData} = useTripContext();
  const today = new Date();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const data = [
    {
      header: 'Destination',
      detail: tripData?.locationInfo?.name,
      icon: <Iconify icon='hugeicons:share-location-01' size={50} color='#5AA4A3' />,
    },
    {
      header: 'Who is Traveling',
      detail: tripData?.traveler?.title,
      icon: <Iconify icon='hugeicons:train-01' size={50} color='#5AA4A3' />,
    },
  ];

  onDateChange = (date, type) => {
    if (type == 'START_DATE') {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  onClick = () => {
    if (!startDate || !endDate) {
      // add toast
      return;
    }
    const totalNoOfDays = endDate.diff(startDate, 'days') + 1;
    setTripData({...tripData, startDate: startDate, endDate: endDate, totalDays: totalNoOfDays});

    router.push('/create-trip/budget');
  };

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

  const customDatesStylesFunc = (date) => {
    return {
      containerStyle: {
        marginHorizontal: -1,
      },
      textStyle: {
        fontFamily: 'fira-l',
        color: '#5AA4A3',
      },
    };
  };
  return (
    <View className='flex-1 bg-secondary-200 pt-16'>
      <View className='flex flex-row items-center justify-between px-7 pt-8 pb-4'>
        <Text className='font-b text-primary-600 text-4xl'>Choose the Date</Text>
      </View>
      <View className='flex-1 bg-white rounded-t-3xl'>
        <View className='mx-7 mt-7 mb-1'>
          <View className=''>
            <CalendarPicker
              onDateChange={onDateChange}
              minDate={today}
              todayBackgroundColor={'#ECF5F5'}
              textStyle={{fontFamily: 'fira-r', color: '#5AA4A3'}}
              disabledDatesTextStyle={{color: '#D3E8E9'}}
              allowRangeSelection={true}
              maxRangeDuration={3}
              selectedRangeStyle={{backgroundColor: '#D3E8E9'}}
              todayTextStyle={{fontFamily: 'fira-l'}}
              selectedDayTextStyle={{fontFamily: 'fira-r', color: '#5AA4A3'}}
              customDatesStyles={customDatesStylesFunc} // Apply to all dates
              headerWrapperStyle={{paddingHorizontal: 55, fontFamily: 'fira-b'}} //prev next year month wrapper
              dayLabelsWrapper={{marginVertical: 0, borderColor: '#000', borderTopWidth: 0, borderBottomWidth: 0}} //arround days wrapper (m and p related to lines)
              monthTitleStyle={{fontFamily: 'fira-r', color: '#044C71'}}
              yearTitleStyle={{fontFamily: 'fira-r', color: '#044C71'}}
              previousTitleStyle={{fontFamily: 'fira-r', color: '#044C71'}}
              nextTitleStyle={{fontFamily: 'fira-r', color: '#044C71'}}
              monthYearHeaderWrapperStyle={{fontFamily: 'fira-sb', color: '#044C71'}}
              customDayHeaderStyles={() => {
                return {
                  textStyle: {
                    fontFamily: 'fira-sb',
                    margin: -2,
                    marginHorizontal: -0.4,
                    color: '#5AA4A3',
                  },
                };
              }}
            />
            <Text className='font-semi-bold text-primary-800 text-3xl mt-10 mb-7'>Current plan details </Text>

            <View className='flex justify-center'>
              {data.map((item, index) => (
                <View key={index} className='mb-10'>
                  <ItemList item={item}></ItemList>
                </View>
              ))}
            </View>

            <TouchableOpacity className='bg-primary-600 px-6 py-3 rounded-full mt-6' onPress={onClick}>
              <Text className='font-med text-white text-justify text-center text-2xl'>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DateSelect;
