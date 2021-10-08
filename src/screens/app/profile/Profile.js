import React, { useContext, useState } from 'react'
import { Modal, Text, View, Alert, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Container, Name, ButtonLogout, ButtonRegister, ButtonText } from './styles'
import { AuthContext } from '../../../context/auth-context'

const Profile = () => {
  const [showModal, setShowModal] = useState(false)
  const { user, signOut } = useContext(AuthContext)
  const navigator = useNavigation()
  return (
    <Container>
      <Name>Criar o registro</Name>
      <ButtonRegister onPress={() => {
        navigator.navigate('Registrar')
      }}>
        <ButtonText>Registrar gastos</ButtonText>
      </ButtonRegister>
      <ButtonLogout onPress={() => {
        Alert.alert('', `${user.name.split(' ')[0]}, deseja realmente sair?`, [
          {
            text: 'Confirmar',
            style: 'default',
            onPress: () => signOut()
          },
          {
            text: 'Cancelar',
            style: 'cancel'
          }
        ])
      }}>
        <ButtonText>Sair</ButtonText>
      </ButtonLogout>
     
    </Container>
  )
}

export default Profile