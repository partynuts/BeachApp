import React from 'react';
import { Button, Platform, Text, TextInput, TouchableOpacity, View, Linking } from 'react-native';
import Heading from "../Heading";
import { apiHost } from '../../config';
import { stylesAndroid, stylesIos } from './style'
import moment from "moment";

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class Event extends React.Component {

  constructor(props) {
    super(props);
    const signedUpUser = props.route.params.eventData.participants ? props.route.params.eventData.participants.find(user => user === props.route.params.username) : null;
    console.log("*******SIGNED UP USER*******", props)
    const totalCosts = props.route.params.eventData.courtPrice * props.route.params.eventData.number_of_fields;
    const noParticipants = props.route.params.eventData.participants === null || props.route.params.eventData.participants.length < 1;
    this.state = {
      ...props.route.params,
      totalCosts,
      costsPerPerson: noParticipants ? 0 : totalCosts / props.route.params.eventData.participants.length,
      isUserSignedUp: props.route.params.username === signedUpUser,
      signupData:
        {
          numberExternalPlayers: 0
        },
    };
    console.log("**********routeParams IN EVENTS**********", props.route.params.eventData)
    console.log("**********STATE IN EVENTS**********", this.state)
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
          <Text style={styles.textBold}>{this.state.costsPerPerson} </Text>
        </View>
      </View>
    </View>
    // }
  }

  handleSignup(e) {
    e.preventDefault();
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
          this.setState({
            msg: data.msg,
            signUpStatus: res.status,
            costsPerPerson: this.state.eventData.costsTotal / this.state.eventData.participants.length,
          });

        } else if (res.status === 201) {
          const data = await res.json();
          console.log("DATA NACH SIGN UP mit 201", data, res.status);

          const noParticipants = data.participants === null || data.participants.length < 1;
          this.setState({
            msg: data.msg,
            signUpStatus: res.status,
            eventData: { ...this.state.eventData, participants: data.participants },
            costsPerPerson: noParticipants ? 0 : this.state.totalCosts / data.participants.length,
            isUserSignedUp: !this.state.isUserSignedUp
          });
          console.log("NEUES STATE", this.state)
          console.log("NEUES STATE", this.state.totalCosts)
          console.log("NEUES STATE", data.participants.length)
          console.log("KOSTEN GETEILT????", this.state.totalCosts / this.state.eventData.participants.length, this.state.costsPerPerson);

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

  handleCancellation(e) {
    e.preventDefault();
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

        this.setState({
          signUpStatus: res.status,
          eventData: { ...this.state.eventData, participants: data.participants },
          costsPerPerson: noParticipants ? 0 : this.state.totalCosts / data.participants.length,
          isUserSignedUp: !this.state.isUserSignedUp,
        });
        console.log("NEUES STATE", this.state)
      })
      .catch(e => console.log(e))
  }

  addExternalPlayers() {
    this.setState({
      signupData: {
        ...this.state.signupData,
        numberExternalPlayers: this.state.signupData.numberExternalPlayers + 1
      }
    });
  }

  removeExternalPlayers() {
    this.setState({
      signupData: {
        ...this.state.signupData,
        numberExternalPlayers: this.state.signupData.numberExternalPlayers - 1
      }
    });
  }

  // editEvent(e) {
  //   console.log("EDIT EVENT ", e);
  //   this.props.navigation.navigate('EventCreationView', this.state)
  // }

  createCalendarEvent(e) {
    console.log("get iCal Event ", e);
    const eventId = this.state.eventData.id;
    // RNFetchBlob.fetch("GET",`${apiHost}/events/${eventId}/calendar`)
    Linking.openURL(`${apiHost}/events/${eventId}/calendar`);
  }


  render() {
    console.log("--------signup Data nach addieren von externen------", this.state.signupData);
    const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;

    return (
      <View style={styles.container}>
        <Heading />
        <Text style={styles.text}>Event details:</Text>
        {this.state.eventData &&
        this.showEventDetails(styles)
        }

        {/*{Platform.OS !== 'ios' ?*/}
        {/*  < Button*/}
        {/*    title="Edit"*/}
        {/*    onPress={(e) => this.editEvent(e)}*/}
        {/*  /> :*/}
        {/*  <TouchableOpacity*/}
        {/*    onPress={(e) => this.editEvent(e)}*/}
        {/*    style={styles.button}*/}
        {/*  >*/}
        {/*    <Text style={styles.btnText}>Edit</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*}*/}
        {this.state.isUserSignedUp &&
        (Platform.OS !== 'ios' ?
            <Button
              title="Save event to calendar"
              onPress={(e) => this.createCalendarEvent(e)}
              style={styles.calBtn}
            /> :
            <TouchableOpacity
              onPress={(e) => this.createCalendarEvent(e)}
              style={styles.button}
            >
              <Text style={styles.btnText}>Save event to calendar</Text>
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
          <Text style={styles.column}>Externals</Text>
          }
        </View>
        {this.state.eventData.participants && this.state.eventData.participants.length > 0 &&
        this.state.eventData.participants.map((participant, index) =>
          <View style={styles.tableUser}>
            <Text key={index} style={styles.column1}>{index + 1}. {participant}</Text>
            {/*<Text style={styles.text}>+</Text>*/}
            <TextInput
              style={styles.textInput}
              placeholder="add no. of guests"
              onChangeText={(input) => this.addExternalPlayers(input)}
              value={this.state.signupData.numberExternalPlayers}
            />

            {/*<View style={styles.column2}>*/}
            {/*  < Button*/}
            {/*    title='+'*/}
            {/*    onPress={() => this.addExternalPlayers()}*/}
            {/*  />*/}
            {/*  < Button*/}
            {/*    title='-'*/}
            {/*    onPress={() => this.removeExternalPlayers()}*/}
            {/*  />*/}
            {/*  <Text>{this.state.signupData.numberExternalPlayers}</Text>*/}
            {/*</View>*/}
          </View>
        )
        }
      </View>
    );
  }
}
