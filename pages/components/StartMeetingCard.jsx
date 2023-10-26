import React from 'react';
import {logger} from 'react-native-logs';
import {Button} from '@rneui/themed';
import {RcvEngine} from '@ringcentral/rcv-react-native-sdk';
import {primaryBtnStyles} from '../styles';
import Toast from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faVideoCamera} from '@fortawesome/free-solid-svg-icons/faVideoCamera';

const log = logger.createLogger();

export function StartMeetingCard() {
  return (
    <>
      <Button
        icon={
          <FontAwesomeIcon
            icon={faVideoCamera}
            style={{
              color: '#fff',
              marginRight: 4,
            }}
          />
        }
        title="Start Instant Meeting"
        titleStyle={primaryBtnStyles.title}
        buttonStyle={primaryBtnStyles.button}
        containerStyle={primaryBtnStyles.container}
        onPress={async () => {
          try {
            await RcvEngine.instance()?.startInstantMeeting();
          } catch (e) {
            log?.error?.(
              `error in startInstantMeeting, error code: ${e.code}, reason: ${e.reason}`,
            );
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: 'error in startInstantMeeting',
              text2: `error code: ${e.code}, reason: ${e.reason}`,
            });
          }
        }}
      />
    </>
  );
}
