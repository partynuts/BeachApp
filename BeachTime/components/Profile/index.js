import React from 'react';
import Heading from "../Heading";
import { apiHost } from '../../config';
import { AsyncStorage, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from './style';

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    const routeParams = props.route.params;
    this.state = {}
  }

  async getUserDataFromStorage() {
    const userData = JSON.parse(await AsyncStorage.getItem('@User'));
    console.log("-------------UD in Profile--------", JSON.stringify(userData));
    return userData;
  }

  async componentDidMount() {
    const { id, username, paypal_username, email } = await this.getUserDataFromStorage();
    if (username) {
      this.setState({
        username,
        userId: id,
        paypal_username,
        email
      });
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

  setPaypalUsername(input) {
    this.setState({
      paypal_username: input
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("ENTERED DATA", this.state)
    fetch(
      `${apiHost}/users/${this.state.userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          paypal_username: this.state.paypal_username
        })
      }
    )
      .then(async (res) => {
        if (!res.ok) {
          let errorMsg = 'Something went terribly wrong!';
          try {
            errorMsg = (await res.json()).errorMsg;
          } catch (e) {

          }
          return this.setState({
            errorMsg: errorMsg
          })
        }
        const data = await res.json();
        console.log("DATA FROM EDITING PROFILE", data)
        try {
          await AsyncStorage.setItem('@User', JSON.stringify(data));
          this.props.route.params.refresh();
          this.props.navigation.navigate('Home', {username: this.state.username});

        } catch (e) {
          console.log(e);
        }

      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Heading nonEditable={true}/>
        <View>
          <TextInput
            style={styles.textInput}
            onChangeText={(input) => this.setUsername(input)}
            value={this.state.username ? this.state.username : ''}
            placeholder={this.state.username ? '' : 'Fritz'}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(input) => this.setPaypalUsername(input)}
            value={this.state.paypal_username ? this.state.paypal_username : ''}
            placeholder={this.state.paypal_username ? '' : 'Bratzo'}
          />
          <TextInput
            style={styles.textInput}
            type="email"
            onChangeText={(input) => this.setEmail(input)}
            value={this.state.email ? this.state.email : ''}
            placeholder={this.state.email ? '' : 'example@mail.com'}
            keyboardType='email-address'
          />
        </View>


        <Separator />
        <Separator />
        {this.state.errorMsg &&
        <Text>{this.state.errorMsg}</Text>
        }
        <TouchableOpacity
          onPress={(e) => this.handleSubmit(e)}
          style={styles.button}>
          <Text style={styles.btnText}>Update profile</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
