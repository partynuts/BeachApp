import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    color: "white",
    backgroundColor: 'orange',
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
  },
  column1: {
    width: "70%",
    color: "white",
  },
  column2: {
    width: "30%",
    color: "white",
  }
});

