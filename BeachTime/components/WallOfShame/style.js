import { Platform, StyleSheet } from 'react-native';
import colors from "../../colors";

export const commonStyles = StyleSheet.create({
  container: {
    minHeight: '100%',
    color: "white",
    backgroundColor: colors.creme
  },
  text: {
    marginTop: 30,
    fontWeight: "700",
    color: "black"
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 5,
    borderWidth: 2,
    borderColor: 'lightgrey'
  },
  tableUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  column: {
    width: "50%",
    color: "black",
    fontSize: 18
  },
  column1: {
    width: "70%",
    color: "black",
    fontSize: 16
  },
  column2: {
    width: "30%",
    color: "black",
    fontSize: 16
  },
  scrollView: {
    padding: 40
  },
  dataTable: {
    backgroundColor: colors.textWhite,
    margin: 5
  }
});

if (Platform.OS === 'ios') {
  commonStyles.scrollView = { ...commonStyles.scrollView, padding: 40, paddingTop: 0 };
  commonStyles.heading = { ...commonStyles.heading, paddingLeft: 40, paddingTop: 40, paddingRight: 40 }
}

export const styles = StyleSheet.create(commonStyles);
