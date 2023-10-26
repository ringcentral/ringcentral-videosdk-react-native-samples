import {useEffect, useMemo} from 'react';
import {logger} from 'react-native-logs';
import {MeetingEvent, RcvEngine} from '@ringcentral/rcv-react-native-sdk';

const log = logger.createLogger();

export function MeetingEventLogger({meetingId}) {
  const meetingController = useMemo(() => {
    return RcvEngine.instance()?.getMeetingController(meetingId);
  }, [meetingId]);

  useEffect(() => {
    const meetingAPIExecutedHandler = data => {
      log?.warn?.(
        `event ${MeetingEvent.MEETING_API_EXECUTED}: ${JSON.stringify(data)}`,
      );
    };
    const userJoinedHandler = data => {
      log?.warn?.(`event ${MeetingEvent.USER_JOINED}: ${JSON.stringify(data)}`);
    };
    const userLeaveHandler = data => {
      log?.warn?.(`event ${MeetingEvent.USER_LEFT}: ${JSON.stringify(data)}`);
    };
    // const userUpdateHandler = (data: any) => {
    //   log?.warn?.(
    //     `event ${MeetingEvent.USER_UPDATED}: ${JSON.stringify(data)}`
    //   );
    // };

    if (meetingController) {
      meetingController.on(
        MeetingEvent.MEETING_API_EXECUTED,
        meetingAPIExecutedHandler,
      );

      meetingController.on(MeetingEvent.USER_JOINED, userJoinedHandler);

      // meetingController.on(MeetingEvent.USER_UPDATED, userUpdateHandler);

      meetingController.on(MeetingEvent.USER_LEFT, userLeaveHandler);
    }

    return () => {
      if (meetingController) {
        meetingController.off(
          MeetingEvent.MEETING_API_EXECUTED,
          meetingAPIExecutedHandler,
        );

        meetingController.off(MeetingEvent.USER_JOINED, userJoinedHandler);

        // meetingController.off(MeetingEvent.USER_UPDATED, userUpdateHandler);

        meetingController.off(MeetingEvent.USER_LEFT, userLeaveHandler);
      }
    };
  }, [meetingController, meetingId]);

  return null;
}
