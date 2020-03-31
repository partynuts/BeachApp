import React from 'react';
import { StyleSheet, View, Button, Text, Picker, TextInput } from 'react-native';
import Heading from "../Heading";
import { apiHost } from '../../config';
import { styles } from './style';
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
    console.log("*******SIGNED UP USER*******", signedUpUser)
    this.state = {
      ...props.route.params,
      isUserSignedUp: props.route.params.username === signedUpUser
    };
    console.log("**********routeParams IN EVENTS**********")
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
            signUpStatus: res.status
          });
        } else if (res.status === 201) {
          console.log("DATA NACH SIGN UP mit 201", data, res.status);

          const data = await res.json();
          this.setState({
            msg: data.msg,
            signUpStatus: res.status,
            eventData: { ...this.state.eventData, participants: data.participants },
            isUserSignedUp: !this.state.isUserSignedUp
          });
          console.log("NEUES STATE", this.state)
        } else if (res.status === 403) {
          console.log("DATA NACH SIGN UP mit 403", data, res.status);

          const data = await res.json();
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
        this.setState({
          signUpStatus: res.status,
          eventData: { ...this.state.eventData, participants: data.participants },
          isUserSignedUp: !this.state.isUserSignedUp,
        });
        console.log("NEUES STATE", this.state)
      })
      .catch(e => console.log(e))
  }


  render() {
    return (
      <View style={styles.container}>
        <Heading />
        <Text style={styles.text}>Event details:</Text>
        {this.state.eventData &&
        this.showEventDetails(styles)
        }

        <Separator />
        {Date.parse(this.state.eventData.event_date) > new Date() &&
        < Button
          title={this.state.isUserSignedUp ? "Cancel!" : "Sign up!"}
          onPress={!this.state.isUserSignedUp ? (e) => this.handleSignup(e) : (e) => this.handleCancellation(e)}
          disabled={Date.parse(this.state.eventData.event_date) < new Date()}
        />
        }

        <Separator />
        {this.state.msg &&
        <Text>{this.state.msg}</Text>
        }
        <Separator />
        <View>
          <Text style={styles.text}>Participants</Text>
        </View>
        {this.state.eventData.participants &&
        this.state.eventData.participants.map((participant, index) =>
          <View style={styles.tableUser}>
            <Text key={index} style={styles.column1}>{index + 1}. {participant}</Text>
          </View>
        )
        }
      </View>
    );
  }
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
