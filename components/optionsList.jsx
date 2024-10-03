import React from 'react';
import { Text, View } from 'react-native';
import { Iconify } from 'react-native-iconify';

const OptionsList = ({option, selectedOption}) => {
  return (
    <View
      className={`bg-secondary-100 border-primary-100 border-2 rounded-2xl h-24 px-5 py-3 ${
        selectedOption?.id == option?.id && 'border-primary-600/[.9] '
      }`}
    >
      <View className='flex flex-row justify-between items-center'>
        <View>
        <Text className='font-med text-primary-600 text-2xl mb-1'>{option.title}</Text>        
        <Text className='font-light-l text-secondary-600 text-lg mb-1'>{option.desc}</Text>
</View>
        {selectedOption?.id == option?.id ? (
          <Iconify icon='hugeicons:checkmark-circle-01' size={30} color='#5AA4A3' />
        ) : (
          <Iconify icon='hugeicons:circle' size={30} color='#5AA4A3' />
        )}
      </View>
      <View className='flex'>
      </View>
    </View>
  );
};

export default OptionsList;