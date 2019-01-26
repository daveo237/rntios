import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { Button } from 'react-native-elements';

export default class TrackSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        event: '',
        prop1: '',
        prop2: '',
        value1: '',
        value2: ''
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.buttonContainer}>
          <Text style={styles.inputTitle}>Event Name</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.props.track.event}
            clearTextOnFocus={true}
            placeholder={this.props.track.event}
            onChangeText={(text) => {
              let input = this.state.input;
              input.event = text;
              this.setState(() => ({input}))}
            }
          />
          <Text style={styles.inputTitle}>Property 1</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.props.track.prop1}
            clearTextOnFocus={true}
            placeholder={this.props.track.prop1}
            onChangeText={(text) => {
              let input = this.state.input;
              input.prop1 = text;
              this.setState(() => ({input}))}
            }
          />
          <Text style={styles.inputTitle}>Value 1</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.props.track.value1.toString()}
            clearTextOnFocus={true}
            placeholder={this.props.track.value1.toString()}
            onChangeText={(text) => {
              let input = this.state.input;
              input.value1 = text;
              this.setState(() => ({input}))}
            }
          />
          <Text style={styles.inputTitle}>Property 2</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.props.track.prop2}
            clearTextOnFocus={true}
            placeholder={this.props.track.prop2}
            onChangeText={(text) => {
              let input = this.state.input;
              input.prop2 = text;
              this.setState(() => ({input}))}
            }
          />
          <Text style={styles.inputTitle}>Value 2</Text>
          <TextInput
            style={styles.inputFieldTrack}
            defaultValue={this.props.track.value2.toString()}
            clearTextOnFocus={true}
            placeholder={this.props.track.value2.toString()}
            onChangeText={(text) => {
              let input = this.state.input;
              input.value2 = text;
              this.setState(() => ({input}))}
            }
          />
          <Button
            buttonStyle={styles.button}
            onPress={() => this.props.save(this.state.input)}
            title="Save"
          />
          <Button
            buttonStyle={styles.button}
            onPress={() => this.props.toggle()}
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