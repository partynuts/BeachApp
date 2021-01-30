import { StyleSheet } from 'react-native';
import colors from "../../colors";

export const stylesAndroid = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: colors.creme,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white"
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  textResults: {
    color: "black",
    fontSize: 16,
    marginRight: 50
  },
  costsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textBold: {
    color: "black",
    fontWeight: "700",
    paddingBottom: 5,
    paddingTop: 5,
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
    justifyContent: 'space-between',
    borderRadius: 5
  },
  resultsContainer: {
    position: "relative",
    padding: 5,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 5
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  tableUser: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  column: {
    color: "white",
    fontSize: 18,
  },
  column1: {
    color: "black",
    fontSize: 16
  },
  column2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: "20%",
    color: "white",
    fontSize: 16,
    borderColor: 'red',
    borderWidth: 1,
  },
  externalPlayer: {
    color: "white",
    fontSize: 16,
    backgroundColor: "dodgerblue",
    paddingLeft: 10
  },
  calBtn: {
    backgroundColor: "#FF6347"
  },
  editBtn: {
    width: "20%",
    padding: 5,
    position: "absolute",
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: 'dodgerblue',
  },
  btnText: {
    fontSize: 16,
    color: "white",
  },
  buttonCal: {
    width: "100%",
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "purple",
  },
  icon: {
    marginLeft: 5
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
  participantsWrapper: {
    backgroundColor: colors.textColorWhite,
    borderRadius: 5,
    width: '100%'
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
    color: "white"
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  textResults: {
    color: "black",
    fontSize: 16,
    marginRight: 50
  },
  costsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  textBold: {
    color: "black",
    fontWeight: "700",
    paddingBottom: 5,
    paddingTop: 5,
    textAlign: 'center'
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
    justifyContent: 'space-between',
    borderRadius: 5
  },
  resultsContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 5
  },
  table: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5
  },
  tableUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  column: {
    color: "white",
    fontSize: 18
  },
  column1: {
    // width: "50%",
    color: "black",
    fontSize: 16
  },
  column2: {
    color: "white",
    fontSize: 18,
    paddingRight: "10%"
  },
  externalPlayer: {
    color: "white",
    fontSize: 16,
    backgroundColor: "#0066FF",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5
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
  buttonCal: {
    width: "100%",
    padding: 10,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: "purple",
    borderRadius: 7,
  },
  textInput: {
    color: "white",
    fontSize: 18
  },
  editBtn: {
    width: "20%",
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: "#0066FF",
    right: -50
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
  participantsWrapper: {
    backgroundColor: colors.textColorWhite,
    borderRadius: 5,
    width: '100%'
  }
});
