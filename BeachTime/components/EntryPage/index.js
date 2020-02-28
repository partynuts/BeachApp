import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';

function Separator() {
  return <View style={{marginVertical: 8,
    borderBottomColor: '#737373'}} />;
}

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

  handleSubmit(e) {
    e.preventDefault();
    fetch(
      "http://4aee7e42.ngrok.io:4040/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: this.state.username, email: this.state.email })
      }
    )
      .then(res => navigation.navigate("/home"))
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        minHeight: '100%', padding: 60, backgroundColor: 'orange'
      },
      textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 5,
        marginBottom: 30
      },
      button: {
        backgroundColor: "deeppink"
      }
    });

    return (
      <View style={styles.container}>
        {/*<Text style={{height: 40, marginBottom: 10}}>Bitch Time </Text>*/}
        <TextInput
          style={styles.textInput}
          placeholder="username"
          onChangeText={(input) => this.setUsername(input)}
          value={this.state.username}
        />

        <TextInput
          style={styles.textInput}
          placeholder="email"
          onChangeText={(input) => this.setEmail(input)}
          value={this.state.email}
          keyboardType='email-address'
        />
        <Separator />
        <Button
          title="Go!"
          onPress={(e) => this.handleSubmit(e)}
        />
      </View>
    )
  }
}
