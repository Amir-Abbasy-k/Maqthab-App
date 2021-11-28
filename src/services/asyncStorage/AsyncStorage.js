import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KEYS from './StorageKeys';
export {KEYS}


// TOKEN

export const setToken = async token => {
  try {
    await AsyncStorage.setItem(KEYS.TOKEN, token);
  } catch (error) {
    console.log(error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(KEYS.TOKEN);
    console.log('USER--------------', token);
    return token;
  } catch (error) {
    console.log('Error while getting token');
  }
};

// USER TYPE

export const setUserType = async type => {
  try {
    await AsyncStorage.setItem(KEYS.USER_TYPE, type);
  } catch (error) {
    console.log(error);
  }
};

export const getUserType = async () => {
  try {
    const type = await AsyncStorage.getItem(KEYS.USER_TYPE);
    return type;
  } catch (error) {
    console.log('Error while getting USER_TYPE');
  }
};




export const isLoggedIn = async () => {
  try {
    const token = await AsyncStorage.getItem(KEYS.TOKEN);
    console.log('TOKEN', token);
    if (token) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('Error while checking logged in');
  }
};

export const setUsername = async username => {
  try {
    await AsyncStorage.setItem(KEYS.USERNAME, username);
  } catch (error) {
    console.log('Error while saving username');
  }
};

export const getUserName = async () => {
  try {
    const name = await AsyncStorage.getItem(KEYS.USERNAME);
    return name;
  } catch (error) {
    console.log('Error while getting username');
  }
};

export const clearSession = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

// Profile

export const setProfile = async data => {
  try {
    await AsyncStorage.setItem(KEYS.PROFILE, data);
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(KEYS.PROFILE);
    // console.log('profile--------------', profile);
    return profile;
  } catch (error) {
    console.log('Error while getting token');
  }
};

// FCM Token

export const setFcmToken = async data => {
  try {
    await AsyncStorage.setItem('@fcm_token', data);
    console.log('firebase notification fcm token', data);
  } catch (error) {
    console.log(error);
  }
};

export const getFcmToken = async () => {
  try {
    const fcm_token = await AsyncStorage.getItem('@fcm_token');
    return fcm_token;
  } catch (error) {
    console.log('Error while getting firebase notification fcm token');
  }
};
