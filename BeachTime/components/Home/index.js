import React from 'react';
import * as ExpoNotifications from 'expo-notifications';
import { ImageBackground, Platform, RefreshControl, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Heading from "../Heading";
import EventCreationView from "../EventCreationView";
import WallOfShame from "../WallOfShame";
import { apiHost } from "../../config";
import moment from "moment";
import registerForPushNotificationsAsync, { handlePushNotifications } from './pushNotificationsHelper'
import { stylesAndroid, stylesIos } from './style';
import CourtInfo from "../CourtInfo";
import { Button as Btn, Card, Paragraph, Title } from 'react-native-paper';
import colors from '../../colors'
function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS IN HOME >>>", props.route.params)
    const routeParams = props.route.params.userData;
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
          source={{ uri: 'https://i.pinimg.com/originals/88/5a/fd/885afd3f8182489c0b729b161157d1e8.jpg' }}
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
                <Btn
                  mode='outlined' color={colors.darkBlue}
                  onPress={(e) => this.handleButtonPress(e, 'EventCreationView')}>
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
                <Btn mode='outlined' color={colors.darkBlue}
                  onPress={(e) => this.getNextEventPage(e)}>
                  <Text
                  >{moment(this.state.nextEventData.event_date).format("ddd, MMMM Do YYYY, HH:mm")}</Text>
                </Btn>
                }
              </Card.Actions>
              <Card.Actions>
                {this.state.secondNextEventData &&
                <Btn mode='outlined' color={colors.darkBlue}
                  onPress={(e) => this.getSecondNextEventPage(e)}>
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
                <Btn mode='outlined' color={colors.darkBlue}
                  onPress={(e) => this.getPastEventPage(e)}>
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
                <Btn mode='outlined' color={colors.darkBlue}
                  onPress={(e) => this.handleButtonPress(e, 'WallOfShame')}>
                  <Text>Wall of shame</Text>
                </Btn>
              </Card.Actions>
              <Card.Actions>
                <Btn mode='outlined' color={colors.darkBlue}
                  onPress={(e) => this.handleButtonPress(e, 'CourtInfo')}>
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
