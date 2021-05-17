import React from 'react';
import { ImageBackground, Platform, RefreshControl, SafeAreaView, ScrollView, Text } from 'react-native';
import { styles } from './style';
import Profile from "../Profile/index";
import { globalStyles } from "../../global-styles";

const sand = require('../../assets/sand.jpg');

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    console.log("PROPS IN Profile View >>>", props.route.params)
    const routeParams = props.route.params.userData;
    this.state = {
      username: routeParams.username,
      userId: routeParams.userId,
      errorMsg: null
    }
  }

  async onRefresh() {
    this.setState({
      refreshing: true
    });

    this.setState({
      refreshing: false
    });
  }

  async refreshData() {
    console.log("____NEW USER DATA ______", newUserData)
    this.setState({
      username: newUserData.username,
      paypalUsername: newUserData.paypal_username,
      email: newUserData.email,
      id: newUserData.id
    })
  }

  render() {
    console.log("STATE IN Profile View", this.state.username)
    return (
      <SafeAreaView style={globalStyles.pageContainer}>
        <ImageBackground
          source={sand}
          style={globalStyles.imageBackground}>
          <ScrollView
            contentContainerStyle={globalStyles.contentContainer}
            style={globalStyles.scrollView}
            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
          >
            <Profile
              username={this.state.username}
              user_id={this.state.user_id}
              paypalUsername={this.state.paypalUsername}
              refresh={() => this.refreshData()}
            />

          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
