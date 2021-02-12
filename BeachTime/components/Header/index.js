import React from 'react';
import { AsyncStorage, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import ProfileIcon from "../ProfileIcon";

export default function Header(userData) {
console.log("USERDATA IN HEADER", userData.userData)

  return (
      <View style={styles.container}>
        <Text style={styles.greeting}>Hi {userData.userData.username}</Text>
        <ProfileIcon user={userData} />
      </View>
  )
}



