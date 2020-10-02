import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export const styles = StyleSheet.create({
  container: {
    // minHeight: '100%',
    padding: 40,
    color: "white",
    backgroundColor: 'orange',
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
  marginHorizontal: 5
  }
});

