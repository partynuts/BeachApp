import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export default class EntryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: ''
    }
  }

  setUsername(input) {
    this.setState({
      username: input
    });
  }

  setEmail(input) {
    this.setState({
      email: input
    });
  }

  render() {
console.log("HALLOOOO")
    return (
      <View style={{minHeight: '100%', padding: 60, backgroundColor: 'orange'}}>
        <TextInput
          style={{ height: 40, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', padding: 5, marginBottom: 30 }}
          placeholder="username"
          onChangeText={(input) => this.setUsername(input)}
          value={this.state.username}
        />

        <TextInput
          style={{ height: 40, borderWidth: 1, borderColor: 'black', backgroundColor: 'white', padding: 5 }}
          placeholder="email"
          onChangeText={(input) => this.setEmail(input)}
          value={this.state.email}
          keyboardType='email-address'
        />
      </View>
    )
  }
}
