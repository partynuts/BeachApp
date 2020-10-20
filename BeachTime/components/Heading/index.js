import React from 'react';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class Heading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    const { id, username, paypalUsername } = await this.getUserIdFromStorage();
    this.setState({ user_id: id, username, paypalUsername })
  }

  async getUserIdFromStorage() {
    const userData = JSON.parse(await AsyncStorage.getItem('@User'));
    console.log("-------------UD----------", JSON.stringify(userData.id))
    return userData;
  }

  goToProfile(e) {
    e.preventDefault();
    this.props.navigation.navigate('Profile', {
      username: this.state.username,
      user_id: this.state.user_id,
      paypalUsername: this.state.paypalUsername,
      refresh: () => this.refreshData()
    })
  }

  async refreshData() {
    const newUserData = await this.getUserIdFromStorage();
    console.log("____NEW USER DATA ______", newUserData)
    this.setState({
      username: newUserData.username,
      paypalUsername: newUserData.paypal_username,
      email: newUserData.email,
      id: newUserData.id
    })
  }

  render() {

    return (
      <View>
        <View style={styles.container}>
          <Text>Beach Time </Text>
          {this.state.username &&
          !this.props.nonEditable ?
          <View style={styles.column2}>
            <Text>Hi, </Text>
            <TouchableOpacity
              onPress={(e) => this.goToProfile(e)}
              style={styles.button}>
              <Text style={styles.link}>{this.state.username}!</Text>
            </TouchableOpacity>
          </View> :
            <Text>Hi, {this.state.username}!</Text>
          }
        </View>
        <Separator />
      </View>
    )
  }
}


