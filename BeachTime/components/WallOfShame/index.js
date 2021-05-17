import React from 'react';
import { ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import { styles } from './style';
import { apiHost } from "../../config";
import { DataTable } from 'react-native-paper';
import { Separator } from "../../helper";
import { globalStyles } from "../../global-styles";

const sand = require('../../assets/sand.jpg');

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
        const allUsers = resp.map(user => ({ username: user.username, booking_count: user.booking_count }));
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
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={sand}
          style={globalStyles.imageBackground}
        >
          <Separator />
          <ScrollView style={styles.scrollView}>
            <DataTable style={styles.dataTable}>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title numeric>Booking count</DataTable.Title>
              </DataTable.Header>

              {this.state.allUsers &&
              this.state.allUsers.map((user, index) =>
                <DataTable.Row key={index}>
                  <DataTable.Cell>{user.username}</DataTable.Cell>
                  <DataTable.Cell numeric>{user.booking_count}</DataTable.Cell>
                </DataTable.Row>
              )
              }
            </DataTable>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}





