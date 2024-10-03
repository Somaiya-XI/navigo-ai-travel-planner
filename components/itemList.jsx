import {View, Text} from 'react-native';
import React from 'react';
import {Iconify} from 'react-native-iconify';

const ItemList = ({item}) => {
  return (
    <>
      <View className='flex flex-row'>
        {item.icon}
        <View>
          <Text className='font-regular text-primary-400 text-xl  ml-4'>{item.header}</Text>
          <Text className='font-light-l text-secondary-400 text-lg ml-4'>{item.detail}</Text>
        </View>
      </View>
    </>
  );
};

export default ItemList;
