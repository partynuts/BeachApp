import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import Heading from "../Heading";
import Home from "../Home";

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
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
    console.log("SUBMITTING", this.props)
    e.preventDefault();
    console.log("BLUBBER")

    fetch(
      "http://e9644f02.ngrok.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: this.state.username, email: this.state.email })
      }
    )
      .then(() => this.props.navigation.navigate(Home));
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        minHeight: '100%',
        padding: 40,
        backgroundColor: 'orange',
        // marginTop: 10
      },
      title: {
        fontSize: 24,
        fontWeight: "700",
        color: "white"
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
        <Heading />
        <Text style={styles.title}>Sign in!</Text>
        <Separator />
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
