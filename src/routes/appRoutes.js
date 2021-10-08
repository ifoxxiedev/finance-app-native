import React from 'react'
import { View, Text, Image } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

import Home from '../screens/app/home/Home'
import Profile from '../screens/app/profile/Profile'
import CreateRegister from '../screens/app/register/CreateRegister'

import { AuthContext } from '../context/auth-context'

const Drawer = createDrawerNavigator()


const CustomDrawer = (props) => {
  const { user, signOut } = React.useContext(AuthContext)
  return (
    <DrawerContentScrollView {...props}>
      <View style={{paddingTop: 25, paddingHorizontal: 25, paddingBottom: 20}}>
        <View style={{
          width: 85,
          height: 85,
          borderWidth: 2, borderColor: '#00b94be7', backgroundColor: '#00b94be7', borderRadius: 85,
          overflow: 'hidden'
        }}>
          <Image 
            resizeMode="contain"
            source={require('../assets/images/Logo.png')} 
            style={{
              height: '100%',
              width: '100%'
            }} />
        </View>
        <Text style={{color: '#fff', fontSize: 18, marginTop: 15, marginBottom: 5}}>{user.name}</Text>
        <Text style={{color: '#fff', fontSize: 14}}>{user.email}</Text>
      </View>
      <DrawerItemList {...props}></DrawerItemList>

      <DrawerItem
        {...props}
        onPress={() => signOut()}
        label="Sair"
        inactiveBackgroundColor="red"
      />
    </DrawerContentScrollView>
  )
}


const drawerContentOptions = {
  labelStyle: {
    color: '#fff',
    fontWeight: 'bold'
  },
  activeTintColor: '#fff',
  activeBackgroundColor: '#00b94a',
  inactiveBackgroundColor: '#000',
  inactiveTintColor: '#ddd',
  itemStyle: {
    marginVertical: 7,
    // marginHorizontal: 20
  }
}

const drawerItemOptions = {
  headerShown: true,
  headerTintColor: "#fff",
  headerTitle: '',
  headerStyle: {
    backgroundColor: '#131313',
    borderColor: '#131313',
    borderWidth: 0,
    elevation: 0
  }
}

const AppRoutes = () => {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerContentOptions={drawerContentOptions}
      drawerStyle={{backgroundColor: '#171717'}}>
      <Drawer.Screen
        options={{
          ...drawerItemOptions,
          drawerLabel: 'Início'
        }}
        name="Home"
        
        component={Home}
      />

      <Drawer.Screen
        options={{
          ...drawerItemOptions
        }}
        name="Perfil"
        component={Profile}
      />

      <Drawer.Screen
        options={drawerItemOptions}
        name="Registrar"
        component={CreateRegister}
      />

    </Drawer.Navigator>
  )
}

export default AppRoutes