import React from 'react';
import { Button, StyleSheet, Text, View, Picker } from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class EventCreationView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      calendarShown: false,
      timepickerShown: false
    }
  }

  showCalendar(e) {
    this.setState({
      calendarShown: !this.state.calendarShown
    })
  }

  showTimepicker(e) {
    this.setState({
      timepickerShown: !this.state.timepickerShown
    })
  }

  setDate(e, date) {
    console.log(e, date);
    if (date) {
      this.setState({
        date: date,
        calendarShown: false,
        timepickerShown: false
      })
    }
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        minHeight: '100%',
        padding: 60,
        backgroundColor: 'orange'
      },
      text: {
        color: 'white'
      },
      picker: {
        height: 40,
        width: 100,
        // borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
      }
    });

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Set up an event!</Text>
        <Separator />
        <Button
          title="Select date"
          onPress={(e) => this.showCalendar(e)}
        />
        <Separator />

        <Text style={styles.text}>{this.state.date.toString()}</Text>
        {this.state.calendarShown &&
        <RNDateTimePicker
          value={this.state.date}
          mode='date'
          onChange={(e, date) => this.setDate(e, date)}
        />
        }
        <Separator />
        <Button
          title="Select time"
          onPress={(e) => this.showTimepicker(e)}
        />
        <Separator />

        <Text style={styles.text}>{this.state.date.toString()}</Text>
        {this.state.timepickerShown &&
        <RNDateTimePicker
          value={this.state.date}
          mode='time'
          onChange={(e, date) => this.setDate(e, date)}
        />
        }

        <Separator />
        <Text style={styles.text}>Number of fields:</Text>
        <Picker
          selectedValue={this.state.language}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({ language: itemValue })
          }>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
        </Picker>
      </View>
    );
  }
}

