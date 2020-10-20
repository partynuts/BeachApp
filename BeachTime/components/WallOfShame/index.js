import React from 'react';
import { View, Text, ScrollView } from 'react-native';
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
        const allUsers = resp.map(user => ({username: user.username, booking_count: user.booking_count}));
        const sorted = allUsers.sort((a, b) => {
            let comparison = 0;
            if (a.booking_count > b.booking_count) {
              comparison = 1;
            } else if (a.booking_count < b.booking_count) {
              comparison = -1;
            }
            return comparison;
          });

        this.setState({
          allUsers: sorted
        });

      })
      .catch(e => {
        console.log(e)
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Heading navigation={this.props.navigation}/>
        <View style={styles.table}>
          <Text style={styles.column}>Name</Text>
          <Text style={styles.column}>Booking count</Text>
        </View>
        {this.state.allUsers &&

        this.state.allUsers.map((user, index) =>
          <View style={styles.tableUser} key={index}>
            <Text style={styles.column1}>{user.username}</Text>
            <Text style={styles.column2}>{user.booking_count}</Text>
          </View>
        )
        }
      </View>
    );
  }
}
