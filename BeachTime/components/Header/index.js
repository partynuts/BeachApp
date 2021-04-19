import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import ProfileIcon from "../ProfileIcon";
import GlobalState from "../../contexts/GlobalState";

export default function Header(userData) {
  const [state, setState] = React.useContext(GlobalState);

  return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Hi {state.user.username}</Text>
        <ProfileIcon user={state.user} />
      </View>
  )
}



