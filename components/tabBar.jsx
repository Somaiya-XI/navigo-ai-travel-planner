import {Text, TouchableOpacity, View} from 'react-native';
import {Iconify} from 'react-native-iconify';

export function TabBar({state, descriptors, navigation}) {
  const icon = {
    mytrip: (props) => <Iconify icon='hugeicons:location-10' size={24} {...props} />,
    profile: (props) => <Iconify icon='hugeicons:user-circle' size={24} {...props} />,
  };
  return (
    <View
      className='absolute flex-row bg-white  justify-between items-center mx-16 py-3 px-3 rounded-full w-48 self-center'
      style={{
        bottom: 40,
        shadowColor: '#63636333',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole='button'
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className='flex-1 justify-center items-center gap-1'
          >
            {icon[route.name]({color: isFocused ? '#5AA4A3' : '#C3CDCD'})}
            <Text style={{color: isFocused ? '#5AA4A3' : '#C3CDCD'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
