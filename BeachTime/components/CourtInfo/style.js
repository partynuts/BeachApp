import { Platform, StyleSheet } from 'react-native';
import React from "react";
import colors from "../../colors";

const commonStyles = {
  container: {
    color: colors.textWhite,
    backgroundColor: colors.creme,
    flex: 1
  },
  scrollView: {
    padding: 40
  },
  card: {
    margin: 5,
    opacity: 0.8
  }
};

if (Platform.OS === 'ios') {
  commonStyles.scrollView = { ...commonStyles.scrollView, padding: 40, paddingTop: 0 };
  commonStyles.heading = { ...commonStyles.heading, paddingLeft: 40, paddingTop: 40, paddingRight: 40 }
}

export const styles = StyleSheet.create(commonStyles);
