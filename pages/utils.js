import {check, RESULTS, request, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';
import {logger} from 'react-native-logs';

const log = logger.createLogger();

export const ROUTE_WELCOME = 'WELCOME';
export const ROUTE_MEETING = 'MEETING';

export const ENGINE_STATUS_INITIALIZING = 'INITIALIZING';
export const ENGINE_STATUS_INIT_SUCCESS = 'AVAILABLE';

export function findRemoteUser(users) {
  let user = null;
  Object.values(users).forEach(tmpUser => {
    if (tmpUser.uid && !tmpUser.isMe) {
      user = tmpUser;
    }
  });
  return user;
}

export function permission() {
  if (Platform.OS === 'ios') {
    checkAndRequestPermissions(PERMISSIONS.IOS.CAMERA)
      .then(result => {
        log?.warn?.(
          `check and request permissions success ${PERMISSIONS.IOS.CAMERA}: ${result}`,
        );
      })
      .catch(e => {
        log?.error?.(
          `check and request permissions error ${PERMISSIONS.IOS.CAMERA}: ${e.message}`,
        );
      });
    checkAndRequestPermissions(PERMISSIONS.IOS.MICROPHONE)
      .then(result => {
        log?.warn?.(
          `check and request permissions success ${PERMISSIONS.IOS.MICROPHONE}: ${result}`,
        );
      })
      .catch(e => {
        log?.error?.(
          `check and request permissions error ${PERMISSIONS.IOS.MICROPHONE}: ${e.message}`,
        );
      });
  } else if (Platform.OS === 'android') {
    checkAndRequestPermissions(PERMISSIONS.ANDROID.CAMERA)
      .then(result => {
        log?.warn?.(
          `check and request permissions success ${PERMISSIONS.ANDROID.CAMERA}: ${result}`,
        );
      })
      .catch(e => {
        log?.error?.(
          `check and request permissions error ${PERMISSIONS.ANDROID.CAMERA}: ${e.message}`,
        );
      });
    checkAndRequestPermissions(PERMISSIONS.ANDROID.RECORD_AUDIO)
      .then(result => {
        log?.warn?.(
          `check and request permissions success ${PERMISSIONS.ANDROID.RECORD_AUDIO}: ${result}`,
        );
      })
      .catch(e => {
        log?.error?.(
          `check and request permissions error ${PERMISSIONS.ANDROID.RECORD_AUDIO}: ${e.message}`,
        );
      });
  }
}

export function checkAndRequestPermissions(permission) {
  return new Promise((resolve, reject) => {
    check(permission)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            reject(
              new Error(
                'This feature is not available (on this device / in this context)',
              ),
            );
            break;
          case RESULTS.BLOCKED:
            reject(
              new Error('The permission is denied and not requestable anymore'),
            );
            break;
          case RESULTS.LIMITED:
            reject(
              new Error('The permission is limited: some actions are possible'),
            );
            break;
          case RESULTS.GRANTED:
            resolve(true);
            break;
          case RESULTS.DENIED:
            requestPermission(permission).then(resolve).catch(reject);
            break;
        }
      })
      .catch(reject);
  });
}

function requestPermission(permission) {
  return new Promise((resolve, reject) => {
    request(permission)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            reject(
              new Error(
                'This feature is not available (on this device / in this context)',
              ),
            );
            break;
          case RESULTS.BLOCKED:
            reject(
              new Error('The permission is denied and not requestable anymore'),
            );
            break;
          case RESULTS.LIMITED:
            reject(
              new Error('The permission is limited: some actions are possible'),
            );
            break;
          case RESULTS.GRANTED:
            resolve(true);
            break;
          case RESULTS.DENIED:
            reject(
              new Error(
                'The permission has not been requested / is denied but requestable',
              ),
            );
            break;
        }
      })
      .catch(reject);
  });
}
