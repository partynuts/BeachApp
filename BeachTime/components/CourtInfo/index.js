import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import Heading from "../Heading";
import { styles } from './style';
import { apiHost } from "../../config";
import * as Linking from "expo-linking";

function Separator() {
  return <View style={{
    marginVertical: 8,
    borderBottomColor: '#737373'
  }} />;
}

export default class CourtInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    console.log("SGTRING", `${apiHost}/users`)
    await fetch(
      `${apiHost}/courtsinfo`,
      {
        method: "GET"
      },
    )
      .then(res => res.json())
      .then(resp => {
        console.log("======RESPONSE from GET In COURT INFO======", resp)
        this.setState({
          allCourtsInfo: resp
        });

      })
      .catch(e => {
        console.log(e)
      });
  }

  createBookingLink(court) {
    if (court.telephone.startsWith('0')) {
      return `tel:${court.telephone}`
    } else {
      return `http://${court.telephone}`
    }
  }

  render() {
    console.log("STATE IM RENDER VON COURT INFO", this.state)

    return (
      <SafeAreaView style={styles.container}>
        <Heading />
        {this.state.allCourtsInfo &&
        <ScrollView style={styles.scrollView}>
          {this.state.allCourtsInfo.map((court, index) => <View key={index} style={styles.bla}>
            <Text>{court.courts_name}</Text>
            <Text>{court.address}</Text>
            <Text style={styles.tel}
              onPress={() => Linking.openURL(this.createBookingLink(court))}>{court.telephone}</Text>
            <Text>{court.time}</Text>
          </View>)
          }
        </ScrollView>
        }
      </SafeAreaView>
    );
  }
}
