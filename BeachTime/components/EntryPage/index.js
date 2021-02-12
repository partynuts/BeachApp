import React from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import { AsyncStorage, Button, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Heading from "../Heading";
import Home from "../Info";
import { apiHost } from '../../config';
import { stylesAndroid, stylesIos } from './style';
import GlobalState from "../../contexts/GlobalState";

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
      paypalUsername: '',
      errorMsg: undefined
    }
  }
  //
  // async componentDidMount() {
  //   const { id, username } = await this.getUserIdFromStorage()
  //   if (username) {
  //     this.setState({
  //       username,
  //       userId: id
  //     });
  //   }
  // }

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

  setPaypalUsername(input) {
    this.setState({
      paypalUsername: input
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const [_, setState] = React.useContext(GlobalState);
    console.log("ENTERED DATA", this.state)
    fetch(
      `${apiHost}/users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: this.state.username, email: this.state.email, paypal_username: this.state.paypalUsername })
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          let errorMsg = 'Something went terribly wrong!';
          try {
            errorMsg = (await res.json()).errorMsg;
          }
          catch (e) {

          }
          return this.setState({
            errorMsg: errorMsg
          })
        }
        const data = await res.json();
        console.log("ENTRY PAGE DATENZEUGS", data)
        try {
          await AsyncStorage.setItem('@User', JSON.stringify(data));
          setState((state) => ({ ...state, user: data }));
          // this.props.navigation.navigate('Home', { username: data.username, userId: data.id })
        } catch (e) {
          console.log(e);
        }

      })
  }

  render() {
    const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;

    return (
      <View style={styles.container}>
        <Heading />
        <Text style={styles.title}>Sign in!</Text>
        <Separator />
        <TextInput
          style={styles.textInput}
          placeholder="Username*"
          onChangeText={(input) => this.setUsername(input)}
          value={this.state.username}
        />
        <TextInput
          style={styles.textInput}
          placeholder="PayPal username"
          onChangeText={(input) => this.setPaypalUsername(input)}
          value={this.state.paypalUsername}
        />
        <TextInput
          style={styles.textInput}
          type="email"
          placeholder="Email*"
          onChangeText={(input) => this.setEmail(input)}
          value={this.state.email}
          keyboardType='email-address'
        />
        <Separator />
        {this.state.errorMsg &&
        <Text>{this.state.errorMsg}</Text>
        }
        {Platform.OS !== 'ios' ?
          <Button
            title="Go!"
            onPress={(e) => this.handleSubmit(e)}
          /> :
          <TouchableOpacity
            onPress={(e) => this.handleSubmit(e)}
            style={styles.button}>
            <Text style={styles.btnText}>Go!</Text>
          </TouchableOpacity>
        }
      </View>
    )
  }
}


