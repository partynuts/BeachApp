import React from 'react';
import { View, Button, Text, Platform, TouchableOpacity } from 'react-native';
import Heading from "../Heading";
import EventCreationView from "../EventCreationView";
import WallOfShame from "../WallOfShame";
import { apiHost } from "../../config";
import moment from "moment";
import registerForPushNotificationsAsync from './pushNotificationsHelper'
import { stylesAndroid, stylesIos } from './style';

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    const routeParams = props.route.params;
    this.state = {
      username: routeParams.username,
      userId: routeParams.userId
    }

    console.log("PROPS IN HOME", routeParams)
    console.log("STATE IN HOME", this.state)
  }

  async componentDidMount() {
    await registerForPushNotificationsAsync(this.state.userId, this.state.username);
    console.log("SGTRING", `${apiHost}/events?filter=past`)
    await fetch(
      `${apiHost}/events`,
      {
        method: "GET"
      },
    )
      .then(res => res.json())
      .then(resp => {
        console.log("======RESPONSE from GET In HOME======", resp)
        const pastEventData = resp.pastEvent;
        const nextEventData = resp.nextEvents[1];
        const secondNextEventData = resp.nextEvents[0];
        this.setState({
          pastEventData,
          nextEventData,
          secondNextEventData
        });
      })
      .catch(e => {
        console.log(e)
      });
  }

  getNextEventPage(e) {
    e.preventDefault();
    this.props.navigation.navigate('Event', {
      eventData: this.state.nextEventData,
      username: this.state.username,
      userId: this.state.userId
    })
  }

  getSecondNextEventPage(e) {
    e.preventDefault();
    this.props.navigation.navigate('Event', {
      eventData: this.state.secondNextEventData,
      username: this.state.username,
      userId: this.state.userId
    })
  }

  getPastEventPage(e) {
    e.preventDefault();
    console.log("STATE IN HOME", this.state)
    this.props.navigation.navigate('Event', {
      eventData: this.state.pastEventData,
      username: this.state.username,
      userId: this.state.userId
    })
  }

  render() {
    const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;
    return (
      <View style={styles.container}>
        <Heading />
        {Platform.OS !== 'ios' ?
        <Button
          style={styles.button}
          title="Create event"
          onPress={() => this.props.navigation.navigate(EventCreationView)}
        /> :
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate(EventCreationView)}
          style={styles.button}>
          <Text
            style={styles.btnText}>Create event</Text>
        </TouchableOpacity>
        }

        <Separator />
        <Text style={styles.text}>Upcoming events:</Text>
        <Separator />
        {this.state.nextEventData &&
        (Platform.OS !== 'ios' ?
          <Button
            style={styles.button}
            title={moment(this.state.nextEventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}
            onPress={(e) => this.getNextEventPage(e)}
          /> :
          <TouchableOpacity
            onPress={(e) => this.getNextEventPage(e)}
            style={styles.button}>
            <Text
              style={styles.btnText}>{moment(this.state.nextEventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}</Text>
          </TouchableOpacity>)
        }
        <Separator />
        {this.state.secondNextEventData &&
        (Platform.OS !== 'ios' ?
          <Button
            title={moment(this.state.secondNextEventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}
            onPress={(e) => this.getSecondNextEventPage(e)}
          /> :
          <TouchableOpacity
            onPress={(e) => this.getSecondNextEventPage(e)}
            style={styles.button}>
            <Text
              style={styles.btnText}>{moment(this.state.secondNextEventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}</Text>
          </TouchableOpacity>)
        }
        <Separator />
        <Text style={styles.text}>Last event:</Text>
        <Separator />
        {this.state.pastEventData &&
        (Platform.OS !== 'ios' ?
          <Button
            style={styles.button}
            title={moment(this.state.pastEventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}
            onPress={(e) => this.getPastEventPage(e)}
          /> :
          <TouchableOpacity
            onPress={(e) => this.getPastEventPage(e)}
            style={styles.button}>
            <Text
              style={styles.btnText}>{moment(this.state.pastEventData.event_date).format("dddd, MMMM Do YYYY, HH:mm")}</Text>
          </TouchableOpacity>)
        }
        <Separator />
        <Separator />
        <Separator />
        {Platform.OS !== 'ios' ?
          <Button
            style={styles.button}
            title="Wall of shame"
            onPress={() => this.props.navigation.navigate(WallOfShame)}
          /> :
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(WallOfShame)}
            style={styles.button}>
            <Text style={styles.btnText}>Wall of shame</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

// Show last event data Object {
//   "creator_id": 25,
//     "event_date": "2020-03-06T08:39:19.179Z",
//     "id": 11,
//     "location": "East61",
//     "number_of_fields": 1,
//     "participants": null,
// }
