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
        const allUsers = resp.map(user => user.username);
        console.log("ALL USERS", allUsers);

        this.setState({
          allUsers
        });
      })
      .catch(e => {
        console.log(e)
      });
  }

  compare(a, b) {
    const bookedA = a.booked;
    const bookedB = b.booked;

    let comparison = 0;
    if (bookedA > bookedB) {
      comparison = 1;
    } else if (bookedA < bookedB) {
      comparison = -1;
    }
    return comparison;
  }

  render() {
    // const users = [
    //   {
    //     username: "Antony",
    //     booked: 4
    //   },
    //   {
    //     username: "Pari",
    //     booked: 6
    //   },
    //   {
    //     username: "Fabi",
    //     booked: 3
    //   },
    //   {
    //     username: "Christoph",
    //     booked: 0
    //   },
    //   {
    //     username: "Alex",
    //     booked: 1
    //   },
    //   {
    //     username: "Tino",
    //     booked: 2
    //   },
    //   {
    //     username: "Tore",
    //     booked: 0
    //   },
    //   {
    //     username: "Marcos",
    //     booked: 2
    //   },
    //   {
    //     username: "Carlo",
    //     booked: 0
    //   }
    // ];

    // const sorted = this.state.allUsers.sort((a, b) => {
    //   let comparison = 0;
    //   if (a.booked > b.booked) {
    //     comparison = -1;
    //   } else if (a.booked < b.booked) {
    //     comparison = 1;
    //   }
    //   return comparison;
    // });
    // console.log("SORTED", sorted)

    return (
      <View style={styles.container}>
        <Heading />
        <View style={styles.table}>
          <Text style={styles.column}>Name</Text>
          <Text style={styles.column}>Times field booked</Text>
        </View>
        {this.state.allUsers &&

        this.state.allUsers.map((user, index) =>
          <View style={styles.tableUser}>
            <Text key={index} style={styles.column1}>{user}</Text>
          </View>
        )

        }
      </View>
    );
  }
}
