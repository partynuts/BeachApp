import React from 'react';
import { Button, StyleSheet, Text, View, Picker } from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Heading from "../Heading";

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
      timepickerShown: false,
      numberOfFields: 1
    };
    // console.log("Year:", this.state.date.getFullYear(), "Date", this.state.date.getDate(), "Month", this.state.date.getMonth(), "Hours:", this.state.date.getHours(), "Minutes:", this.state.date.getMinutes())
    // console.log("DATE", this.state.date)
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

  //new Date(year, month, day, hours, minutes, seconds, milliseconds)

  setDate(e, date) {
    console.log("EVENT", e, "DATE", date);
    console.log("NUR EVENT HOURS", new Date(e.nativeEvent.timestamp).getHours())
    console.log("NUR EVENT MINUTE", new Date(e.nativeEvent.timestamp).getMinutes())

    // const setTime = new Date(e.nativeEvent.timestamp);


    if (date) {
      let setYear = 0;
      let setMonth = 0;
      let setDay = 0;
      let setHour = 0;
      let setMinute = 0;

      if (this.state.calendarShown) {
        setYear = new Date(e.nativeEvent.timestamp).getFullYear();
        setMonth = new Date(e.nativeEvent.timestamp).getMonth();
        setDay = new Date(e.nativeEvent.timestamp).getDate();
        console.log("$$$$$$$$NEW DATE", new Date(setYear, setMonth, setDay));
        const eventDate = new Date(setYear, setMonth, setDay);
        console.log("$$$$$$$$ EVENT DATE", eventDate);

        this.setState({
          date: eventDate,
          calendarShown: false,
          timepickerShown: true
        });
        console.log("DATE SET @@@@@")
      } else if (this.state.timepickerShown) {
        setHour = new Date(e.nativeEvent.timestamp).getHours();
        setMinute = new Date(e.nativeEvent.timestamp).getMinutes();
        const eventTime = new Date(setYear, setMonth, setDay, setHour, setMinute);
        console.log("$$$$$$$$ EVENT TIME", eventTime);
        this.setState({
          date: eventTime,
          timepickerShown: false
        });
      }
      console.log("CREATED EVENT", this.state.date)
    }
  }


  render() {
    const styles = StyleSheet.create({
      container: {
        minHeight: '100%',
        padding: 40,
        backgroundColor: 'orange'
      },
      title: {
        fontSize: 24,
        fontWeight: "700",
        color: "white"
      },
      text: {
        color: "white",
        fontWeight: "700"
      },
      picker: {
        height: 40,
        width: 100,
        borderColor: 'black',
        backgroundColor: 'white',
        marginTop: 10
      }
    });

    return (
      <View style={styles.container}>
        <Heading />
        <Text style={styles.title}>Set up an event!</Text>
        <Separator />
        <Button
          title="Select date and time"
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
          selectedValue={this.state.numberOfFields}
          style={styles.picker}
          onValueChange={(fieldValue, fieldIndex) => this.setState({ numberOfFields: fieldValue })
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

