import * as React from 'react';
import NavStudent from './src_student/navigations/Index';
import NavTutor from './src_tutor/navigations/Index';
import Nav from './src/navigations/Index';
import {useUserContext} from './UserContext';

export default function App() {
  const userType = useUserContext().data?.userType;
  console.log('userType', userType);
  if (userType == 'STUDENT') {
    return <NavStudent />;
  } else if (userType == 'TEACHER') {
    return <NavTutor />;
  } else return <Nav />;
}


//student
// {
//   "mobile":1572732257,
//   "password":"password",
//   "device_name":"est"
//   }

  //admin
  // {
  //   "mobile": 9876543210,
  //      "password": "12345678",
  //      "device_name": "fugit"
  //  }


  
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Screen1 from './src/screens/Screen1';
// import Screen2 from './src/screens/Screen2';
// import Screen3 from './src/screens/Screen3';
// import DrawerNavigation from './src/navigations/Drawer/DrawerNavigation';
// import TabNavigation from './src/navigations/Tabs/TabNavigation';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

// function TabNav() {
//   return (
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={Screen1} />
//         <Tab.Screen name="Settings" component={Screen2} />
//       </Tab.Navigator>
//   );
// }

// function StackNav() {
//   return (
//       <Stack.Navigator initialRouteName="Home">
//       <Stack.Screen name="Flash" component={Screen3} />
//         <Stack.Screen name="Home" component={DrawerNavigation} />
//       </Stack.Navigator>
//   );
// }

// function DrawerNav() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//     <Drawer.Screen name="Home" component={TabNavigation} />
//   </Drawer.Navigator>
//   );
// }
