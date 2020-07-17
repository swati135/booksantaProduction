import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import SideBarMenu from './sideBarMenu';
import Settings from '../screens/Settings';
import MyDonations from '../screens/MyDonations';
import NotificationScreen from '../screens/MyNotifications'

export const AppDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: AppTabNavigator
    },
    MyDonations: {
        screen: MyDonations
    },
    Notification: {
        screen: NotificationScreen
    },
    Settings: {
        screen: Settings
    }

},

    {
        contentComponent: SideBarMenu
    },

    {
        initialRouteName: 'Home'
    }

)