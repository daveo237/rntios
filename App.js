/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { Button } from 'react-native-elements';
import analytics from '@segment/analytics-react-native';
import IdentifySettings from './components/IdentifySettings';
import TrackSettings from './components/TrackSettings';

analytics
  .setup('ilrQLGpSKvTLr1iuBuKjSH3wwBD7RDOh', {
    // using: [Firebase],
    flushAt: 1,
    debug: true,
    // if recordScreenViews is set to true then clicking on input fields triggers screen calls - SDK may be tracking some sort of 'new' screen that is created behind the scenes
    recordScreenViews: false,
    trackAppLifecycleEvents: true,
    trackAttributionData: true,

    android: {
        // flushInterval: 60,
        collectDeviceId: true
    },
    ios: {
        trackAdvertising: true,
        trackDeepLinks: true
    }
  })
  .then(() =>
    console.log('Analytics is ready')
  )
  .catch(err =>
    console.error('Something went wrong', err)
  )

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showIdentifySettings: false,
      showTrackSettings: false,
      user: {
        userId: '742',
        email: 'homer@snpp.com',
        name: 'Homer Simpson'
      },
      track: {
        event: 'Coupon Entered',
        prop1: 'orderId',
        prop2: 'couponId',
        value1: '50314b8e9bcf',
        value2: '100th_donut_free'
      }
    }
  }

  trackPress() {
    analytics.track(this.state.track.event, {
      [this.state.track.prop1]: this.state.track.value1,
      [this.state.track.prop2]: this.state.track.value2
    })
  }

  identifyPress() {
    analytics.identify(this.state.user.userId, {
      name: this.state.user.name,
      email: this.state.user.email
    });
  }

  screenPress() {
    analytics.screen('Ultimate Comics Spider-Man, Vol. 1', {
      author: 'Brian Michael Bendis',
      illustrator: 'Sara Pichelli '
    })
  }

  flushPress() {
    analytics.flush()
  }

  resetPress() {
    analytics.reset();
  }

  identifySettingsToggle() {
    this.setState(previousState => (
      { showIdentifySettings: !previousState.showIdentifySettings }
    ))
  }

  trackSettingsToggle() {
    this.setState(previousState => (
      { showTrackSettings: !previousState.showTrackSettings }
    ))
  }
  
  saveIdentifySettings(input) {
    let user = {
      userId: input.userId || this.state.user.userId,
      email: input.email || this.state.user.email,
      name: input.name || this.state.user.name,
    }
    this.setState(() => ({ user }));
    this.identifySettingsToggle();
  }
  
  dataTypeCoercion(value) {
    if (value.toLowerCase() === 'true') {
      return true;
    }
    if (value.toLowerCase() === 'false') {
      return false;
    }
    if (!isNaN(value)) {
      return Number(value);
    }
    return value;
  }

  saveTrackSettings(input) {
    let track = {
      event: input.event || this.state.track.event,
      prop1: input.prop1 || this.state.track.prop1,
      prop2: input.prop2 || this.state.track.prop2,
      value1: input.value1 !== '' ? this.dataTypeCoercion(input.value1) : this.state.track.value1,
      value2: input.value2 !== '' ? this.dataTypeCoercion(input.value2) : this.state.track.value2
    }
    this.setState(() => ({ track }));
    this.trackSettingsToggle();
  }

  render() {
    let user = '';
    if (this.state.user.userId !== '742') {
      user = "  (" + this.state.user.userId.substring(0, 15);
      if (this.state.user.userId.length > 15) {
        user += "...)";
      } else {
        user += ")";
      }
    }
    let event = '';
    if (this.state.track.event !== 'Coupon Entered') {
      event = "  (" + this.state.track.event.substring(0, 15);
      if (this.state.track.event.length > 15) {
        event += "...)";
      } else {
        event += ")";
      }
    }
    if (!this.state.showIdentifySettings && !this.state.showTrackSettings) {
      return (
        <View style={styles.container}>
          <Image
            style={{alignSelf: 'center'}}
            source={require('./logo.png')}
          />
          <View style={styles.buttonContainer}>
            <Text style={styles.instructions}>{instructions}</Text>
            <Button
              buttonStyle={styles.button}
              onPress={() => this.trackPress()}
              title={"Track" + event}
            />
            <Button
              buttonStyle={styles.button}
              onPress={() => this.identifyPress()}
              title={"Identify" + user}
            />
            <Button
              buttonStyle={styles.button}
              onPress={() => this.screenPress()}
              title="Screen"
            />
            <Button
              buttonStyle={styles.button}
              onPress={() => this.flushPress()}
              title="Flush"
            />
            <Button
              buttonStyle={styles.button}
              onPress={() => this.resetPress()}
              title="Reset"
            />
            <Button
              onPress={() => this.trackSettingsToggle()}
              title="Track Settings"
            />
            <Button
              onPress={() => this.identifySettingsToggle()}
              title="Identify Settings"
            />
          </View>
        </View>
      );
    }

    //  Identify Settings
    if (this.state.showIdentifySettings) {
      return (
        <IdentifySettings 
          user={this.state.user} 
          save={this.saveIdentifySettings.bind(this)} 
          toggle={() => this.identifySettingsToggle()} 
        />
      );
    }
    // Track settings
    return (
      <TrackSettings 
        track={this.state.track}
        save={this.saveTrackSettings.bind(this)} 
        toggle={() => this.trackSettingsToggle()}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    maxHeight: '100%',
    backgroundColor: '#01376C'
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '75%',
    height: '55%',
    display: 'flex'
  },
  button: {
    backgroundColor: '#46B67E',
  },
  inputContainer: {
    minHeight: '10%',
    justifyContent: 'space-around',
    borderRadius: 25
  },
  inputFieldTrack: {
    minHeight: '2%',
    backgroundColor: '#FFF',
    padding: '5%',
    borderRadius: 3
  },
  inputFieldIdentify: {
    backgroundColor: '#FFF',
    minHeight: '10%',
    padding: '5%',
    borderRadius: 3
  },
  inputTitle: {
    color: '#FFF',
    fontSize: 16,
  },
});
