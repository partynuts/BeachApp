import 'react-native-gesture-handler';
import React from 'react';
import { DefaultTheme } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import EntryPage from "./components/EntryPage";
import { NavigationContainer } from '@react-navigation/native';
import EventsNavigator from './navigation/EventsNavigator';
import InfoNavigator from './navigation/InfoNavigator';
import ProfileNavigator from './navigation/ProfileNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GlobalState from "./contexts/GlobalState";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginNavigator from "./navigation/LoginNavigator";
// Sentry.init({
//   dsn: "https://706e63e3c743494587fd7ea82fffe000@o447756.ingest.sentry.io/5428017",
//   enableInExpoDevelopment: true,
//   debug: true,
// });

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    accent: 'yellow',
    background: 'deeppink'
  },
};

export default function App() {
  const [state, setState] = React.useState({});
  const [userDataLoaded, setUserDataLoaded] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('@User')
      .then(storageItem => {
        const userData = JSON.parse(storageItem);
        setState((state) => ({ ...state, user: userData }));
        setUserDataLoaded(true);
      })
  }, []);

  if (!userDataLoaded) {
    return <></>
  }

  return (
    <GlobalState.Provider value={[state, setState]}>
      <NavigationContainer>
        {state.user ?
          authNavigator()
          :
          guestNavigator()
        }
      </NavigationContainer>
    </GlobalState.Provider>
  )
}

function authNavigator() {
  return (
    <Tab.Navigator initialRouteName="Events">
      <Tab.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons size={30} name="calendar-heart" />,
        }}
      />
      <Tab.Screen
        name="Info"
        component={InfoNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons size={30} name="information-outline" />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: () => <MaterialCommunityIcons size={30} name="account-circle-outline" />,
        }}
      />
    </Tab.Navigator>
  )
}

function guestNavigator() {
  return (
    <Tab.Navigator initialRouteName="Login">
      <Tab.Screen name="Login" component={LoginNavigator} />
    </Tab.Navigator>
  )
}

