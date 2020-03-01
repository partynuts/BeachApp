import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Heading from "../Heading";
import EventCreationView from "../EventCreationView";
import WallOfShame from "../WallOfShame";

function Separator() {
  return <View style={{marginVertical: 8,
    borderBottomColor: '#737373'}} />;
}

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        minHeight: '100%',
        padding: 40,
        backgroundColor: 'orange'
      },
      text: {
        marginTop: 30,
        fontWeight: "700",
        color: "white"
      }
    });

    return (
      <View style={styles.container}>
        <Heading/>
        <Button
          style={styles.button}
          title="Create event"
          onPress={() => this.props.navigation.navigate(EventCreationView)}
        />
        <Separator />
        <Text style={styles.text}>Upcoming events:</Text>
        <Separator />
        <Button
          style={styles.button}
          title="1. March 2020"
          onPress={() => console.log("Sign Up 1")}
        />
        <Separator />
        <Button
          title="8. March 2020"
          onPress={() => console.log("Sign Up 2")}
        />
        <Separator />
        <Text style={styles.text}>Last event:</Text>
        <Separator />
        <Button
          style={styles.button}
          title="23. February 2020"
          onPress={() => console.log("Show last event data")}
        />
        <Separator />
        <Separator />
        <Separator />
        <Button
          style={styles.button}
          title="Wall of shame"
          onPress={() => this.props.navigation.navigate(WallOfShame)}
        />
      </View>
    );
  }
}
