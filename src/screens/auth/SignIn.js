import React from 'react'
import { Platform, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
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

import { AuthContext } from '../../context/auth-context'

const SignIn = () => {
  const navigation = useNavigation()
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })

  const { signIn, loadingAuth } = React.useContext(AuthContext)

  const handleLogin = () => signIn(formData)
  .then(() => setFormData({}))
  .catch(err => alert(err.message))

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

        <SubmitButton onPress={handleLogin}>
          {
            loadingAuth 
            ? (<ActivityIndicator color="#131313" size={20} />) 
            : (<SubmitText>Acessar</SubmitText>)
          }
        </SubmitButton>

        <Link onPress={() => navigation.navigate('SignUp', { date: Date.now() })}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>
      </Container>
    </Background>
  )
}

export default SignIn