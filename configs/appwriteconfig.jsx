import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Client, Databases, ID, Query } from 'react-native-appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66d47c880003bb06eede')
  .setPlatform('sen.mobile.travel');

const databases = new Databases(client);

const db_id = '66d48708001cd6180298';

const collection_id = 'UserTrips';
const user_collection_id = 'userData';

const account = new Account(client);

export const storeTrip = async (userID, tripData, tripPlan) => {
  await databases.createDocument(db_id, collection_id, ID.unique(), {
    userID: userID,
    tripData: tripData,
    tripPlan: tripPlan,
  });
};

export const getUserTrips = async (userID) => {
  try {
    const response = await databases.listDocuments(db_id, collection_id, [Query.equal('userID', userID)]);

    if (response.documents.length > 0) {
      // console.log('User Trips:', response.documents);
      return response.documents;
    } else {
      console.log('No trips found for this user.');
      return [];
    }
  } catch (error) {
    console.error('Error fetching user trips:', error);
    throw error;
  }
};

export const getAttr = async (userID, requiredAttr) => {
  try {
    // Fetch user trips
    const data = await getUserTrips(userID);

    if (!['tripData', 'tripPlan', 'userID'].includes(requiredAttr)) {
      throw new Error('Invalid attribute requested');
    }

    const attrArray = data.map((d) => {
      // Create an object with only the required attribute
      return {
        [requiredAttr]: d[requiredAttr],
      };
    });

    return attrArray;
  } catch (error) {
    console.error('Error retrieving attribute:', error);
    throw error;
  }
};

export const createUser = async () => {
  try {
    await account.createAnonymousSession();
    const currentNewAccount = await account.get();
    // console.log('user Account', currentNewAccount.$id);
    if (!currentNewAccount) throw Error;

    const store_result = await databases.createDocument(db_id, user_collection_id, ID.unique(), {
      sessionId: currentNewAccount.$id,
    });
    // console.log('DATA BASE RESULT', store_result);
    await AsyncStorage.setItem('userSession', currentNewAccount.$id);

    if (!store_result) throw Error;

    return currentNewAccount.$id;
  } catch (error) {
    console.log(error);
  }
  // console.log('user Created');
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    // console.log('Current data', currentAccount.$id);

    if (!currentAccount) throw Error;

    return currentAccount.$id;
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserSession = async () => {
  try {
    const currentAccount = await account.get(); 
    if (!currentAccount || !currentAccount.$id) {
      console.error('No active session found.');
      return;
    }
    await account.deleteSession('current'); 
    console.log('Appwrite session deleted');
  } catch (error) {
    console.error('Error deleting Appwrite session:', error);
  }
};