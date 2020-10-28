import React from 'react';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
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
  View
} from 'react-native';
import Heading from "../Heading";
import { apiHost } from '../../config';
import { stylesAndroid, stylesIos } from './style'
import moment from "moment";

import * as ExpoNotifications from "expo-notifications";

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
    const totalCosts = props.route.params.eventData.courtPrice * props.route.params.eventData.number_of_fields;
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
        console.log("REEEEEES IN EVENT FROM FETCH", resp)
        this.setState({
          eventData: resp
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  calculateCostsPerPerson() {
    console.log(this.state.eventData)
    const participantsCount = this.state.eventData.participants.length;
    const noParticipants = participantsCount === 0;
    const totalCosts = this.state.eventData.courtPrice * this.state.eventData.number_of_fields;
    const totalExternalPlayers = this.state.eventData.participants.reduce((acc, currValue) => acc + currValue.guests, 0);
    const costsPerPerson = totalCosts / (participantsCount + totalExternalPlayers);

    return noParticipants ? 0 : costsPerPerson.toFixed(2)
  }

  showEventDetails(styles) {
    return <View style={styles.resultsContainer}>
      <Text style={styles.textResults}>Date:</Text>
      <Text
        style={styles.textBold}>{moment(this.state.eventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}</Text>
      <Text style={styles.textResults}>Location:</Text>
      <Text style={styles.textBold}>{this.state.eventData.location}</Text>
      <Text style={styles.textResults}>Fields:</Text>
      <Text style={styles.textBold}>{this.state.eventData.number_of_fields}</Text>
      <View style={styles.costsContainer}>
        <View>
          <Text style={styles.textResults}>Total costs:</Text>
          <Text style={styles.textBold}>{this.state.totalCosts}</Text>
        </View>
        <View>
          <Text style={styles.textResults}>Costs p.P.:</Text>
          <Text style={styles.textBold}>{this.calculateCostsPerPerson()} </Text>
        </View>
        {Date.parse(this.state.eventData.event_date) > new Date() &&
        <TouchableOpacity
          title="edit"
          style={styles.editBtn}
          onPress={(e) => this.editEvent(e)}
        >
          <Text style={styles.btnText}>edit</Text>
        </TouchableOpacity>

        }
      </View>

    </View>
    // }
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
      totalCosts: newState.eventData.courtPrice * newState.eventData.number_of_fields
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
        <FontAwesome style={styles.icon} name="paypal" size={20} color="#00457C" />
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
      <SafeAreaView>

        <ScrollView
          style={styles.container}
          refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
        >
          <Heading navigation={this.props.navigation} />
          <ScrollView style={styles.scrollView}>

            <Text style={styles.text}>Event details:</Text>
            {this.state.eventData &&
            this.showEventDetails(styles)
            }
            {this.state.isUserSignedUp && Date.parse(this.state.eventData.event_date) > new Date() &&
            (<TouchableOpacity
                onPress={(e) => this.createCalendarEvent(e)}
                style={styles.buttonCal}
              >
                <Text style={styles.btnText}>Save event to calendar</Text>
                <Ionicons style={styles.icon} name="md-calendar" size={24} color="white" />
              </TouchableOpacity>
            )
            }

            <Separator />
            {Date.parse(this.state.eventData.event_date) > new Date() &&
            (Platform.OS !== 'ios' ?
                < Button
                  title={this.state.isUserSignedUp ? "Cancel!" : "Sign up!"}
                  onPress={!this.state.isUserSignedUp ? (e) => this.handleSignup(e) : (e) => this.handleCancellation(e)}
                  disabled={Date.parse(this.state.eventData.event_date) < new Date()}
                /> :
                <TouchableOpacity
                  onPress={!this.state.isUserSignedUp ? (e) => this.handleSignup(e) : (e) => this.handleCancellation(e)}
                  style={styles.button}
                  disabled={Date.parse(this.state.eventData.event_date) < new Date()}
                >
                  <Text style={styles.btnText}>{this.state.isUserSignedUp ? "Cancel!" : "Sign up!"}</Text>
                </TouchableOpacity>
            )
            }

            <Separator />
            {this.state.msg &&
            <Text>{this.state.msg}</Text>
            }
            <Separator />
            <View style={styles.table}>
              <Text style={styles.column}>Participants</Text>
              {this.state.eventData.participants &&
              Date.parse(this.state.eventData.event_date) > new Date() ?
                <Text style={styles.column}>Externals</Text> :
                <Text style={styles.column}>Payment</Text>
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
          </ScrollView>

        </ScrollView>
      </SafeAreaView>
    );
  }
}
