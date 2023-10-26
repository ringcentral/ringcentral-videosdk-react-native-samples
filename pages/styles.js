import {StyleSheet} from 'react-native';

export const COLOR_PRIMARY = 'rgba(90, 154, 230, 1)';

export const primaryBtnStyles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
  button: {
    backgroundColor: COLOR_PRIMARY,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 30,
  },
  container: {
    width: 240,
    marginHorizontal: 50,
    marginVertical: 10,
  },
});

export const clearBtnStyles = StyleSheet.create({
  title: {color: COLOR_PRIMARY},
  container: {
    marginHorizontal: 50,
    marginVertical: 10,
  },
});

export const actionBtnStyles = StyleSheet.create({
  icon: {
    color: '#fff',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '700',
  },
  button: {
    paddingHorizontal: 12,
    backgroundColor: '#484848',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 16,
  },
  container: {
    marginHorizontal: 4,
  },
});

export const inputStyles = StyleSheet.create({
  input: {width: '100%'},
});

export const txtStyles = StyleSheet.create({
  default: {
    color: '#666',
  },
});

export const joinCardStyle = StyleSheet.create({
  container: {width: '100%', padding: 8, borderRadius: 8},
});
export const welcomeStyles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 8,
  },
  actions: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: '100%',
  },
  info: {
    height: '10%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 8,
  },
});

export const meetingStyles = StyleSheet.create({
  layout: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  actions: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  info: {
    flexDirection: 'row',
    paddingTop: 4,
    color: '#fff',
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: '#333636',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  localVideo: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 160,
    height: 240,
    right: 24,
    bottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  localVideoView: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  localVideoViewMask: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
