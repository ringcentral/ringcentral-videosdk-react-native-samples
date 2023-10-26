import React, {useCallback, useMemo} from 'react';
import {logger} from 'react-native-logs';
import {View} from 'react-native';
import {Button} from '@rneui/themed';
import {actionBtnStyles, meetingStyles} from '../styles';
import {RcvEngine} from '@ringcentral/rcv-react-native-sdk';
import Toast from 'react-native-toast-message';

const log = logger.createLogger();

export function MeetingUserActions({meetingId}) {
  const meetingController = useMemo(() => {
    return RcvEngine.instance()?.getMeetingController(meetingId);
  }, [meetingId]);

  const userController = useMemo(() => {
    return meetingController?.getMeetingUserController();
  }, [meetingController]);

  const getMeetingUsers = useCallback(async () => {
    try {
      if (userController) {
        const users = await userController.getMeetingUsers();
        log?.info?.(`call getMeetingUsers and get: ${JSON.stringify(users)}`);
      }
    } catch (e) {
      const errorMessage = `error in getMeetingUsers, error code: ${e.code}, reason: ${e.reason}`;
      log?.error?.(errorMessage);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: errorMessage,
      });
    }
  }, [userController]);

  const getMyself = useCallback(async () => {
    try {
      if (userController) {
        const myself = await userController.getMyself();
        log?.info?.(`call getMyself and get: ${JSON.stringify(myself)}`);
      }
    } catch (e) {
      const errorMessage = `error in getMyself, error code: ${e.code}, reason: ${e.reason}`;
      log?.error?.(errorMessage);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: errorMessage,
      });
    }
  }, [userController]);

  return (
    <View style={meetingStyles.actions}>
      <Button
        title="getMeetingUsers"
        titleStyle={actionBtnStyles.title}
        buttonStyle={actionBtnStyles.button}
        containerStyle={actionBtnStyles.container}
        onPress={getMeetingUsers}
      />
      <Button
        title="getMyself"
        titleStyle={actionBtnStyles.title}
        buttonStyle={actionBtnStyles.button}
        containerStyle={actionBtnStyles.container}
        onPress={getMyself}
      />
    </View>
  );
}
