import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Heading from "../Heading";
import { apiHost } from '../../config';

import EventCreationView from "../EventCreationView";
import WallOfShame from "../WallOfShame";
import route from "@react-navigation/core/src/getStateFromPath";
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
    this.state = {
      ...props.route.params
    };
    console.log("**********routeParams IN EVENTS**********")
    console.log("**********STATE IN EVENTS**********", this.state)

  }

  showEventDetails(styles) {
    // if (this.state.eventData.eventData) {
    //   console.log("NEXT")
    //   return <View style={styles.resultsContainer}>
    //     <Text style={styles.textResults}>Date:</Text>
    //     <Text
    //       style={styles.textBold}>{moment(this.state.eventData.eventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}</Text>
    //     <Text style={styles.textResults}>Location:</Text>
    //     <Text style={styles.textBold}>{this.state.eventData.eventData.location}</Text>
    //     <Text style={styles.textResults}>Fields:</Text>
    //     <Text style={styles.textBold}>{this.state.eventData.eventData.number_of_fields}</Text>
    //   </View>
    // } else {
    //   console.log("FROM CREATION")

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

  handleSubmit(e) {
    e.preventDefault();
    // console.log("POSTING SIGN UP", this.state.eventData.userId, this.state.eventData.eventId)
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
        const data = await res.json();
        console.log("DATA NACH SIGN UP", data);
        // DATA NACH SIGN UP Object {
        //   "details": Object {
        //     "path": "/events/signup",
        //   },
        //   "msg": "Not Found",
        //     "status_code": 404,
        // }
        this.setState({
          msg: data.msg,
          signUpStatus: data.status,
          participants: data.participants
        })
      })
      .catch(e => console.log(e))
    console.log("STATE NACH SIGN UP", this.state)
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
        fontSize: 16,
        marginBottom: 10
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

    return (
      <View style={styles.container}>
        <Heading />
        <Text style={styles.text}>Event details:</Text>
        {this.state.eventData &&
        this.showEventDetails(styles)
        }

        <Separator />
        <Button
          title="Sign up!"
          onPress={(e) => this.handleSubmit(e)}
        />
        <Separator />
        <Text>{this.state.msg}</Text>
        <Separator />
        <View style={styles.table}>
          <Text style={styles.column}>Name</Text>
        </View>
        {this.state.participants &&
          this.state.participants.map((participant, index) =>
            <View style={styles.tableUser}>
              <Text key={index} style={styles.column1}>{participant}</Text>
            </View>
          )
        }
      </View>
    );
  }
}

