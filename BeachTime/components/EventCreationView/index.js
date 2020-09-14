import React from 'react';
import { Button, Text, View, Picker, AsyncStorage, Platform, TouchableOpacity, TextInput } from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Heading from "../Heading";
import Event from "../Event";
import { apiHost } from '../../config';
import moment from "moment";
import { stylesIos, stylesAndroid } from './style'

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
      eventData:
        {
          event_date: props.route.params && props.route.params.eventData ? new Date(props.route.params.eventData.event_date) : new Date(),
          number_of_fields: props.route.params && props.route.params.eventData ? props.route.params.eventData.number_of_fields : 1,
          location: props.route.params && props.route.params.eventData ? props.route.params.eventData.location : "East61-indoor",
        },
      calendarShown: false,
      timepickerShown: false,
      showNumberOfFieldsPicker: false,
      showLocationPicker: false
    };
  }

  async componentDidMount() {
    const { id, username } = await this.getUserIdFromStorage();
    this.setState({ eventData: { ...this.state.eventData, creator_id: id }, userId: id, username })

    await fetch(
      `${apiHost}/courtsinfo`,
      {
        method: "GET"
      },
    )
      .then(res => res.json())
      .then(resp => {
        this.setState({
          allCourts: resp.map(court => ({ name: court.courts_name, price: court.price }))
        });
      })
      .catch(e => {
        console.log(e)
      });
  }

  async getUserIdFromStorage() {
    const userData = JSON.parse(await AsyncStorage.getItem('@User'));
    return userData;
  }

  showCalendar(e) {
    this.setState({
      calendarShown: !this.state.calendarShown
    })
  }

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
        this.state.eventData.event_date.setFullYear(setYear, setMonth, setDay)
        this.setState({
          calendarShown: false,
          timepickerShown: true
        });
      } else if (this.state.timepickerShown) {
        setHour = new Date(e.nativeEvent.timestamp).getHours();
        setMinute = new Date(e.nativeEvent.timestamp).getMinutes();
        this.state.eventData.event_date.setHours(setHour, setMinute)
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
      `${apiHost}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          { ...this.state.eventData, eventId: this.state.eventData.id }
        )
      }
    )
      .then(async (res) => {
        const data = await res.json();
        this.setState({
            eventData: { ...this.state.eventData, id: data.id }
          }, () => {
            this.props.navigation.navigate('Event', this.state)
          }
        );
      })
  }

  handleUpdate(e) {
    e.preventDefault();
    fetch(
      `${apiHost}/events`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          { ...this.state.eventData, eventId: this.props.route.params.eventData.id }
        )
      }
    )
      .then(async (res) => {
        const data = await res.json();
        this.setState({
            eventData: { ...this.state.eventData, id: data.id }
          }, () => {
            this.props.route.params.onUpdate(this.state);
            this.props.navigation.navigate('Event')
          }
        );
      })
  }

  getLocationOptions(styles) {
    return (
      <View style={styles.column}>
        <Text style={styles.text}>Location:</Text>
        <Text
          style={styles.text}
          onPress={(e) => {
            e.preventDefault();
            this.setState({ showLocationPicker: !this.state.showLocationPicker });
          }}
        >{this.state.eventData.location}</Text>
        {this.state.showLocationPicker &&
        <Picker
          selectedValue={this.state.eventData.location}
          style={styles.picker}
          onValueChange={(locationValue, fieldIndex) => this.setState({
            eventData: {
              ...this.state.eventData,
              location: locationValue,
              courtPrice: this.state.allCourts.find(locationChoice => locationChoice.name === locationValue).price
            }
          })
          }>
          {this.state.allCourts.map((locationChoice, index) => <Picker.Item key={index} label={locationChoice.name}
            value={locationChoice.name} />
          )}
        </Picker>
        }
      </View>
    )
  }

  render() {
    const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;

    return (
      <View style={styles.container}>
        <Heading />
        <Text style={styles.title}>Set up an event!</Text>
        <Separator />
        {Platform.OS !== 'ios' ?
          <View>
            <Button
              title="Select date and time"
              onPress={(e) => this.showCalendar(e)}
            />
            <Separator />
            {this.state.calendarShown &&
            <RNDateTimePicker
              value={this.state.eventData.event_date}
              mode='date'
              onChange={(e, date) => this.setDate(e, date)}
            />
            }
            {this.state.timepickerShown &&
            <RNDateTimePicker
              value={this.state.eventData.event_date}
              mode='time'
              onChange={(e, date) => this.setDate(e, date)}
            />
            }
          </View> :
          <View>
            <TouchableOpacity
              onPress={(e) => this.showCalendar(e)}
              style={styles.button}>
              <Text
                style={styles.btnText}>Select date and time</Text>
            </TouchableOpacity>
            <Separator />
            {this.state.calendarShown &&
            <RNDateTimePicker
              value={this.state.eventData.event_date}
              mode='date'
              onChange={(e, date) => this.setDate(e, date)}
            />
            }
            {this.state.timepickerShown &&
            <RNDateTimePicker
              value={this.state.eventData.event_date}
              mode='time'
              onChange={(e, date) => this.setDate(e, date)}
            />
            }
          </View>
        }
        {Platform.OS !== 'ios' &&
        <Separator />
        }
        <View style={styles.choiceContainer}>
          <View style={styles.column}>
            <Text
              style={styles.text}
              onPress={(e) => {
                e.preventDefault();
                this.setState({ showNumberOfFieldsPicker: !this.state.showNumberOfFieldsPicker });
              }}
            >
              Number of fields:
            </Text>
            <Text
              style={styles.text}
              onPress={(e) => {
                e.preventDefault();
                this.setState({ showNumberOfFieldsPicker: !this.state.showNumberOfFieldsPicker });
              }}
            >
              {this.state.eventData.number_of_fields}
            </Text>
            {this.state.showNumberOfFieldsPicker &&
            <Picker
              selectedValue={this.state.eventData.number_of_fields}
              style={styles.picker}
              onValueChange={(fieldValue, fieldIndex) => this.setState({
                eventData: {
                  ...this.state.eventData,
                  number_of_fields: fieldValue,
                }
              })
              }>
              <Picker.Item label="1" value={1} />
              <Picker.Item label="2" value={2} />
              <Picker.Item label="3" value={3} />
              <Picker.Item label="4" value={4} />
            </Picker>
            }
          </View>
          {this.state.allCourts &&
          this.getLocationOptions(styles)
          }
        </View>

        <Separator />
        <Separator />
        <View style={styles.resultsContainer}>
          <Text style={styles.textResults}>Your settings:</Text>
          <Separator />
          <Text style={styles.textResults}>Date:</Text>
          {this.state.eventData.event_date &&
          <View>
            <Text
              style={styles.textBold}>{moment(this.state.eventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}</Text>
          </View>
          }
          <Separator />
          {this.state.eventData.number_of_fields &&
          <View>
            <Text style={styles.textResults}>Fields:</Text>
            <Text style={styles.textBold}>{this.state.eventData.number_of_fields}</Text>
          </View>
          }
          <Separator />
          {this.state.eventData.location &&
          <View>
            <Text style={styles.textResults}>Location:</Text>
            <Text style={styles.textBold}>{this.state.eventData.location}</Text>
          </View>
          }

        </View>
        {/*}*/}
        <Separator />
        {Platform.OS !== 'ios' ?
          < Button
            title={this.props.route.params && this.props.route.params.eventData ? 'Update event' : 'Create event'}
            onPress={this.props.route.params && this.props.route.params.eventData ? (e) => this.handleUpdate(e) : (e) => this.handleSubmit(e)}
          /> :
          <TouchableOpacity
            onPress={this.props.route.params && this.props.route.params.eventData ? (e) => this.handleUpdate(e) : (e) => this.handleSubmit(e)}
            style={styles.button}>
            <Text
              style={styles.btnText}>{this.props.route.params && this.props.route.params.eventData ? 'Update event' : 'Create event'}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

