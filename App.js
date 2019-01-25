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


analytics
  .setup('<enter your write key>', {
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
      },
      input: {
        userId: '',
        email: '',
        name: '',
        event: '',
        prop1: '',
        prop2: '',
        value1: '',
        value2: ''
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
  
  saveIdentifySettings() {
    let user = {
      userId: this.state.input.userId || this.state.user.userId,
      email: this.state.input.email || this.state.user.email,
      name: this.state.input.name || this.state.user.name,
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

  saveTrackSettings() {
    let track = {
      event: this.state.input.event || this.state.track.event,
      prop1: this.state.input.prop1 || this.state.track.prop1,
      prop2: this.state.input.prop2 || this.state.track.prop2,
      value1: this.state.input.value1 !== '' ? this.dataTypeCoercion(this.state.input.value1) : this.state.track.value1,
      value2: this.state.input.value1 !== '' ? this.dataTypeCoercion(this.state.input.value2) : this.state.track.value2
    }
    this.setState(() => ({ track }));
    this.trackSettingsToggle();
  }

  render() {
    let user = '';
    if (this.state.input.userId) {
      user = "  (" + this.state.user.userId.substring(0, 15);
      if (this.state.input.userId.length > 15) {
        user += "...)";
      } else {
        user += ")";
      }
    }
    let event = '';
    if (this.state.input.event) {
      event = "  (" + this.state.input.event.substring(0, 15);
      if (this.state.input.event.length > 15) {
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
        <View style={styles.container}>
          <Image
            style={{alignSelf: 'center'}}
            source={require('./logo.png')}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputTitle}>User ID</Text>
                <TextInput
                  style={styles.inputFieldIdentify}
                  defaultValue={this.state.user.userId}
                  clearTextOnFocus={true}
                  placeholder={this.state.user.userId}
                  onChangeText={(text) => {
                    let input = this.state.input;
                    input.userId = text;
                    this.setState(() => ({input}))}
                  }
                />
              </View>
              <View style={styles.inputContainer}>
                  <Text style={styles.inputTitle}>Email</Text>
                  <TextInput
                    style={styles.inputFieldIdentify}
                    defaultValue={this.state.user.email}
                    clearTextOnFocus={true}
                    placeholder={this.state.user.email}
                    onChangeText={(text) => {
                      let input = this.state.input;
                      input.email = text;
                      this.setState(() => ({input}))}
                    }
                  />
              </View>
              <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                  style={styles.inputFieldIdentify}
                  defaultValue={this.state.user.name}
                  clearTextOnFocus={true}
                  placeholder={this.state.user.name}
                  onChangeText={(text) => {
                    let input = this.state.input;
                    input.name = text;
                    this.setState(() => ({input}))}
                  }
                />
            </View>
            <Button
              buttonStyle={styles.button}
              onPress={() => this.saveIdentifySettings()}
              title="Save"
            />
            <Button
              buttonStyle={styles.button}
              onPress={() => this.identifySettingsToggle()}
              title="Cancel"
            />
          </View>
        </View>
      );
    }
    // Track settings
    return (
      <View style={styles.container}>
        <Image
          style={{alignSelf: 'center'}}
          source={require('./logo.png')}
        />
        <View style={styles.buttonContainer}>
          <Text style={styles.inputTitle}>Event Name</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.state.track.event}
            clearTextOnFocus={true}
            placeholder={this.state.track.event}
            onChangeText={(text) => {
              let input = this.state.input;
              input.event = text;
              this.setState(() => ({input}))}
            }
          />
          <Text style={styles.inputTitle}>Property 1</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.state.track.prop1}
            clearTextOnFocus={true}
            placeholder={this.state.track.prop1}
            onChangeText={(text) => {
              let input = this.state.input;
              input.prop1 = text;
              this.setState(() => ({input}))}
            }
          />
          <Text style={styles.inputTitle}>Value 1</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.state.track.value1.toString()}
            clearTextOnFocus={true}
            placeholder={this.state.track.value1.toString()}
            onChangeText={(text) => {
              let input = this.state.input;
              input.value1 = text;
              this.setState(() => ({input}))}
            }
          />
          <Text style={styles.inputTitle}>Property 2</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.state.track.prop2}
            clearTextOnFocus={true}
            placeholder={this.state.track.prop2}
            onChangeText={(text) => {
              let input = this.state.input;
              input.prop2 = text;
              this.setState(() => ({input}))}
            }
          />
          <Text style={styles.inputTitle}>Value 2</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.state.track.value2.toString()}
            clearTextOnFocus={true}
            placeholder={this.state.track.value2.toString()}
            onChangeText={(text) => {
              let input = this.state.input;
              input.value2 = text;
              this.setState(() => ({input}))}
            }
          />
          <Button
            buttonStyle={styles.button}
            onPress={() => this.saveTrackSettings()}
            title="Save"
          />
          <Button
            buttonStyle={styles.button}
            onPress={() => this.trackSettingsToggle()}
            title="Cancel"
          />
        </View>
      </View>
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
