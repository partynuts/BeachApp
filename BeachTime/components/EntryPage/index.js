import React from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native';
import Heading from "../Heading";
import Home from "../Home";
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import { apiHost } from '../../config';

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
      email: '',
      errorMsg: undefined
    }
  }

  async componentDidMount() {
    const {id, username} = await this.getUserIdFromStorage()
    if(username) {
      this.setState({
        username,
        userId: id
      });
      this.props.navigation.navigate('Home', {username: this.state.username, userId: this.state.userId})
    }
  }

  async getUserIdFromStorage() {
    const userData = JSON.parse(await AsyncStorage.getItem('@User'));
    console.log("-------------UD----------", JSON.stringify(userData.username))
    return userData;
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
      `${apiHost}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: this.state.username, email: this.state.email })
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          return this.setState({
            errorMsg: 'Something went wrong!'
          })
        }
        const data = await res.json();
        try {
          await AsyncStorage.setItem('@User', JSON.stringify(data));
          this.props.navigation.navigate('Home',  {username: this.state.username})
        } catch (e) {
          // saving error
          console.log(e);
        }

      })
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        minHeight: '100%',
        padding: 40,
        backgroundColor: 'orange',
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
        {this.state.errorMsg &&
        <Text>{this.state.errorMsg}</Text>
        }
        <Button
          title="Go!"
          onPress={(e) => this.handleSubmit(e)}
        />
      </View>
    )
  }
}
