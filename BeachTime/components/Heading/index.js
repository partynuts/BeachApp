import React from 'react';
import { AsyncStorage, Text, View } from 'react-native';
import {styles} from './style';

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
    const {id, username} = await this.getUserIdFromStorage()
    this.setState({ user_id: id, username })
  }

  async getUserIdFromStorage() {
    const userData = JSON.parse(await AsyncStorage.getItem('@User'));
    console.log("-------------UD----------", JSON.stringify(userData.id))
    return userData;
  }

  render() {

    return (
      <View>
        <View style={styles.container}>
          <Text>Beach Time </Text>
          {this.state.username &&
          <Text>Hi, {this.state.username}!</Text>
          }
        </View>
        <Separator />
      </View>
    )
  }

}



