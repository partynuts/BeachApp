import React from 'react';
import { View, Text } from 'react-native';
import Heading from "../Heading";
import { styles } from './style';
import { apiHost } from "../../config";

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

  render() {
    console.log("STATE IM RENDER VON COURT INFO", this.state)

    return (
      <View style={styles.container}>
        <Heading />
        {this.state.allCourts &&
        this.state.allCourts.map(court => <View>
          <Text>{court.courts_name}</Text>
          <Text>{court.address}</Text>
          <Text>{court.telephone}</Text>
          <Text>{court.time}</Text>
          <Text>{court.price}</Text>
        </View>)}
      </View>
    );
  }
}
