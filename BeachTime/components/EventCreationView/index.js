import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default class EventCreationView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      mode: 'date'
    }
  }

  setDate(e, date) {
    console.log(e, date);
    if (date) {
      this.setState({
        date: date
      })
    }
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });

    return (
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Text>{this.state.date.toString()}</Text>
        <RNDateTimePicker

          value={this.state.date}
          onChange={(e, date) => this.setDate(e, date)}
        />
      </View>
    );
  }
}

