import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Iconify } from 'react-native-iconify';
import { apiKeySuffex, getPhotoRef, googlePhotoUri, openMap } from '../../components/map';

const DaysSheet = ({tripPlan, day, dayNo}) => {
  const [photoRef, setPhotoRef] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getPhoto();
  }, []);

  const getPhoto = async () => {
    const ref = await getPhotoRef(tripPlan?.itinerary?.[day]?.morning?.place_name);
    setPhotoRef(ref);
  };

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '35%', '45%', '55%', '75%', '85%', '90%', '96%'], []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleDayPress = () => {
    setIsModalVisible(true);
    handleSnapPress(6);
  };

  const handleClosePress = () => {
    setIsModalVisible(false);
  };

  const renderPlaceDetails = (place) => (
    <View className='bg-secondary-100 border- rounded-2xl mx-7 my-3' key={place.place_name}>
      <Text className='font-med text-primary-600 text-2xl m-3 mb-1 '>{place.place_name}</Text>
      <Text className='font-regular text-secondary-600 text-justify pr-6 text-lg mx-3 mb-1'>{place.place_details}</Text>
      <View className='flex flex-row justify-start mx-3 mb-3'>
        <View className='flex-row gap-0.5 items-center'>
          <Iconify icon='hugeicons:ticket-star' strokeWidth='2' size={20} color='#5AA4A3' />
          <Text className='font-regular text-primary-400 text-lg  mr-2'>{place.ticket_pricing}</Text>
        </View>
        <TouchableOpacity onPress={() => openMap(place?.geo_coordinates)} className='flex-row gap-0.5 items-center'>
          <Iconify icon='hugeicons:cursor-02' strokeWidth='2' size={20} color='#5AA4A3' />
          <Text className='font-regular text-primary-400 text-lg underline'>Check Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDayContent = () => {
    const dayContent = tripPlan?.itinerary?.[day];
    if (!dayContent) return <Text>No data available for this day.</Text>;

    return (
      <>
        <Text className='font-b text-primary-800 text-3xl mx-7 my-2 '>Day {dayNo}</Text>
        {renderPlaceDetails(dayContent.morning)}
        {renderPlaceDetails(dayContent.afternoon)}
        {renderPlaceDetails(dayContent.evening)}
      </>
    );
  };

  return (
    <GestureHandlerRootView className='flex-1 mr-4'>
      <TouchableOpacity onPress={handleDayPress} className='justify-center items-center'>
        <Image source={{uri: googlePhotoUri + photoRef + apiKeySuffex}} className='h-48 w-40 rounded-2xl' />
        <Text className='font-med text-primary-400 text-2xl mt-2 '>Day {dayNo}</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType='fade' transparent={true}>
        <View className='flex-1 bg-transparent justify-center'>
          <BottomSheet
            ref={sheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={handleClosePress}
            backgroundStyle={styles.sheetContainer}
            handleIndicatorStyle={styles.customHandle}
          >
            <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
              {renderDayContent()}
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </Modal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    flex: 1,
    backgroundColor: '#FbFBFB',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  sheetContent: {
    flex: 1,
  },

  customHandle: {
    height: 4,
    width: 70,
    backgroundColor: '#5AA4A3',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 8,
  },
});

export default DaysSheet;
