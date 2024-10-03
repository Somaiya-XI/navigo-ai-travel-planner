import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components';
import { TripContextProvider, UserContextProvider } from './../contexts';

export default function RootLayout() {
  useFonts({
    dortage: require('./../assets/fonts/dortage.ttf'),
    'fira-r': require('./../assets/fonts/FiraSansCondensed-Regular.ttf'),
    'fira-m': require('./../assets/fonts/FiraSansCondensed-Medium.ttf'),
    'fira-sb': require('./../assets/fonts/FiraSansCondensed-SemiBold.ttf'),
    'fira-i': require('./../assets/fonts/FiraSansCondensed-Italic.ttf'),
    'fira-b': require('./../assets/fonts/FiraSansCondensed-Bold.ttf'),
    'fira-th': require('./../assets/fonts/FiraSansCondensed-Thin.ttf'),
    'fira-l': require('./../assets/fonts/FiraSansCondensed-Light.ttf'),
    'fira-extra-l': require('./../assets/fonts/FiraSansCondensed-ExtraLight.ttf'),
  });

  return (
    <UserContextProvider>
      <TripContextProvider>
        <Stack screenOptions={{headerShown: false}}>
          <Stack.Screen name='tabs' />
        </Stack>
        <Toast config={toastConfig} />
      </TripContextProvider>
    </UserContextProvider>
  );
}
