import React from 'react'
import { StatusBar, SafeAreaView, View } from 'react-native';

import SetupRoutes from './src/routes'
import AuthProvider from './src/context/auth-context'
const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor="#131313" />
      <AuthProvider>
        <SetupRoutes />
      </AuthProvider>
    </SafeAreaView>
  );
};


export default App;
