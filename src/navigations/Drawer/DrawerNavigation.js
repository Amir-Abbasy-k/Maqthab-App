import React, {Fragment, useEffect} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import DrawerHeader from './components/DrawerHeader';
import TabNavigation from '../../navigations/Tabs/TabNavigation';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/AntDesign';
import { useUserContext } from '../../../UserContext';
import { setProfile, setToken, setUserType } from '../../../src/services/asyncStorage/AsyncStorage';



const pages = [
  {name: 'Plan & Pricing', route: 'Settings'},
  {name: 'Personal Info', route: 'Me'},
  {name: 'Time Logs', route: 'Classrooms'},
  {name: 'Invite Friends', route: 'Home'},
  {name: 'Quran for Revision', route: 'Home'},
  {name: 'Help and support ', route: 'Home'},
];

function CustomDrawerContent(props) {
  
  const userCntx = useUserContext();

  return (
    <>
      <DrawerHeader />
      <DrawerContentScrollView {...props} contentContainerStyle={{height: '95%'}}>
        {pages.map((item, key) => (
          <DrawerItem
            key={key}
            label={item.name}
            labelStyle={styles.itemLabel}
            onPress={() => props.navigation.navigate(item.route)}
          />
        ))}

        {/*  <DrawerItem
          label="Calendar"
          labelStyle={styles.itemLabel}
          onPress={() => props.navigation.navigate('Calendar')}
        />
        <DrawerItem
          label="Gallery/ Media"
          onPress={() => props.navigation.navigate('3')}
          labelStyle={styles.itemLabel}
        /> */}

        <TouchableOpacity
          onPress={()=> {
            userCntx.setData({...userCntx.data, userType: 'ADMIN', prof:{name: "GUEST USER", pic: "new url"}});
            setToken("")
            setUserType("")
            setProfile({})
            console.log("LOGOUT---");}
          }
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            position: 'absolute',
            bottom: 0,
            right: 0
          }}>
          <Text style={{fontSize: 16, marginRight: 10}}>Logout</Text>
          <Icon
            name="logout"
            size={25}
            color="#E84A4A"
            style={{padding: 2}}
          />
        </TouchableOpacity>
      </DrawerContentScrollView>
    </>
  );
}

const DrawerNavigation = props => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Tab"
      drawerPosition="left"
      drawerType="front"
      screenOptions={{
        activeTintColor: '#e91e63',
        headerShown: false,
      }}
      drawerStyle={{
        backgroundColor: '#242A34',
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Tab" component={TabNavigation} />
      {/* <Drawer.Screen name="Dashboard" component={Screen1} /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  itemLabel: {
    fontSize: 14,
    // color: '#fff',
  },
});
