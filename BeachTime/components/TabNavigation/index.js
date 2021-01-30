import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from "../Home";
import WallOfShame from "../WallOfShame";
import CourtInfo from "../CourtInfo";
import ProfileIcon from "../ProfileIcon";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EntryPage from "../EntryPage";
import EventCreationView from "../EventCreationView";
import Event from "../Event";
import Heading from "../Heading";
import Profile from "../Profile";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "../ProfileIcon/style";
import { TouchableOpacity } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

export default function TabNavigation({userData}) {
  console.log("TAB NAVIGATION HERE??? >>>>")
  return (
    <Tab.Navigator
      initialRouteName="Home">
      <Tab.Screen
        name="EntryPage"
        component={EntryPage}
        options={{ title: "Sign up for the app" }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Create or sign up for an event",
          headerRight: () => <ProfileIcon user={userData} />,
        }}
      />
      <Tab.Screen
        name="EventCreationView"
        component={EventCreationView}
        options={{
          title: "Create an event",
          headerRight: () => <ProfileIcon user={userData} />,
        }}
      />
      <Tab.Screen
        name="Event"
        component={Event}
        options={{ title: "Event",
          headerRight: () => <ProfileIcon user={userData} />,
        }}
      />
      <Tab.Screen
        name="WallOfShame"
        component={WallOfShame}
        options={{ title: "Wall of shame",
          headerRight: () => <ProfileIcon user={userData} />,
        }}
      />
      <Tab.Screen
        name="Heading"
        component={Heading}
      />
      <Tab.Screen name="CourtInfo" component={CourtInfo} options={{
        tabBarIcon: ({ color }) => (
          <TabBarIcon name="account-multiple-outline" color={'green'} />
        ),
      }} />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Edit your profile" }}
      />
    </Tab.Navigator>
  );
}

function TabBarIcon({
  name,
  color
}) {
  return (
    <FontAwesome5 style={styles.icon} name="user-circle" size={25} color={'blue'} />
  );
}
