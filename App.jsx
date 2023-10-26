import React, {useCallback, useState} from 'react';
import Toast from 'react-native-toast-message';
import {Welcome} from './pages/Welcome';
import {Meeting} from './pages/Meeting';
import {
  ROUTE_WELCOME,
  ROUTE_MEETING,
  ENGINE_STATUS_INITIALIZING,
  ENGINE_STATUS_INIT_SUCCESS,
  permission,
} from './pages/utils';
import {EngineEvent, RcvEngine} from '@ringcentral/rcv-react-native-sdk';
import {clientId, clientSecret, userToken} from './credentials.json';
import {logger} from 'react-native-logs';

const log = logger.createLogger();

permission();
export default function App() {
  const [route, setRoute] = useState(ROUTE_WELCOME);
  const [meetingId, setMeetingId] = useState('');
  const [error, setError] = useState('');
  const [engineStatus, setEngineStatus] = useState(ENGINE_STATUS_INITIALIZING);

  const handleUpdateRoute = useCallback(newRoute => {
    setRoute(newRoute);
  }, []);

  React.useEffect(() => {
    async function init() {
      const engine = await RcvEngine.create(clientId, clientSecret);
      try {
        await engine.setAuthToken(JSON.stringify(userToken), true);
      } catch (e) {
        log?.error?.('error in set auth token', e);
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'Error in set auth token',
          text2: `Error code is ${e.errorCode}`,
        });
      }
      engine.on(EngineEvent.MEETING_JOINED, e => {
        if (e.meetingId) {
          log?.warn?.(`event: ${EngineEvent.MEETING_JOINED}`, e);
          setMeetingId(e.meetingId);
          setRoute(ROUTE_MEETING);
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Join Meeting Success',
          });
        } else {
          log?.warn?.(
            `error in join meeting, event: ${EngineEvent.MEETING_JOINED}`,
            e,
          );
          setError(e.errorCode);
          Toast.show({
            type: 'error',
            position: 'bottom',
            text1: 'Error in join meeting',
            text2: `Error code is ${e.errorCode}`,
          });
        }
      });
      engine.on(EngineEvent.MEETING_LEFT, e => {
        log?.warn?.(`event: ${EngineEvent.MEETING_LEFT}`, e);
        setMeetingId(e.meetingId);
        setError(`${e.reason} ${e.errorCode}`);
      });
      setEngineStatus(ENGINE_STATUS_INIT_SUCCESS);
    }
    init().catch(e => {
      log.error(e);
      const errorMessage = `error in init welcome page, error code: ${e.code}, reason: ${e.reason}`;
      log?.error?.(errorMessage);
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: errorMessage,
      });
    });
  }, [setMeetingId, setRoute]);

  return (
    <>
      {route === ROUTE_WELCOME ? (
        <Welcome engineStatus={engineStatus} error={error} />
      ) : null}
      {route === ROUTE_MEETING ? (
        <Meeting onUpdateRoute={handleUpdateRoute} meetingId={meetingId} />
      ) : null}
      <Toast />
    </>
  );
}
