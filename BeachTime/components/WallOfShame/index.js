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

export default class WallOfShame extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    console.log("SGTRING", `${apiHost}/users`)
    await fetch(
      `${apiHost}/users`,
      {
        method: "GET"
      },
    )
      .then(res => res.json())
      .then(resp => {
        console.log("======RESPONSE from GET In WALL OF SHAME======", resp)
        const allUsers = resp.map(user => ({username: user.username, booking_count: user.booking_count}));
        console.log("ALL USERS", allUsers);
        const sorted = allUsers.sort((a, b) => {
            let comparison = 0;
            if (a.booking_count > b.booking_count) {
              comparison = -1;
            } else if (a.booking_count < b.booking_count) {
              comparison = 1;
            }
            return comparison;
          });
          console.log("~~~~~~~~~SORTED~~~~~~~~~", sorted);

        this.setState({
          allUsers: sorted
        });

      })
      .catch(e => {
        console.log(e)
      });
  }

  render() {
    console.log("STATE IM RENDER VON WALL OF SHAME", this.state)

    return (
      <View style={styles.container}>
        <Heading />
        <View style={styles.table}>
          <Text style={styles.column}>Name</Text>
          <Text style={styles.column}>Booking count</Text>
        </View>
        {this.state.allUsers &&

        this.state.allUsers.map((user, index) =>
          <View style={styles.tableUser}>
            <Text key={index} style={styles.column1}>{user.username}</Text>
            <Text key={index} style={styles.column2}>{user.booking_count}</Text>
          </View>
        )

        }
      </View>
    );
  }
}
