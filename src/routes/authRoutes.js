import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SignIn from '../screens/auth/SignIn'
import SignUp from '../screens/auth/SignUp'

const Stack = createStackNavigator()

const StackScreenOptions = {
  headerShown: false
}

const AuthRoutes = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen 
        options={StackScreenOptions}
        name="SignIn" 
        component={SignIn}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={StackScreenOptions}
      />
    </Stack.Navigator>
  )
}

export default AuthRoutes