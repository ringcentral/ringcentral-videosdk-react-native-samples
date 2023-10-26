import React, {useCallback, useEffect, useRef} from 'react';
import {meetingStyles} from '../styles';
import {
  MeetingEvent,
  RcvEngine,
  RcvVideoView,
} from '@ringcentral/rcv-react-native-sdk';
import {findRemoteUser} from '../utils';

export function RemoteVideoView({meetingId}) {
  const remoteViewRef = useRef(null);

  const getRemoteUid = useCallback(async () => {
    const allUsers = await RcvEngine.instance()
      ?.getMeetingController(meetingId)
      ?.getMeetingUserController()
      ?.getMeetingUsers();
    const remoteUser = findRemoteUser(allUsers || {});
    return remoteUser?.uid;
  }, [meetingId]);

  const setupRemoteVideo = useCallback(
    async uid => {
      const meetingController =
        RcvEngine.instance()?.getMeetingController(meetingId);
      const videoController = meetingController?.getVideoController();
      if (videoController && remoteViewRef.current && uid) {
        await videoController.setupRemoteVideo({
          uid,
          view: remoteViewRef.current,
        });
      }
    },
    [meetingId],
  );

  const refreshRemoteVideoView = useCallback(async () => {
    const uid = await getRemoteUid();
    await setupRemoteVideo(uid);
  }, [getRemoteUid, setupRemoteVideo]);

  useEffect(() => {
    refreshRemoteVideoView().then(() => {
      RcvEngine.instance()
        ?.getMeetingController(meetingId)
        ?.on(MeetingEvent.USER_JOINED, refreshRemoteVideoView);
    });
    return () => {
      RcvEngine.instance()
        ?.getMeetingController(meetingId)
        ?.off(MeetingEvent.USER_JOINED, refreshRemoteVideoView);
    };
  }, [meetingId, refreshRemoteVideoView]);
  return <RcvVideoView style={meetingStyles.remoteVideo} ref={remoteViewRef} />;
}
