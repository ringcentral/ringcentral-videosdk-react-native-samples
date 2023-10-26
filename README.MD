
### Install dependencies
```sh
yarn install
```
#### ios
Add `rcv-react-native-sdk` dependencies in `Podfile`

`pod 'rcv-react-native-sdk' , :path => '../node_modules/@ringcentral/rcv-react-native-sdk'`

Then `cd ios` `pod install`

#### android
change `android/build.gradle` `minSdkVersion > 21`


### run 
#### ios
`yarn ios`
#### android
`yarn android`


### May be help
#### ios
- https://stackoverflow.com/questions/63261150/yogakit-modulemap-not-found-after-running-the-ios-simulator
- https://github.com/facebook/react-native/issues/36762
- https://github.com/facebook/react-native/issues/28503
- https://github.com/facebook/metro/issues/1003