import React, {useCallback, useMemo, useState} from 'react';
import {logger} from 'react-native-logs';
import {Button, Dialog} from '@rneui/themed';
import {actionBtnStyles} from '../styles';
import {ROUTE_WELCOME} from '../utils';
import {RcvEngine} from '@ringcentral/rcv-react-native-sdk';
import Toast from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons/faPhone';

const log = logger.createLogger();

export function LeaveMeetingButton({onUpdateRoute, meetingId}) {
  const [visible, setVisible] = useState(false);

  const meetingController = useMemo(() => {
    return RcvEngine.instance()?.getMeetingController(meetingId);
  }, [meetingId]);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const leaveMeeting = useCallback(async () => {
    try {
      if (meetingController) {
        await meetingController.leaveMeeting();
        onUpdateRoute(ROUTE_WELCOME);
      }
    } catch (e) {
      const errorMessage = `error in leaveMeeting, error code: ${e.code}, reason: ${e.reason}`;
      log?.error?.(errorMessage);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: errorMessage,
      });
    }
  }, [onUpdateRoute, meetingController]);

  const endMeeting = useCallback(async () => {
    try {
      if (meetingController) {
        await meetingController.endMeeting();
        onUpdateRoute(ROUTE_WELCOME);
      }
    } catch (e) {
      const errorMessage = `error in endMeeting, error code: ${e.code}, reason: ${e.reason}`;
      log?.error?.(errorMessage);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: errorMessage,
      });
    }
  }, [meetingController, onUpdateRoute]);

  return (
    <>
      <Button
        iconPosition={'top'}
        icon={
          <FontAwesomeIcon
            size={20}
            color={'#E6413C'}
            icon={faPhone}
            style={actionBtnStyles.icon}
          />
        }
        title="Leave"
        titleStyle={actionBtnStyles.title}
        buttonStyle={actionBtnStyles.button}
        containerStyle={actionBtnStyles.container}
        onPress={toggleDialog}
      />
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          backgroundColor: '#333636',
        }}>
        <Dialog.Title
          titleStyle={{
            backgroundColor: '#333636',
            color: '#fff',
          }}
          title="Please select an action"
        />
        <Dialog.Actions>
          <Dialog.Button title="Leave Meeting" onPress={leaveMeeting} />
          <Dialog.Button title="End Meeting" onPress={endMeeting} />
        </Dialog.Actions>
      </Dialog>
    </>
  );
}
