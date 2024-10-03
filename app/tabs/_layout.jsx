import { Tabs } from 'expo-router';
import React from 'react';
import { Iconify } from 'react-native-iconify';
import { TabBar } from '../../components';

const _layout = () => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='mytrip'
        options={{
          tabBarLabel: 'My Trips',
          title: 'My Trips',
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: 'Profile',
          title: 'Profile',
          tabBarIcon: () => <Iconify icon='hugeicons:user-circle' size={22} color='#6C4BCF' />,
        }}
      />
    </Tabs>
  );
};

export default _layout;
