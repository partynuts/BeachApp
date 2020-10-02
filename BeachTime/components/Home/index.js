import React from 'react';
import { View, Button, Text, Platform, TouchableOpacity } from 'react-native';
import Heading from "../Heading";
import EventCreationView from "../EventCreationView";
import WallOfShame from "../WallOfShame";
import { apiHost } from "../../config";
import moment from "moment";
import registerForPushNotificationsAsync from './pushNotificationsHelper'
import { stylesAndroid, stylesIos } from './style';
import CourtInfo from "../CourtInfo";

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
      userId: routeParams.userId,
      errorMsg: null
    }
  }

  async componentDidMount() {
    try {
      await registerForPushNotificationsAsync(this.state.userId, this.state.username);
    } catch (e) {
      this.setState({
        errorMsg: e.message
      });
    }

    this.fetchDataFormDb();
    setInterval(() => {
      this.fetchDataFormDb();
    }, 30000);
  }

  async fetchDataFormDb() {
    await fetch(
      `${apiHost}/events`,
      {
        method: "GET"
      },
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(resp => {
        console.log("RESPONSE im Fetch Data from DB", resp);
        let pastEventData;
        let nextEventData;
        let secondNextEventData;

        if (resp && resp.pastEvent) {
          pastEventData = resp.pastEvent;
        }
        if (resp && resp.nextEvents) {
          nextEventData = resp.nextEvents[1];
          secondNextEventData = resp.nextEvents[0];
        }
        this.setState({
          pastEventData,
          nextEventData,
          secondNextEventData
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          errorMsg: e.message
        })
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
    this.props.navigation.navigate('Event', {
      eventData: this.state.pastEventData,
      username: this.state.username,
      userId: this.state.userId
    })
  }

  handleButtonPress(e, component) {
    e.preventDefault();
    this.props.navigation.navigate(component)
  }

  render() {
    const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;
    return (
      <View style={styles.container}>
        <Heading />
        {this.state.errorMsg &&
        <Text>{this.state.errorMsg}</Text>
        }
        {Platform.OS !== 'ios' ?
          <Button
            style={styles.button}
            title="Create event"
            onPress={(e) => this.handleButtonPress(e, 'EventCreationView')}
          /> :
          <TouchableOpacity
            onPress={(e) => this.handleButtonPress(e, 'EventCreationView')}
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
            title={moment(this.state.nextEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}
            onPress={(e) => this.getNextEventPage(e)}
          /> :
          <TouchableOpacity
            onPress={(e) => this.getNextEventPage(e)}
            style={styles.button}>
            <Text
              style={styles.btnText}>{moment(this.state.nextEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}</Text>
          </TouchableOpacity>)
        }
        <Separator />
        {this.state.secondNextEventData &&
        (Platform.OS !== 'ios' ?
          <Button
            title={moment(this.state.secondNextEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}
            onPress={(e) => this.getSecondNextEventPage(e)}
          /> :
          <TouchableOpacity
            onPress={(e) => this.getSecondNextEventPage(e)}
            style={styles.button}>
            <Text
              style={styles.btnText}>{moment(this.state.secondNextEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}</Text>
          </TouchableOpacity>)
        }
        <Separator />
        <Text style={styles.text}>Last event:</Text>
        <Separator />
        {this.state.pastEventData &&
        (Platform.OS !== 'ios' ?
          <Button
            style={styles.button}
            title={moment(this.state.pastEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}
            onPress={(e) => this.getPastEventPage(e)}
          /> :
          <TouchableOpacity
            onPress={(e) => this.getPastEventPage(e)}
            style={styles.button}>
            <Text
              style={styles.btnText}>{moment(this.state.pastEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}</Text>
          </TouchableOpacity>)
        }
        <Separator />
        <Separator />
        <Separator />
        {Platform.OS !== 'ios' ?
          <Button
            style={styles.button}
            title="Wall of shame"
            onPress={(e) => this.handleButtonPress(e, 'WallOfShame')}
          /> :
          <TouchableOpacity
            onPress={(e) => this.handleButtonPress(e, 'WallOfShame')}
            style={styles.button}>
            <Text style={styles.btnText}>Wall of shame</Text>
          </TouchableOpacity>
        }
        <Separator />
        {Platform.OS !== 'ios' ?
          <Button
            style={styles.button}
            title="Court operators info"
            onPress={(e) => this.handleButtonPress(e, 'CourtInfo')}
          /> :
          <TouchableOpacity
            onPress={(e) => this.handleButtonPress(e, 'CourtInfo')}
            style={styles.button}>
            <Text style={styles.btnText}>Court Operators Info</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}
