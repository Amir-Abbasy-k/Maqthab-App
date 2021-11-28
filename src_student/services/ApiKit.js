import Axios from 'axios';
// import * as Utils from './';
import {getToken}from '../services/asyncStorage/AsyncStorage'

export const BaseUrl = 'http://staging.maqtab.in/api/';
export const API_KEY = 'IceknuGz3kgH9XlvYDOwrQciMa61GsiKXvtqT6un1c';

let APIKit = Axios.create({
  baseURL: BaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Api-Key": API_KEY,
  },
});

APIKit.interceptors.request.use(
  async config => {
    // Do something before request is sent
    //If the header does not contain the token and the url not public, redirect to login

    // var customHeaders = await Utils.getHeaders();
    var customHeaders = {};
    const token = await getToken();
    console.log("TOKEN", token);
    // if (token) customHeaders = { "Authorization": `Bearer 2|0fE3uqqtbyzw9F1fYBmFTm8k5WGR0mLn4ZIhFdgO`};
    if (token) customHeaders = { "Authorization": `Bearer ${token}`};
    else customHeaders = {"Api-Key":API_KEY};

    config.headers = {...config.headers, ...customHeaders};


    var customData = {};

    // const token = await Utils.getAsyncStorage().getToken();
    // if (token) customData = {...customData, 'access-token' : token};
    // else customData = {...customData, "Api-Key":API_KEY};

    config.data = {...config.data, ...customData};

    console.log('%%%%%%%%-params-%%%%%%%%%', config.data);

    return config;
  },
  function (error) {
    // Do something with request error
    console.log('error request');
    console.log(error);
    return promise.reject(error);
  },
);

// Add a response interceptor
APIKit.interceptors.response.use(
  async response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response);
    return response;
  },
  async error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('response', error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      // console.log(error.response);
      return error.response
      // console.log('error code.......:  ', error);

      if (error.response.status == 403) {
        
      //   Utils.getAsyncStorage()
      //     .clearSession()
      //     .then(() => {
      //       if (!isLoggedIn) {
      //         Utils.showToast('Your session has been expired!');
      //         RootNavigation.replace('Login');
      //       }
      //     });
        
      // } else if (error.response.data.error) {
      //   Utils.showToast(error.response.data.error.description);
        console.log(error.response);
      //   return error.response.data.error;
      // } else {
      //   Utils.showToast('Internal error occured');
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the
      // browser and an instance of
      // http.ClientRequest in node.js
      console.log('error.request');
      return error
      // Utils.showToast('Network error occured');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
      // Utils.showToast(error.message);
      return error;
    }
    return Promise.reject(error);
  },
);

export default APIKit;
