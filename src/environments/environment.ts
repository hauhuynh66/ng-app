// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'ng-fb-966ff',
    appId: '1:440247298126:web:ef9e8fb0cd2e30ec1ffb1f',
    databaseURL: 'https://ng-fb-966ff-default-rtdb.asia-southeast1.firebasedatabase.app',
    storageBucket: 'ng-fb-966ff.appspot.com',
    locationId: 'asia-southeast1',
    apiKey: 'AIzaSyA1h6nzfzxmpvCVBFHc7nkADhWHz5vLuCU',
    authDomain: 'ng-fb-966ff.firebaseapp.com',
    messagingSenderId: '440247298126',
  },
  production : false,
  requestUrl : "http://localhost:8400"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
