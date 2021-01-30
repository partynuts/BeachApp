import React from 'react';
import * as ExpoNotifications from 'expo-notifications';
import {
  Button,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import Heading from "../Heading";
import EventCreationView from "../EventCreationView";
import WallOfShame from "../WallOfShame";
import { apiHost } from "../../config";
import moment from "moment";
import registerForPushNotificationsAsync, { handlePushNotifications } from './pushNotificationsHelper'
import { stylesAndroid, stylesIos } from './style';
import CourtInfo from "../CourtInfo";
import colors from '../../colors'
import { Card, Button as Btn, Paragraph, Title } from 'react-native-paper';
import { styles } from "../CourtInfo/style";
import * as Linking from "expo-linking";

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
      handlePushNotifications();
      ExpoNotifications.addNotificationReceivedListener(notification => {
        console.log("NOTIFICATIONS", notification)
        this.fetchDataFromDb()
      });

    } catch (e) {
      this.setState({
        errorMsg: e.message
      });
    }

    this.fetchDataFromDb();
    this.intervalId = setInterval(() => {
      this.fetchDataFromDb();
    }, 10000);
    console.log("EVENT DATA", this.state.eventData)
  }

  async fetchDataFromDb() {
    console.log("####### FETCHING DATA #######")
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
          nextEventData = resp.nextEvents[0];
          secondNextEventData = resp.nextEvents[1];
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
    console.log("STATE IN HOME", this.state.username)
    const styles = Platform.OS === 'ios' ? stylesIos : stylesAndroid;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1611588849922-f5b78aeacce3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1506&q=80' }}
          style={{
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            padding: 0
          }}>
          <ScrollView
            style={{ padding: 40 }}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
          >
            <Heading navigation={this.props.navigation} />
            {this.state.errorMsg &&
            <Text>{this.state.errorMsg}</Text>
            }
            <Card
              elevation={10}
              style={styles.card}
            >
              <Card.Content>
                <Title>Create a beachvolley event</Title>
                <Paragraph>Set up the time you and your friends play.</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Btn onPress={(e) => this.handleButtonPress(e, 'EventCreationView')}>
                  <Text>Create event</Text>
                </Btn>
              </Card.Actions>
            </Card>
            <Separator />
            <Card
              elevation={10}
              style={styles.card}
            >
              <Card.Content>
                <Title>Upcoming events</Title>
                <Paragraph>
                  Sign up for the next events. Can't make it? Cancel your assignment so someone else can have your spot.
                </Paragraph>
              </Card.Content>
              <Card.Actions>
                {this.state.nextEventData &&
                <Btn onPress={(e) => this.getNextEventPage(e)}>
                  <Text
                  >{moment(this.state.nextEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}</Text>
                </Btn>
                }
              </Card.Actions>
              <Card.Actions>
                {this.state.secondNextEventData &&
                <Btn onPress={(e) => this.getSecondNextEventPage(e)}>
                  <Text>
                    {moment(this.state.secondNextEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}
                  </Text>
                </Btn>
                }
              </Card.Actions>
            </Card>
            <Separator />
            <Card
              elevation={10}
              style={styles.card}
            >
              <Card.Content>
                <Title>Last event</Title>
                <Paragraph>Check out whow joined the last event and make a payment.</Paragraph>
              </Card.Content>
              <Card.Actions>
                {this.state.pastEventData &&
                <Btn onPress={(e) => this.getPastEventPage(e)}>
                  <Text>
                    {moment(this.state.pastEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}
                  </Text>
                </Btn>
                }
              </Card.Actions>
            </Card>
            <Separator />
            <Card
              elevation={10}
              style={styles.card}
            >
              <Card.Content>
                <Title>Info</Title>
                <Paragraph>Want to know who should book the next round?</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Btn onPress={(e) => this.handleButtonPress(e, 'WallOfShame')}>
                  <Text>Wall of shame</Text>
                </Btn>
              </Card.Actions>
              <Card.Actions>
                <Btn onPress={(e) => this.handleButtonPress(e, 'CourtInfo')}>
                  <Text>Court Operators</Text>
                </Btn>
              </Card.Actions>
            </Card>
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
            <Separator />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
