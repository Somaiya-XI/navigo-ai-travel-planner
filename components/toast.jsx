import { Alert, Platform, ToastAndroid } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';

export const toastConfig = {
  customSuccess: (props) => (
    <BaseToast
      {...props}
      style={{
        shadowOpacity: 0,
        shadowColor: Platform.OS === 'android' ? 'white' : 'black',
        borderRadius: 50,
        marginTop: 16,
        borderWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: Platform.OS === 'android' ? '#dcfce7' : '#CDE2D4',
      }}
      contentContainerStyle={{paddingHorizontal: 30, position: 'relative'}}
      text1Style={{
        fontSize: 16,
        fontFamily: 'fira-b',
        color: '#0A722E',
      }}
      text2Style={{
        marginTop: 3,
        fontSize: 15,
        fontFamily: 'fira-r',
        color: '#000000',
      }}
    />
  ),
  customError: (props) => (
    <BaseToast
      {...props}
      style={{
        shadowOpacity: 0,
        shadowColor: Platform.OS === 'android' ? 'white' : 'black',
        borderRadius: 50,
        marginTop: 16,
        borderWidth: 0,
        borderLeftWidth: 0,
        backgroundColor: Platform.OS === 'android' ? '#dcfce7' : '#FFE7E7',
      }}
      contentContainerStyle={{paddingHorizontal: 30, position: 'relative'}}
      text1Style={{
        fontSize: 16,
        fontFamily: 'fira-b',
        color: '#166534',
      }}
      text2Style={{
        marginTop: 3,
        fontSize: 15,
        fontFamily: 'fira-r',
        color: '#71717a',
      }}
    />
  ),
};

export function toast(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    Alert.alert(msg);
  }
}

export const showMsg = (msg) => {
  Toast.show({
    type: 'customError',
    text1: 'Error',
    text2: msg,
  });
};

export const showSuccess = (msg) => {
  Toast.show({
    type: 'customSuccess',
    text1: 'Success',
    text2: msg,
  });
};

