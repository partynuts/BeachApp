import { StyleSheet } from 'react-native';
import colors from "../../colors";

export const stylesAndroid = StyleSheet.create({
  container: {
    minHeight: '100%',
    // padding: 40,
    backgroundColor: colors.creme
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  titleResults: {
    marginBottom: 10
  },
  picker: {
    height: 40,
    width: 100,
    borderColor: colors.black,
    borderWidth: 1,
    backgroundColor: colors.textWhite,
    marginTop: 10
  },
  choiceContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  resultsContainer: {
    padding: 5,
    borderRadius: 5
  },
  pickerBtn: {
    height: 30,
    width: 100,
    color: colors.textWhite,
    backgroundColor: colors.darkBlue,
    textAlign: 'center',
    lineHeight: 30
  },
  eventElement: {
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    color: colors.black,
    fontWeight: "700",
  },
  eventDetailWrapper: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  textBold: {
    color: colors.black,
    fontWeight: "700",
    paddingBottom: 10,
    paddingTop: 5,
  }
});

export const stylesIos = StyleSheet.create({
  container: {
    minHeight: '100%',
    padding: 40,
    backgroundColor: colors.creme
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  },
  button: {
    width: "100%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: colors.darkBlue,
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
    color: colors.textWhite,
    fontSize: 16
  },
  column2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "50%",
    color: colors.textWhite,
    fontSize: 16
  },
  resultsContainer: {
    padding: 5,
    borderRadius: 5,
  },
  titleResults: {
    marginBottom: 10
  },
  pickerBtn: {
    height: 30,
    width: 100,
    color: colors.textWhite,
    backgroundColor: colors.darkBlue,
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
    color: colors.black,
    fontWeight: "700",
  },
  eventDetailWrapper: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  textBold: {
    color: colors.black,
    fontWeight: "700",
    paddingBottom: 10,
    paddingTop: 5,
  },
});
