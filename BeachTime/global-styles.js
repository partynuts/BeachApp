import { StyleSheet } from 'react-native';
import colors from "./colors";

export const globalStyles = StyleSheet.create({
  textBold: {
    color: "black",
    fontWeight: "700",
    paddingBottom: 5,
    paddingTop: 5,
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    borderWidth: 0.2,
    backgroundColor: colors.textWhite,
    padding: 5,
    marginBottom: 30
  },
  errorMsg: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingRight: 15
  },
  errorMsgShort: {
    color: colors.red
  },
  imageBackground: {
    resizeMode: 'cover',
    justifyContent: 'center',
    padding: 0,
    minHeight: '100%',
  },
  scrollView: {
    padding: 40
  },
  card: {
    opacity: 0.75
  },
  pageContainer: {
    minHeight: '100%',
    backgroundColor: colors.creme,
  },
  resultsContainer: {
    position: "relative",
    padding: 5,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: colors.textWhite,
    backgroundColor: colors.textWhite,
    borderRadius: 5
  },
  contentContainer: {
    paddingBottom: 100
  },
  eventElement: {
    paddingRight: 5,
    paddingBottom: 5,
    paddingTop: 5,
    fontWeight: "700",
  },
  eventDetailWrapper: {
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  participantsWrapper: {
    backgroundColor: colors.textWhite,
    borderRadius: 5,
    width: '100%'
  },
  buttonCal: {
    width: "25%",
    height: "100%",
    padding: 5,
    borderRadius: 7,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.darkBlue,
    backgroundColor: colors.textWhite,
  },
  primaryBtnText: {
    fontSize: 17,
    color: colors.textWhite,
    fontWeight: "700"
  },
  primaryBtn: {
    width: "97%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: colors.darkBlue,
  },
  primaryButtonSticky: {
    width: "97%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: colors.darkBlue,
  },
  secondaryButtonSticky: {
    width: "97%",
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 7,
    backgroundColor: colors.orangeBrown,
  },
  stickyBtnWrapper: {
    width: "100%",
    position: 'absolute',
    bottom: 10,
  }
});
