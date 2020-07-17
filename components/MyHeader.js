// import React, { Component } from 'react';
// import { Header, Icon, Badge } from 'react-native-elements';
// import { View, Text, StyeSheet, Alert } from 'react-native';
// import { DrawerActions } from 'react-navigation'
// import db from '../config'
// import firebase from 'firebase';

// export default class MyHeader extends Component {

//   constructor(props) {
//     super(props)
//     this.state = {
//       value: ''
//     }
//   }

//   getNumberofNotification = () => {
//     db.collections('all_notifications').where("notification_status", '==', 'unread')
//       .onSnapshot((snapshot) => {
//         var unreadNotificaitons = snapshot.docs.map((doc) => doc.data())
//         this.setState({
//           value: unreadNotificaitons.length
//         })
//       })

//   }

//   componentDidMount() {
//     this.getNumberofNotification();
//   }

//   BellIconWithBadge = () => {
//     return (
//       <View>
//         <Icon name='bell' type='font-awesome' color='#696969' size={25}
//           onPress={() => this.props.navigation.navigate('Notification')} />
//         <Badge
//           value={this.state.value}
//           containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
//       </View>
//     )
//   }


//   render() {
//     return (
//       <Header
//         // leftComponent={<Icon name='bars' type='font-awesome' color='#696969' onPress={() => this.props.navigation.toggleDrawer()} />}
//         centerComponent={{ text: "BookSAnta", style: { color: '#90A5A9', fontSize: 20, fontWeight: "bold", } }}
//         // centerComponent={{ text: props.title, style: { color: '#90A5A9', fontSize: 20, fontWeight: "bold", } }}
//         // rightComponent={<this.BellIconWithBadge {...this.props} />}

//         backgroundColor="#eaf8fe"
//       />
//     );
//   }



// }


import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet, Alert } from 'react-native';
import db from '../config'

export default class MyHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }

  getNumberOfUnreadNotifications() {
    db.collection('all_notifications').where('notification_status', '==', "unread")
      .onSnapshot((snapshot) => {
        var unreadNotifications = snapshot.docs.map((doc) => doc.data())
        this.setState({
          value: unreadNotifications.length
        })
      })
  }

  componentDidMount() {
    this.getNumberOfUnreadNotifications()
  }


  BellIconWithBadge = () => {
    return (
      <View>
        <Icon name='bell' type='font-awesome' color='#696969' size={25}
          onPress={() => this.props.navigation.navigate('Notification')} />
        <Badge
          value={this.state.value}
          containerStyle={{ position: 'absolute', top: -4, right: -4 }} />
      </View>
    )
  }

  render() {
    return (
      <Header
        leftComponent={<Icon name='bars' type='font-awesome' color='#696969' />}
        centerComponent={{ text: this.props.title, style: { color: '#90A5A9', fontSize: 20, fontWeight: "bold", } }}
        rightComponent={<this.BellIconWithBadge {...this.props} />}
        backgroundColor="#eaf8fe"
      />

    )
  }

}
