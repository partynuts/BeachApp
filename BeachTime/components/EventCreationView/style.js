import { StyleSheet } from 'react-native';
import colors from "../../colors";

export const stylesAndroid = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: 'orange'
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white"
  },
  text: {
    color: "white",
    fontSize: 16
  },
  textResults: {
    color: "black",
    fontSize: 16
  },
  titleResults: {
    marginBottom: 10
  },
  textBold: {
    color: "black",
    fontWeight: "700"
  },
  picker: {
    height: 40,
    width: 100,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 10
  },
  choiceContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {},
  resultsContainer: {
    padding: 5,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "white"
  },
  pickerBtn: {
    height: 30,
    width: 100,
    color: 'white',
    backgroundColor: 'dodgerblue',
    textAlign: 'center',
    lineHeight: 30
  }
});

export const stylesIos = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: colors.creme
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textColorBlack
  },
  text: {
    marginTop: 30,
    fontWeight: "700",
    color: colors.textColorBlack
  },
  btnText: {
    fontSize: 18,
    color: "white",
  },
  button: {
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: "#0066FF",
  },
  btnDisabled: {
    width: "100%",
    height: "6%",
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7
  },
  choiceContainer: {
    width: "80%",
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  column1: {
    width: "50%",
    color: "white",
    fontSize: 16
  },
  column2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "50%",
    color: "white",
    fontSize: 16
  },
  resultsContainer: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  titleResults: {
    marginBottom: 10
  },
  pickerBtn: {
    height: 30,
    width: 100,
    color: 'white',
    backgroundColor: "#0066FF",
    textAlign: 'center',
    lineHeight: 30
  },
  iosDatePicker: {
    backgroundColor: 'rgba(255,255,255, 0.9)'
  },
  eventElement: {
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    color: "black",
    fontWeight: "700",
  },
  eventDetailWrapper: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  textBold: {
    color: "black",
    fontWeight: "700",
    paddingBottom: 10,
    paddingTop: 5,
  },
});
