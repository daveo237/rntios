import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { Button } from 'react-native-elements';

export default class IdentifySettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        userId: '',
        email: '',
        name: ''
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        
        <View style={styles.buttonContainer}>
          <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>User ID</Text>
              <TextInput
                style={styles.inputFieldIdentify}
                defaultValue={this.props.user.userId}
                clearTextOnFocus={true}
                placeholder={this.props.user.userId}
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
                defaultValue={this.props.user.email}
                clearTextOnFocus={true}
                placeholder={this.props.user.email}
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
              defaultValue={this.props.user.name}
              clearTextOnFocus={true}
              placeholder={this.props.user.name}
              onChangeText={(text) => {
                let input = this.state.input;
                input.name = text;
                this.setState(() => ({input}))}
              }
            />
          </View>
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