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
      user: {
        userId: '742',
        email: 'homer@snpp.com',
        name: 'Homer Simpson'
      },
      showIdentifySettings: false,
      input: {
        userId: '',
        email: '',
        name: ''
      }
    }
  }
  componentWillMount() {
     analytics.setup('<Your write key goes here>', {
      // Record screen views automatically!
      // recordScreenViews: true,
      // Record certain application events automatically!
      // trackAppLifecycleEvents: true
    })
  }

  track1Press() {
    analytics.track('Skill Gained', {
      item: 'spider-sense',
      stength: '75%'
    })
  }

  track2Press() {
    analytics.track('Ally Acquired', {
      name: 'Ganke Lee',
      relationship: 'friend'
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
  
  flushPress = () => {
    analytics.flush()
  }
  
  resetPress = () => {
    analytics.reset();
  }

  identifySettingsToggle() {
    this.setState(previousState => (
      { showIdentifySettings: !previousState.showIdentifySettings }
    ))
  }

  saveIdentifySettings() {
    let user = {
      userId: this.state.input.userId,
      email: this.state.input.email,
      name: this.state.input.name,
    }
    this.setState({ user });
    this.identifySettingsToggle();
  }

  render() {
    if (!this.state.showIdentifySettings) {
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
              onPress={() => this.track1Press()}
              title="Track 1"
            />
            <Button
              buttonStyle={styles.button}
              onPress={() => this.track2Press()}
              title="Track 2"
            />
            <Button
              buttonStyle={styles.button}
              onPress={() => this.identifyPress()}
              title="Identify"
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
              onPress={() => this.identifySettingsToggle()}
              title="Identify Settings"
            />
          </View>
        </View>
      );
    }
    
    //  Identify Settings 
    return (
      <View style={styles.container}>
      <Image
      style={{alignSelf: 'center'}}
      source={require('./logo.png')}
      />
        <View style={styles.buttonContainer}>
          <Text style={styles.inputTitle}>User ID</Text>
          <TextInput
            style={styles.inputField}
            placeholder="1234"
            onChangeText={(text) => {
              let input = this.state.input;
              input.userId = text;
              this.setState({input})}
            }
          />
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.inputField}
            placeholder="test@example.com"
            onChangeText={(text) => {
              let input = this.state.input;
              input.email = text;
              this.setState({input})}
            }
          />
          <Text style={styles.inputTitle}>Name</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Jimbo Jones"
            onChangeText={(text) => {
              let input = this.state.input;
              input.name = text;
              this.setState({input})}
            }
          />
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
    color: 'orange',
    marginBottom: 5,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    minWidth: '75%',
    minHeight: '50%'
  },
  button: {
    backgroundColor: '#46B67E',
  },
  inputField: {
    backgroundColor: '#FFF',
    height: '9%',
    marginTop: '-8%'
  },
  inputTitle: {
    color: '#FFF',
    fontSize: 20
  }
});
