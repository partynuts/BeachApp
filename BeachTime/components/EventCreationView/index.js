import React from 'react';
import { Button, StyleSheet, Text, View, Picker, AsyncStorage } from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Heading from "../Heading";
import Event from "../Event";
import { apiHost } from '../../config';
import moment from "moment";


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
      numberOfFields: 1,
      allSet: false,
      location: "East61",
    };
  }

  async componentDidMount() {
    const {id, username} = await this.getUserIdFromStorage()
    this.setState({ userId: id, username })
  }

  async getUserIdFromStorage() {
    const userData = JSON.parse(await AsyncStorage.getItem('@User'));
    console.log("-------------UD----------", JSON.stringify(userData.id))
    return userData;
  }

  showCalendar(e) {
    this.setState({
      calendarShown: !this.state.calendarShown
    })
  }

  //new Date(year, month, day, hours, minutes, seconds, milliseconds)

  setDate(e, date) {
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
        this.state.date.setFullYear(setYear, setMonth, setDay)
        this.setState({
          calendarShown: false,
          timepickerShown: true
        });
      } else if (this.state.timepickerShown) {
        setHour = new Date(e.nativeEvent.timestamp).getHours();
        setMinute = new Date(e.nativeEvent.timestamp).getMinutes();
        this.state.date.setHours(setHour, setMinute)
        this.setState({
          timepickerShown: false,
          allSet: true
        });
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch(
      `${apiHost}/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          eventDate: this.state.date,
          numberOfFields: this.state.numberOfFields,
          location: this.state.location,
          userId: this.state.userId
        })
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log("DATA IM THEN", data);

        this.props.navigation.navigate('Event', this.state)
      })
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
        fontSize: 16
      },
      textResults: {
        color: "black",
        fontSize: 16
      },
      textBold: {
        color: "black",
        fontWeight: "700"
      },
      picker: {
        height: 40,
        width: 100,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'white',
        marginTop: 10
      },
      choiceContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      column: {},
      resultsContainer: {
        padding: 5,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "white"
      }
    });

    console.log(typeof this.state.date);
    console.log(this.state.date.toLocaleString('de-DE'));
    const formattedDate = this.state.date.toLocaleString('de-DE');
    console.log(formattedDate);

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
        <View style={styles.choiceContainer}>
          <View style={styles.column}>
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
          <View style={styles.column}>
            <Text style={styles.text}>Location:</Text>
            <Picker
              selectedValue={this.state.location}
              style={styles.picker}
              onValueChange={(locationValue, fieldIndex) => this.setState({ location: locationValue })
              }>
              <Picker.Item label="East61" value="East61" />
              <Picker.Item label="Beach Mitte" value="BeachMitte" />
              <Picker.Item label="Beach61" value="Beach61" />
            </Picker>
          </View>
        </View>

        <Separator />
        <Separator />
        {/*{this.state.allSet &&*/}
        <View style={styles.resultsContainer}>
          <Text style={styles.textResults}>Your settings:</Text>
          <Separator />
          <Text style={styles.textResults}>Date:</Text>
          {this.state.date &&
          <View>
            <Text style={styles.textBold}>{moment(this.state.date).format("dddd, MMMM Do YYYY, HH:mm")}</Text>
          </View>
          }
          <Separator />
          {this.state.numberOfFields &&
          <View>
            <Text style={styles.textResults}>Fields:</Text>
            <Text style={styles.textBold}>{this.state.numberOfFields}</Text>
          </View>
          }
          <Separator />
          {this.state.location &&
          <View>
            <Text style={styles.textResults}>Location:</Text>
            <Text style={styles.textBold}>{this.state.location}</Text>
          </View>
          }

        </View>
        {/*}*/}
        <Separator />
        <Button
          title="Create!"
          onPress={(e) => this.handleSubmit(e)}
        >

        </Button>
      </View>
    );
  }
}

