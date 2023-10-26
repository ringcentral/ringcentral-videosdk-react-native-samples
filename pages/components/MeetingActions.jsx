import React from 'react';
import {View} from 'react-native';
import {Button} from '@rneui/themed';
import {actionBtnStyles, meetingStyles} from '../styles';
import {LeaveMeetingButton} from './LeaveMeetingButton';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faMicrophoneSlash} from '@fortawesome/free-solid-svg-icons/faMicrophoneSlash';
import {faVideo} from '@fortawesome/free-solid-svg-icons/faVideo';
import {faVideoSlash} from '@fortawesome/free-solid-svg-icons/faVideoSlash';

export function MeetingActions({
  onUpdateRoute,
  meetingId,
  audioMuted,
  onToggleMuteAudio,
  onToggleMuteVideo,
  videoMuted,
}) {
  return (
    <View style={meetingStyles.actions}>
      <Button
        iconPosition={'top'}
        icon={
          <FontAwesomeIcon
            size={20}
            icon={audioMuted ? faMicrophoneSlash : faMicrophone}
            style={actionBtnStyles.icon}
          />
        }
        title={audioMuted ? 'Unmute' : 'Mute'}
        titleStyle={actionBtnStyles.title}
        buttonStyle={actionBtnStyles.button}
        containerStyle={actionBtnStyles.container}
        onPress={onToggleMuteAudio}
      />
      <Button
        iconPosition={'top'}
        icon={
          <FontAwesomeIcon
            size={20}
            icon={videoMuted ? faVideoSlash : faVideo}
            style={actionBtnStyles.icon}
          />
        }
        title={videoMuted ? 'Start Video' : 'Stop Video'}
        titleStyle={actionBtnStyles.title}
        buttonStyle={actionBtnStyles.button}
        containerStyle={actionBtnStyles.container}
        onPress={onToggleMuteVideo}
      />
      <LeaveMeetingButton onUpdateRoute={onUpdateRoute} meetingId={meetingId} />
    </View>
  );
}
