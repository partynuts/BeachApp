import React from 'react';
import {
  AsyncStorage, ImageBackground,
  Picker,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Event from "../Event";
import { apiHost } from '../../config';
import moment from "moment";
import { stylesAndroid, stylesIos } from './style'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button as Btn, Card, Title } from 'react-native-paper';
import { Separator } from "../../helper";

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
        this.state.eventData.event_date.setFullYear(setYear, setMonth, setDay);
        this.setState({
          calendarShown: false,
          timepickerShown: true
        });
      } else if (this.state.timepickerShown) {
        setHour = new Date(e.nativeEvent.timestamp).getHours();
        setMinute = new Date(e.nativeEvent.timestamp).getMinutes();
        this.state.eventData.event_date.setHours(setHour, setMinute);
        this.setState({
          timepickerShown: false,
          allSet: true
        });
      }
    }
  }

  setDateIos(e, date) {
    if (date) {
      let setYear = 0;
      let setMonth = 0;
      let setDay = 0;
      let setHour = 0;
      let setMinute = 0;

      setYear = new Date(e.nativeEvent.timestamp).getFullYear();
      setMonth = new Date(e.nativeEvent.timestamp).getMonth();
      setDay = new Date(e.nativeEvent.timestamp).getDate();
      setHour = new Date(e.nativeEvent.timestamp).getHours();
      setMinute = new Date(e.nativeEvent.timestamp).getMinutes();
      this.state.eventData.event_date.setFullYear(setYear, setMonth, setDay);
      this.state.eventData.event_date.setHours(setHour, setMinute);
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
            eventData: data,
            calendarShown: false,
            timepickerShown: false
          }, () => {
            this.props.navigation.pop();
            this.props.navigation.navigate('Event', this.state)
          }
        );
      })
  }

  async handleUpdate(e) {
    e.preventDefault();
    const userData = await this.getUserIdFromStorage();
    console.log("USER DATA IM UPDATE", userData);
    fetch(
      `${apiHost}/events`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          { ...this.state.eventData, eventId: this.props.route.params.eventData.id, userId: userData.id }
        )
      }
    )
      .then(async (res) => {
        const data = await res.json();
        this.setState({
            eventData: data
          }, () => {
            this.props.route.params.onUpdate(this.state);
            this.props.navigation.pop();
            this.props.navigation.navigate('Event', this.state)
          }
        );
      })
  }

  async onRefresh() {
    this.setState({
      refreshing: true
    });

    await this.fetchDataFromDb();

    this.setState({
      refreshing: false
    });
  }

  getLocationOptions(styles) {
    return (
      <View style={styles.column}>
        <Text style={styles.text}>Select location:</Text>
        <Text
          style={styles.pickerBtn}
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
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: 'https://i.pinimg.com/originals/88/5a/fd/885afd3f8182489c0b729b161157d1e8.jpg' }}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            padding: 0
          }}>
        {/*<SafeAreaView style={{ position: 'relative' }}>*/}
          <ScrollView
            style={{ padding: 40 }}
          >
            <Card
              elevation={10}
              style={{paddingBottom: 15}}
            >
              <Card.Content>
                {/*<Text style={styles.text}>Set up an event!</Text>*/}
                <Title>Set up an event!</Title>
              </Card.Content>
              <Card.Actions>
                <Btn
                  onPress={(e) => this.showCalendar(e)}
                  mode='outlined'
                >
                  <Text>Select date and time</Text>
                </Btn>
              </Card.Actions>

              {Platform.OS !== 'ios' ?
                  <View>
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
                    <Separator />
                    {this.state.calendarShown &&
                    <View style={styles.iosDatePicker}>
                      <RNDateTimePicker
                        value={this.state.eventData.event_date}
                        mode='datetime'
                        onChange={(e, date) => this.setDateIos(e, date)}
                      />
                      <TouchableOpacity
                        onPress={(e) => this.showCalendar(e)}
                        style={styles.button}>
                        <Text
                          style={styles.btnText}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
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
                      Select fields:
                    </Text>
                    <Text
                      style={styles.pickerBtn}
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
                {/*</View>*/}
            </Card>


            <Separator />
            <Separator />
            <View style={{ backgroundColor: "#ffbf00" }}>
              <View style={styles.resultsContainer}>
                <Text style={styles.text}>Your settings:</Text>
                <View style={styles.eventDetailWrapper}>
                  <MaterialCommunityIcons
                    name="calendar-clock"
                    color="grey"
                    size={25}
                    style={styles.eventElement}
                  />
                  {this.state.eventData.event_date &&
                  <View>
                    <Text
                      style={styles.textBold}>{moment(this.state.eventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}</Text>
                  </View>
                  }
                </View>
                <Separator />

                {this.state.eventData.number_of_fields &&
                <View style={styles.eventDetailWrapper}>
                  <MaterialCommunityIcons
                    name="volleyball"
                    color="grey"
                    size={25}
                    style={styles.eventElement}
                  />
                  <Text style={styles.textBold}>{this.state.eventData.number_of_fields}</Text>
                </View>
                }
                <Separator />

                {this.state.eventData.location &&
                <View style={styles.eventDetailWrapper}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    color="grey"
                    size={25}
                    style={styles.eventElement}
                  />
                  <Text style={styles.textBold}>{this.state.eventData.location}</Text>
                </View>
                }
              </View>
            </View>
            {/*<View style={{*/}
            {/*  width: "100%",*/}
            {/*  height: '10%',*/}
            {/*  position: 'absolute',*/}
            {/*  bottom: 0,*/}
            {/*  backgroundColor: "#d8c3af"*/}
            {/*}}>*/}
            <Separator />
            <Separator />

            <TouchableOpacity
                onPress={this.props.route.params && this.props.route.params.eventData ? (e) => this.handleUpdate(e) : (e) => this.handleSubmit(e)}
                style={styles.buttonSticky}
              >
                <Text style={styles.btnText}>
                  {this.props.route.params && this.props.route.params.eventData ? 'Update event' : 'Create event'}
                </Text>
              </TouchableOpacity>
            {/*</View>*/}
            <Separator />
          </ScrollView>
        {/*</SafeAreaView>*/}
      </ImageBackground>

  </SafeAreaView>
  );
  }
  }

