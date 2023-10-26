import React, {useCallback, useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from '@rneui/themed';
import {meetingStyles} from './styles';
import {MeetingEventLogger} from './components/MeetingEventLogger';
// import { MeetingUserActions } from '../components/MeetingUserActions';
import {MeetingActions} from './components/MeetingActions';
import {LocalVideoView} from './components/LocalVideoView';
import {RemoteVideoView} from './components/RemoteVideoView';
import {
  AudioEvent,
  RcvEngine,
  VideoEvent,
} from '@ringcentral/rcv-react-native-sdk';
import Toast from 'react-native-toast-message';

import {logger} from 'react-native-logs';

const log = logger.createLogger();

export function Meeting({onUpdateRoute, meetingId}) {
  const [audioMuted, setAudioMuted] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);

  const toggleMuteAudio = useCallback(async () => {
    try {
      const audioController = RcvEngine.instance()
        ?.getMeetingController(meetingId)
        ?.getAudioController();
      if (audioController) {
        await audioController.muteLocalAudioStream(!audioMuted);
      }
    } catch (e) {
      log?.error?.(
        `error in muteLocalAudioStream, error code: ${e.code}, reason: ${e.reason}`,
      );
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error in muteLocalAudioStream',
        text2: `error code: ${e.code}, reason: ${e.reason}`,
      });
    }
  }, [audioMuted, meetingId]);

  const toggleMuteVideo = useCallback(async () => {
    try {
      const videoController = RcvEngine.instance()
        ?.getMeetingController(meetingId)
        ?.getVideoController();
      if (videoController) {
        await videoController.muteLocalVideoStream(!videoMuted);
      }
    } catch (e) {
      log?.error?.(
        `error in muteLocalVideoStream, error code: ${e.code}, reason: ${e.reason}`,
      );
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'error in muteLocalVideoStream',
        text2: `error code: ${e.code}, reason: ${e.reason}`,
      });
    }
  }, [meetingId, videoMuted]);

  useEffect(() => {
    const localVideoMuteHandler = muted => {
      setVideoMuted(muted);
      log?.warn?.(
        `event ${VideoEvent.LOCAL_VIDEO_MUTE_CHANGED}: ${JSON.stringify(
          muted,
        )}`,
      );
    };
    const localAudioMuteHandler = muted => {
      setAudioMuted(muted);
      log?.warn?.(
        `event ${AudioEvent.LOCAL_AUDIO_MUTE_CHANGED}: ${JSON.stringify(
          muted,
        )}`,
      );
    };
    RcvEngine.instance()
      ?.getMeetingController(meetingId)
      ?.getVideoController()
      ?.on(VideoEvent.LOCAL_VIDEO_MUTE_CHANGED, localVideoMuteHandler);

    RcvEngine.instance()
      ?.getMeetingController(meetingId)
      ?.getAudioController()
      ?.on(AudioEvent.LOCAL_AUDIO_MUTE_CHANGED, localAudioMuteHandler);

    return () => {
      RcvEngine.instance()
        ?.getMeetingController(meetingId)
        ?.getVideoController()
        ?.off(VideoEvent.LOCAL_VIDEO_MUTE_CHANGED, localVideoMuteHandler);

      RcvEngine.instance()
        ?.getMeetingController(meetingId)
        ?.getAudioController()
        ?.off(AudioEvent.LOCAL_AUDIO_MUTE_CHANGED, localAudioMuteHandler);
    };
  }, [meetingId]);
  return (
    <SafeAreaView style={meetingStyles.layout}>
      <RemoteVideoView meetingId={meetingId} />
      <LocalVideoView videoMuted={videoMuted} meetingId={meetingId} />
      <View>
        <Text style={meetingStyles.info}>MeetingId: {meetingId}</Text>
      </View>
      <MeetingActions
        audioMuted={audioMuted}
        videoMuted={videoMuted}
        onToggleMuteVideo={toggleMuteVideo}
        onToggleMuteAudio={toggleMuteAudio}
        meetingId={meetingId}
        onUpdateRoute={onUpdateRoute}
      />
      {/*<MeetingUserActions meetingId={meetingId} />*/}
      <MeetingEventLogger meetingId={meetingId} />
    </SafeAreaView>
  );
}
