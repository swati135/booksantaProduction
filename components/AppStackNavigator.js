// import React, { Component } from 'react';
// import { createStackNavigator } from 'react-navigation-stack';

// import BookDonateScreen from '../screens/BookDonateScreen';
// import RecieverDetailsScreen from '../screens/ReceiverScreen';

// export const AppStackNavigator = createStackNavigator({
//     BookDonateList: {
//         screen: BookDonateScreen,
//         navigationOptions: { headerShown: false }
//     },

//     RecieverDetailsList: {
//         screen: RecieverDetailsScreen,
//         navigationOptions: { headerShown: false }
//     }
// },
//     {
//         initialRouteName: 'BookDonateList'
//     }

// )

import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import BookDonateScreen from '../screens/BookDonateScreen';
import ReceiverDetailsScreen from '../screens/ReceiverScreen';

console.log("receiver")
export const AppStackNavigator = createStackNavigator({
    BookDonateList: {
        screen: BookDonateScreen,
        navigationOptions: {
            headerShown: false
        }
    },

    ReceiverDetails: {
        screen: ReceiverDetailsScreen,
        navigationOptions: {
            headerShown: false
        }
    },
},
    {
        initialRouteName: 'BookDonateList'
    }
);