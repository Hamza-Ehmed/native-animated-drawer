
# `Why we need native-animated-drawer`

 @react-navigation/drawer is no longer working.even if it works its a huge pain in the ass.it has peer dependencies like react-native-reanimated which have their own compatibility problems.
 native-animated-drawer does not depend on react-native-reanimated. it is using Animated api from react directly.In conclusion native-animated-drawer will have long term stability.


# Preview
coming soon
# `native-animated-drawer`

[![npm version](https://badge.fury.io/js/native-animated-drawer.svg)](https://www.npmjs.com/package/native-animated-drawer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A highly customizable and animated Drawer navigation component for React Native, designed to seamlessly integrate with `react-navigation`. Easily control its appearance, content, and behavior through a centralized Context API.

## ✨ Features

* **Beautiful Animations:** Smooth slide-in/out animations for a polished user experience.
* **Fully Customizable:** Tailor gradients, colors, and list item designs to match your app's theme.
* **Context-Driven State:** Manage drawer open/close state globally via React Context.
* **Centralized Configuration:** Define all drawer data and styles in one convenient location (the `DrawerProvider`).
* **`react-navigation` Compatible:** Designed to work effortlessly with `@react-navigation/native` and `@react-navigation/native-stack`.


## 🚀 Installation
 ### Install plugin

First, install the main package:

```bash
npm install native-animated-drawer
# or
yarn add native-animated-drawer
```

 ### Install peer dependencies

```bash
npm install react-native-linear-gradient react-native-vector-icons
# or
yarn add react-native-linear-gradient react-native-vector-icons
```

## Usage

### Make your route data list
```jsx
// info/routeData.js
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const routeData = [
  {
    id: 'home-1',
    title: 'Share',
    route: 'Share',
    icon: <MaterialCommunityIcons name="home-variant-outline" size={24} color="#FFFFFF" /> // White icon for dark gradient
  },
  {
    id: 'explore-2',
    title: 'Explore',
    route: 'Explore',
    icon: <Ionicons name="search-outline" size={24} color="#FFFFFF" />
  },
  {
    id: 'events-3',
    title: 'My Events',
    route: 'MyEvents',
    icon: <MaterialCommunityIcons name="calendar-month-outline" size={24} color="#FFFFFF" />
  },
  {
    id: 'tasks-4',
    title: 'Tasks',
    route: 'Tasks',
    icon: <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="#FFFFFF" />
  },
  {
    id: 'invite-5',
    title: 'Invite Friends',
    route: 'InviteFriends',
    icon: <MaterialCommunityIcons name="account-group-outline" size={24} color="#FFFFFF" />
  },
  {
    id: 'settings-6',
    title: 'Settings',
    route: 'Settings',
    icon: <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
  },
  {
    id: 'about-7',
    title: 'About',
    route: 'About',
    icon: <Ionicons name="information-circle-outline" size={24} color="#FFFFFF" />
  },
  {
    id: 'signout-8',
    title: 'Sign Out',
    route: 'Logout',
    icon: <MaterialCommunityIcons name="logout-variant" size={24} color="#FFFFFF" />
  }
]
```


### Your main app navigator
```jsx
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import DrawerStackNavigation from './stacks/drawerStack/drawerStack'

function Navigator() {
  return (
    <NavigationContainer>
      <DrawerStackNavigation />
    </NavigationContainer>
  )
}
export default Navigator
```


### Drawer stack component with custom styles

```jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@views/Home/Home'
import Share from '@views/Share/Share'
import { routeData } from '../../../info/routeData'
import { DrawerProvider, createDrawerScreen } from 'native-animated-drawer'

const Stack = createNativeStackNavigator()

export default function DrawerStackNavigation() {

    const MY_CUSTOM_DRAWER_STYLES = {
        drawerStyles: {
            drawerGradientColors: ['#000000', '#424242'], // Dark gray gradient
            drawerGradientStart: { x: 0, y: 0.5 },
            drawerGradientEnd: { x: 1, y: 0.5 }, // Horizontal gradient
        },
        drawerHeaderStyles: {
            title: 'Hamza',
            subtitle: 'Software Engineer',
            image: 'https://your-image-path',
            headerUserNameColor: '#FFD700', // Gold for user name
            headerEventsCountColor: '#FFA07A', // Light Salmon for events count
            headerProfileContainerBgColor: 'rgba(255, 255, 255, 0.2)',
            headerBorderBottomColor: '#616161',
        },
        listItemStyles: {
            itemBgColor: 'rgba(255, 255, 255, 0.08)', // Slightly different item background transparency
            itemTextColor: '#F0F0F0', // Off-white for item text
        },
    }

    return (
        <DrawerProvider
            drawerData={routeData}
            drawerStyles={MY_CUSTOM_DRAWER_STYLES.drawerStyles}
            drawerHeaderStyles={MY_CUSTOM_DRAWER_STYLES.drawerHeaderStyles}
            listItemStyles={MY_CUSTOM_DRAWER_STYLES.listItemStyles}
        >
            <Stack.Navigator
                screenOptions={{ headerShown: true }}
                initialRouteName="Initial"
            >
                <Stack.Screen name="Home" component={createDrawerScreen(Home)} />
                <Stack.Screen name="Share" component={createDrawerScreen(Share)} />
            </Stack.Navigator>
        </DrawerProvider>)
}

```
Notice screen stack is wrapped in DrawerProvider and component is wrapped in createDrawerScreen.


### Drawer stack component with default styles

```jsx
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '@views/Home/Home'
import Share from '@views/Share/Share'
import { routeData } from '../../../info/routeData'
import { DrawerProvider, createDrawerScreen } from 'native-animated-drawer'

const Stack = createNativeStackNavigator()

export default function DrawerStackNavigation() {
    return (
        <DrawerProvider drawerData={routeData}>
            <Stack.Navigator
                screenOptions={{ headerShown: true }}
                initialRouteName="Initial"
            >
                <Stack.Screen name="Home" component={createDrawerScreen(Home)} />
                <Stack.Screen name="Share" component={createDrawerScreen(Share)} />
            </Stack.Navigator>
        </DrawerProvider>)
}
```

### use context useDrawer to open drawer

```jsx
import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useDrawer } from 'native-animated-drawer'

export default function Share({ navigation }) {
        const { setIsDrawerOpen } = useDrawer()
    return (
        <TouchableOpacity style={styles.container} onPress={()=>{setIsDrawerOpen(true)}} >
            <Text> Open drawer </Text>
        </TouchableOpacity>
    )
}
```



