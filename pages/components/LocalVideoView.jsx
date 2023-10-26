import React, {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {Button} from '@rneui/themed';
import {actionBtnStyles, meetingStyles} from '../styles';
import {RcvEngine, RcvVideoView} from '@ringcentral/rcv-react-native-sdk';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCameraRotate} from '@fortawesome/free-solid-svg-icons/faCameraRotate';

export function LocalVideoView({meetingId, videoMuted}) {
  const localViewRef = useRef(null);

  useEffect(() => {
    const didMount = async () => {
      const meetingController =
        RcvEngine.instance()?.getMeetingController(meetingId);
      const videoController = meetingController?.getVideoController();
      if (videoController && localViewRef.current) {
        await videoController.setupLocalVideo({
          uid: '0',
          view: localViewRef.current,
        });
      }
    };
    didMount().then();
  }, [meetingId]);

  const switchCamera = useCallback(async () => {
    await RcvEngine.instance()
      ?.getMeetingController(meetingId)
      ?.getVideoController()
      ?.switchCamera();
  }, [meetingId]);

  return (
    <View style={meetingStyles.localVideo}>
      <RcvVideoView style={meetingStyles.localVideoView} ref={localViewRef} />
      {videoMuted ? <View style={meetingStyles.localVideoViewMask} /> : null}
      <Button
        icon={
          <FontAwesomeIcon
            icon={faCameraRotate}
            style={{
              color: '#fff',
              marginRight: 4,
            }}
          />
        }
        titleStyle={actionBtnStyles.title}
        buttonStyle={{
          ...actionBtnStyles.button,
          backgroundColor: '#484848',
          width: 96,
          marginTop: 8,
        }}
        containerStyle={actionBtnStyles.container}
        onPress={switchCamera}>
        Switch
      </Button>
    </View>
  );
}
