import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Heading from "../Heading";
import { apiHost } from '../../config';

import EventCreationView from "../EventCreationView";
import WallOfShame from "../WallOfShame";
import route from "@react-navigation/core/src/getStateFromPath";

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class Event extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    const routeParams = props.route.params;
    console.log("PROPS", props)
    console.log("**********routeParams IN EVENTS**********", routeParams)

  }

  //
  // getEvent() {
  //   fetch(
  //     `${apiHost}/create`,
  //     {
  //       method: "GET"
  //     },
  //   )
  //     .then(res => res.json())
  //     .then(resp => {
  //       console.log("RESPONSE from GET", resp)
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     });
  // }

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
        <Heading />
        <Text>Here is an Event!</Text>
      </View>
    );
  }
}
