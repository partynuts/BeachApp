import { Platform, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import React from "react";
import colors from "../../colors";

const commonStyles = {
  container: {
    // minHeight: '100%',
    padding: 40,
    color: "white",
    // backgroundColor: 'orange',
    backgroundColor: colors.creme,
    flex: 1
    // marginTop: Constants.statusBarHeight,
  },
  text: {
    marginTop: 30,
    fontWeight: "700",
    color: "white"
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  tableUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  column: {
    width: "50%",
    color: "white",
    fontSize: 18
  },
  column1: {
    width: "70%",
    color: "white",
    fontSize: 16
  },
  column2: {
    width: "30%",
    color: "white",
    fontSize: 16
  },
  tel: {
    color: "blue",
    textDecorationLine: "underline"
  },
  bla: {
    marginBottom: 10
  },
  scrollView: {
    padding: 0
  },
  heading: {

  },
  card: {
    borderWidth: 1,
    margin: 5,
    // backgroundColor: colors.amberBackground
  }
};

if (Platform.OS === 'ios') {
  commonStyles.scrollView = {...commonStyles.scrollView, padding: 40, paddingTop: 0};
  commonStyles.heading = {...commonStyles.heading, paddingLeft: 40, paddingTop: 40, paddingRight: 40}
}

export const styles = StyleSheet.create(commonStyles);
