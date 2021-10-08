import 'react-native-gesture-handler';
import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from '../context/auth-context'
import AuthRoutes from './authRoutes'
import AppRoutes from './appRoutes'

const SetupRoutes = () => {
  const { isSigned, isLoading } = React.useContext(AuthContext)

  if (isLoading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#131313"
      }}>
        <View>
          <ActivityIndicator size="large" color="#00b94a" />
          <Text style={{marginTop: 10, color: '#fff'}}>Carregando...</Text>
        </View>

      </View>
    )
  }

  return (
    <NavigationContainer>
      { isSigned ? (<AppRoutes/>) : <AuthRoutes /> }
    </NavigationContainer>
  )
}


export default SetupRoutes