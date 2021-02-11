import React from 'react';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
  SafeAreaView,
  Linking,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View, ImageBackground
} from 'react-native';
import Heading from "../Heading";
import { apiHost } from '../../config';
import { stylesAndroid, stylesIos } from './style'
import moment from "moment";

import * as ExpoNotifications from "expo-notifications";
import colors from "../../colors";

// const validIcon = parseIconFromClassName('fa fa-calendar-alt');

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class Event extends React.Component {

  constructor(props) {
    super(props);
    this.timeoutId = null;
    const signedUpUser = props.route.params.eventData.participants ? props.route.params.eventData.participants.find(user => user.username === props.route.params.username) : null;
    const totalCosts = props.route.params.eventData.courtPrice * props.route.params.eventData.number_of_fields * 2;
    const noParticipants = props.route.params.eventData.participants ? props.route.params.eventData.participants.length < 1 : true;
    const myParticipant = props.route.params.eventData.participants ? props.route.params.eventData.participants.find(participant => participant.username === props.route.params.username) : null;
    const totalExternalPlayers = props.route.params.eventData.participants ? props.route.params.eventData.participants.reduce((acc, currValue) => acc + currValue.guests, 0) : 0;

    this.state = {
      ...props.route.params,
      totalCosts,
      isUserSignedUp: signedUpUser ? props.route.params.username === signedUpUser.username : false,
      signupData:
        {
          numberExternalPlayers: myParticipant ? myParticipant.guests : 0
        },
      showGuestBtn: false
    };
  }

  componentDidMount() {
    this.fetchDataFromDb();
    ExpoNotifications.addNotificationReceivedListener(notification => {
      console.log("NOTIFICATIONS", notification)
      this.fetchDataFromDb()
    });

    this.intervalId = setInterval(() => {
      this.fetchDataFromDb();
    }, 10000);

    this.props.navigation.addListener("blur", () => {
      clearInterval(this.intervalId)
    })
  }

  fetchDataFromDb() {
    fetch(`${apiHost}/events/${this.state.eventData.id}`)
      .then(res => {
        return res.json()
      })
      .then(resp => {
        this.setState({
          eventData: resp
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  calculateCostsPerPerson() {
    const participantsCount = this.state.eventData.participants.length;
    const noParticipants = participantsCount === 0;
    const totalCosts = this.state.eventData.courtPrice * this.state.eventData.number_of_fields * 2;
    const totalExternalPlayers = this.state.eventData.participants.reduce((acc, currValue) => acc + currValue.guests, 0);
    const costsPerPerson = totalCosts / (participantsCount + totalExternalPlayers);

    return noParticipants ? 0 : costsPerPerson.toFixed(2)
  }

  showEventDetails(styles) {
    return <View style={styles.resultsContainer}>
      <Text style={styles.text}>Event details:</Text>
      <View style={styles.eventDetailWrapper}>
        <MaterialCommunityIcons
          name="calendar-clock"
          color="grey"
          size={25}
          style={styles.eventElement}
        />
        <Text
          style={styles.textBold}>{moment(this.state.eventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}
        </Text>
      </View>
      <View style={styles.eventDetailWrapper}>
        <MaterialCommunityIcons
          name="map-marker"
          color="grey"
          size={25}
          style={styles.eventElement}
        />
        <Text style={styles.eventElement}>{this.state.eventData.location}</Text>
      </View>
      <View style={styles.eventDetailWrapper}>
        <MaterialCommunityIcons
          name="volleyball"
          color="grey"
          size={25}
          style={styles.eventElement}
        />
        <Text style={styles.textBold}>{this.state.eventData.number_of_fields} </Text>
      </View>
      <View style={styles.eventDetailWrapper}>
        <MaterialCommunityIcons
          name="currency-eur"
          color="grey"
          size={25}
          style={styles.eventElement}
        />
        <View style={styles.costsContainer}>
          <View>
            <Text style={styles.eventElement}>{this.state.totalCosts} total,</Text>
          </View>
          <View>
            <Text style={styles.textBold}>{this.calculateCostsPerPerson()} p.P </Text>
          </View>
        </View>
      </View>
      {Date.parse(this.state.eventData.event_date) > new Date() &&
      <View>
        <TouchableOpacity
          title="edit"
          style={styles.editBtn}
          onPress={(e) => this.editEvent(e)}
        >
          <Text style={{ ...styles.btnText, color: colors.textColorWhite, fontWeight: '700' }}>edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => this.deleteEvent(e)}
          style={styles.deleteBtn}
        >
          <Text style={{ ...styles.btnText, color: colors.brown, fontWeight: '700' }}>Cancel event</Text>
        </TouchableOpacity>
      </View>
      }
    </View>
  }

  deleteEvent(e) {
    e.preventDefault();
    const eventId = this.state.eventData.id;
    fetch(
      `${apiHost}/events/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(async (res) => {
        if (res.status === 204) {
          this.props.navigation.navigate('Home');
        }
      })
      .catch(e => console.log(e))
  }


  handleSignup(e) {
    e.preventDefault();
    this.setState({ msg: null })
    console.log("EVENT ID", this.state);
    const eventId = this.state.eventData.id;
    fetch(
      `${apiHost}/events/${eventId}/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: this.state.userId,
        })
      }
    )
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          console.log("DATA NACH SIGN UP mit 200", data, res.status);
          const myParticipant = data.participants.find(participant => participant.username === this.state.username);
          const totalExternalPlayers = data.participants.reduce((acc, currVal) => acc + currVal.guests, 0);
          console.log('onsignup', data)
          this.setState({
            msg: data.msg,
            eventData: data,
            signUpStatus: res.status,
            // costsPerPerson: this.state.eventData.costsTotal / (this.state.eventData.participants.length + totalExternalPlayers),
            signupData:
              {
                numberExternalPlayers: myParticipant ? myParticipant.guests : 0
              },
          });

        } else if (res.status === 201) {
          const data = await res.json();
          console.log("DATA NACH SIGN UP mit 201", data, res.status);
          const myParticipant = data.participants.find(participant => participant.username === this.state.username);
          const noParticipants = data.participants === null || data.participants.length < 1;
          const totalExternalPlayers = data.participants.reduce((acc, currVal) => acc + currVal.guests, 0);

          this.setState({
            msg: data.msg,
            signUpStatus: res.status,
            eventData: data,
            isUserSignedUp: !this.state.isUserSignedUp,
            signupData:
              {
                numberExternalPlayers: myParticipant ? myParticipant.guests : 0
              },
          });
        } else if (res.status === 403) {
          const data = await res.json();
          console.log("DATA NACH SIGN UP mit 403", data, res.status);

          this.setState({
            msg: (data || null).msg,
            signUpStatus: res.status,
          });
          console.log("NEUES STATE", this.state)
        }
      })
      .catch(e => console.log(e))
  }

  handleGuestSignup() {
    const eventId = this.state.eventData.id;

    fetch(
      `${apiHost}/events/${eventId}/guests`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: this.state.userId,
          guestCount: this.state.signupData.numberExternalPlayers
        })
      }
    )
      .then(async (res) => {
        const response = await res.json();
        console.log("RESPONSE GUESTS", response)

        const extraData = response.enrollment ? {
          signupData: {
            numberExternalPlayers: response.enrollment.guests
          }
        } : {};
        this.setState({
          eventData: response.eventData,
          msg: response.msg,
          ...extraData,
          costsPerPerson: this.state.totalCosts / response.totalParticipants,
        });
      })
      .catch(e => console.log(e))
  }

  handleCancellation(e) {
    e.preventDefault();
    this.setState({ msg: null })

    console.log("EVENT ID Cancellation", this.state, "CANCELLING!!!!!!!");
    const eventId = this.state.eventData.id;
    fetch(
      `${apiHost}/events/${eventId}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: this.state.userId,
        })
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log("DATA NACH CANCELLATION", data)
        const noParticipants = data.participants === null || data.participants.length < 1;
        const totalExternalPlayers = data.participants.reduce((acc, currVal) => acc + currVal.guests, 0);

        this.setState({
          signUpStatus: res.status,
          eventData: { ...this.state.eventData, participants: data.participants },
          isUserSignedUp: !this.state.isUserSignedUp,
        });
        console.log("NEUES STATE", this.state)
      })
      .catch(e => console.log(e))
  }

  setExternalPlayers(e) {
    this.setState({
      signupData: {
        ...this.state.signupData,
        numberExternalPlayers: Number(e.nativeEvent.text)
      }
    });
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }

    this.timeoutId = setTimeout(() => {
      this.handleGuestSignup();
    }, 1000)
  }

  editEvent(e) {
    this.props.navigation.navigate('EventCreationView', {
      ...this.state,
      onUpdate: (newState) => this.updateData(newState)
    });
  }

  updateData(newState) {
    this.setState({
      eventData: newState.eventData,
      totalCosts: newState.eventData.courtPrice * newState.eventData.number_of_fields * 2
    })
  }

  createCalendarEvent(e) {
    const eventId = this.state.eventData.id;
    Linking.openURL(`${apiHost}/events/${eventId}/calendar`);
  }

  createPayPalLink(username, styles) {
    const cpp = this.calculateCostsPerPerson();
    if (username) {
      return <Text
        style={styles.column1}
        onPress={() => Linking.openURL(`https://www.paypal.me/${username.trim()}/${cpp}`)}
      >
        <FontAwesome5 style={styles.icon} name="paypal" size={20} color="#00457C" />
      </Text>

    }
    return <Text> </Text>;
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

  render() {
    const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;

    return (
      <View>
        <SafeAreaView style={{ position: 'relative' }}>
          <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
          >
            <Heading navigation={this.props.navigation} />
            <ScrollView style={styles.scrollView}>
              {this.state.eventData &&
              this.showEventDetails(styles)
              }
              <Separator />
              <Separator />

              {this.state.isUserSignedUp && Date.parse(this.state.eventData.event_date) > new Date() &&
              <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 15
              }}>
                <TouchableOpacity
                  onPress={(e) => this.createCalendarEvent(e)}
                  style={styles.buttonCal}
                >
                  <MaterialCommunityIcons
                    name="calendar-import"
                    color={colors.darkBlue}
                    size={30}
                  />
                </TouchableOpacity>
              </View>
              }
              <Separator />
              {this.state.msg &&
              <Text>{this.state.msg}</Text>
              }
              <Separator />
              <View style={styles.participantsWrapper}>
                <View style={styles.table}>
                  <Text style={styles.column}>
                    <MaterialCommunityIcons
                      name="account-multiple-outline"
                      color="grey"
                      size={25}
                    />
                  </Text>
                  {this.state.eventData.participants &&
                  Date.parse(this.state.eventData.event_date) > new Date() ?
                    <Text style={styles.column}>
                      <MaterialCommunityIcons
                        name="account-plus"
                        color="grey"
                        size={25}
                      />
                    </Text> :
                    <Text style={styles.column}>
                      <MaterialCommunityIcons
                        name="credit-card-outline"
                        color="grey"
                        size={25}
                      />
                    </Text>
                  }
                </View>
                {this.state.eventData.participants && this.state.eventData.participants.length > 0 &&
                this.state.eventData.participants.map((participant, index) =>
                  <View style={styles.table} key={index}>
                    <Text
                      style={styles.column1}
                    >
                      {index + 1}. {participant.username}
                    </Text>
                    {Date.parse(this.state.eventData.event_date) < new Date() ?
                      this.createPayPalLink(participant.paypal_username, styles)
                      :
                      <TextInput
                        disabled={Date.parse(this.state.eventData.event_date) < new Date()}
                        style={participant.username === this.state.username ? styles.externalPlayer : styles.column1}
                        onChange={(e) => this.setExternalPlayers(e)}
                        editable={participant.username === this.state.username}
                        value={(participant.username === this.state.username ? this.state.signupData.numberExternalPlayers : participant.guests).toString()}
                        keyboardType="number-pad"
                        returnKeyType="done"
                      />
                    }
                  </View>
                )
                }
              </View>
              <Separator />
              <Separator />
              <Separator />
              <Separator />
              <Separator />
              <Separator />
              <Separator />
              <Separator />

            </ScrollView>
          </ScrollView>
          {Date.parse(this.state.eventData.event_date) > new Date() &&
          <View style={{
            width: "100%",
            height: '10%',
            position: 'absolute',
            bottom: 0,
            backgroundColor: "#d8c3af"
          }}>
            <TouchableOpacity
              onPress={!this.state.isUserSignedUp ? (e) => this.handleSignup(e) : (e) => this.handleCancellation(e)}
              style={this.state.isUserSignedUp ? {
                ...styles.buttonSticky,
                backgroundColor: colors.orangeBrown,

              } : styles.buttonSticky}
              disabled={Date.parse(this.state.eventData.event_date) < new Date()}
            >
              <Text
                style={this.state.isUserSignedUp ?
                  styles.btnTxtSecondary :
                  styles.btnText}>{
                this.state.isUserSignedUp ? "Withdraw" : "Sign up"}
              </Text>
            </TouchableOpacity>
          </View>
          }
        </SafeAreaView>
      </View>
    );
  }
}
