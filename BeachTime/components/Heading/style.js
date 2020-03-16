import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    color: "white",
  },
  column1: {
    width: "50%",
    color: "white",
  },
  column2: {
    width: "50%",
    color: "white",
    justifyContent: "flex-end"
  }
});

