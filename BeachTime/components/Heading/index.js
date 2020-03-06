import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

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
    const username = await this.getUsernameFromStorage()
    this.setState({ username })
  }

  async getUsernameFromStorage() {
    const userData = JSON.parse(await AsyncStorage.getItem('@User'));
    console.log("-------------UD----------", JSON.stringify(userData.username))
    return userData.username;
  }

  render() {

    const styles = StyleSheet.create({
      container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        color: "white",
      },
      column1: {
        width: "50%",
        color: "white",
      },
      column2: {
        width: "50%",
        color: "white",
        justifyContent: "flex-end"
      }
    });

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



