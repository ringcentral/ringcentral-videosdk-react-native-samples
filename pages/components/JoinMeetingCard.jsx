import React, {useState} from 'react';
import {logger} from 'react-native-logs';
import {Button, Input, Card} from '@rneui/themed';
import {RcvEngine} from '@ringcentral/rcv-react-native-sdk';
import {
  clearBtnStyles,
  COLOR_PRIMARY,
  inputStyles,
  joinCardStyle,
} from '../styles';
import Toast from 'react-native-toast-message';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faRightToBracket} from '@fortawesome/free-solid-svg-icons/faRightToBracket';

const log = logger.createLogger();

export function JoinMeetingCard() {
  const [tmpMeetingId, setTmpMeetingId] = useState('');
  const [tmpUsername, setTmpUsername] = useState('');
  const [tmpPassword, setTmpPassword] = useState('');

  return (
    <Card containerStyle={joinCardStyle.container}>
      <Card.Title>Join Meeting</Card.Title>
      <Input
        value={tmpMeetingId}
        placeholder="Input meeting id to join a meeting"
        style={inputStyles.input}
        onChangeText={setTmpMeetingId}
      />
      <Input
        value={tmpUsername}
        placeholder="Input username"
        style={inputStyles.input}
        onChangeText={setTmpUsername}
      />
      <Input
        value={tmpPassword}
        placeholder="Input password"
        style={inputStyles.input}
        onChangeText={setTmpPassword}
      />
      <Button
        icon={
          <FontAwesomeIcon
            icon={faRightToBracket}
            style={{
              color: COLOR_PRIMARY,
              marginRight: 4,
            }}
          />
        }
        title="Join Meeting"
        type="clear"
        titleStyle={clearBtnStyles.title}
        onPress={async () => {
          try {
            await RcvEngine.instance()?.joinMeeting(tmpMeetingId, {
              userName: tmpUsername,
              password: tmpPassword,
            });
          } catch (e) {
            log?.error?.(
              `error in joinMeeting, error code: ${e.code}, reason: ${e.reason}`,
            );
            Toast.show({
              type: 'error',
              position: 'bottom',
              text1: 'error in joinMeeting',
              text2: `error code: ${e.code}, reason: ${e.reason}`,
            });
          }
        }}
      />
    </Card>
  );
}
