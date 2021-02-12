import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { AsyncStorage } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from './style';

export default class LogoutIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async logoutUser(e) {
    e.preventDefault();
    console.log("LOGGING OUT USER", this.props);
    await AsyncStorage.removeItem('@User')
      .then(() => this.props.navigation.navigate('EntryPage'))
  }

  render() {
    return (
      <TouchableOpacity
        onPress={(e) => this.logoutUser(e)}>
        <MaterialCommunityIcons
          name="logout"
          color={"#5a5a5a"}
          size={25}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  }
}
