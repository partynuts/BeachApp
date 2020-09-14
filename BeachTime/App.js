import 'react-native-gesture-handler';
import React from 'react';
import { AsyncStorage} from 'react-native';
import EntryPage from "./components/EntryPage";
import { NavigationContainer } from '@react-navigation/native';
import Home from "./components/Home";
import { createStackNavigator } from '@react-navigation/stack';
import EventCreationView from "./components/EventCreationView";
import Event from "./components/Event";
import WallOfShame from "./components/WallOfShame";
import CourtInfo from "./components/CourtInfo";

import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: "https://706e63e3c743494587fd7ea82fffe000@o447756.ingest.sentry.io/5428017",
  enableInExpoDevelopment: true,
  debug: true,
});

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="EntryPage"
            component={EntryPage}
            options={{ title: "Sign up for the app" }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "Create or sign up for an event" }}
          />
          <Stack.Screen
            name="EventCreationView"
            component={EventCreationView}
            options={{ title: "Create an event" }}
          />
          <Stack.Screen
            name="Event"
            component={Event}
            options={{ title: "Event" }}
          />
          <Stack.Screen
            name="WallOfShame"
            component={WallOfShame}
            options={{ title: "Wall of shame" }}
          />
          <Stack.Screen
            name="CourtInfo"
            component={CourtInfo}
            options={{ title: "Court operators info" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

App.getInitialProps = async () => {
  const userData = JSON.parse(await AsyncStorage.getItem('@User'));
  console.log("-------------UD----------", JSON.stringify(userData.username))
  return userData;
};
