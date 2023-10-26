import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from '@rneui/themed';
import {txtStyles, welcomeStyles} from './styles';
import {ENGINE_STATUS_INIT_SUCCESS} from './utils';
import {JoinMeetingCard} from './components/JoinMeetingCard';
import {StartMeetingCard} from './components/StartMeetingCard';

export function Welcome({engineStatus, error}) {
  return (
    <SafeAreaView style={welcomeStyles.layout}>
      <View style={welcomeStyles.actions}>
        {engineStatus === ENGINE_STATUS_INIT_SUCCESS ? (
          <>
            <StartMeetingCard />
            <JoinMeetingCard />
          </>
        ) : null}
      </View>
      <View style={welcomeStyles.info}>
        {error ? <Text style={txtStyles.default}>Error: {error}</Text> : null}
        <Text style={txtStyles.default}>Engine Status: {engineStatus}</Text>
      </View>
    </SafeAreaView>
  );
}
