import React from 'react'
import { Platform } from 'react-native'
import {AuthContext} from '../../context/auth-context'
import { useNavigation, StackActions } from '@react-navigation/native'
import { ActivityIndicator } from 'react-native'
import { 
  Background,
  Container,
  Logo,
  AreaInput,
  Input,
  SubmitButton,
  SubmitText,
  Link,
  LinkText
} from '../../components/shared/styles'

const SignUp = () => {
  const { signUp, loadingAuth } = React.useContext(AuthContext)
  const navigation = useNavigation()
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

const handleSignUp = () => {
  if (!formData.name) return alert('Missing field name')
  if (!formData.email) return alert('Missing field email')
  if (!formData.password) return alert('Missing field password')
  if (!formData.confirmPassword) return alert('Missing field confirmPassword')
  if (formData.confirmPassword !== formData.password) return alert('Password\'s don\'t match!')

  signUp({ ...formData })
}

  return (
    <Background>
      {/* 
        IOS: prop 'behavior' for 'KeyboardAvoidingView' component
        Habilita um espaçamento no IOS quando exibir o teclado 
        Por Padrão no android já acontece
       */}
      <Container behavior={Platform.OS === 'ios' ? 'padding': ''}>
        <Logo source={require('../../assets/images/Logo.png')}></Logo>
       
        <AreaInput>
          <Input 
            underlineColorAndroid="transparent"
            placeholder="Name"
            autoCorrect={false}
            autoCapitalize="none"
            value={formData.name}
            onChangeText={name => setFormData({ ...formData, name })}
          />
        </AreaInput>

        <AreaInput>
          <Input 
            underlineColorAndroid="transparent"
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            value={formData.email}
            onChangeText={email => setFormData({ ...formData, email })}
          />
        </AreaInput>

        <AreaInput>
          <Input 
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            placeholder="Password"
            autoCorrect={false}
            autoCapitalize="none"
            value={formData.password}
            onChangeText={password => setFormData({ ...formData, password })}
          />
        </AreaInput>

        <AreaInput>
          <Input 
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            placeholder="Confirm Password"
            autoCorrect={false}
            autoCapitalize="none"
            value={formData.confirmPassword}
            onChangeText={confirmPassword => setFormData({ ...formData, confirmPassword })}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {
            loadingAuth 
            ? (<ActivityIndicator />) 
            : (
              <SubmitText>Registrar</SubmitText>
            )
          }
        </SubmitButton>

        <Link onPress={() => navigation.dispatch(StackActions.popToTop()) }>
          <LinkText>Já possuo uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  )
}

export default SignUp