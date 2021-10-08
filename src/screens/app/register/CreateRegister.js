import React, { useCallback , useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker'
import currencyFormatter from 'currency-formatter'
import { format } from 'date-fns'
import { 
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from 'react-native'

import {
  Container,
  InputText,
  RegisterButton,
  RegisterButtonText,
  PickerBox
} from './styles'

import { AuthContext } from '../../../context/auth-context'
import firebase from '../../../services/firebase'

const CreateRegister = () => {
  const pickerRef = React.createRef()
  const { user, updateUserStore } = React.useContext(AuthContext)
  const navigator = useNavigation()
  
  const [formData, setFormData] = useState({
    value: '',
    operation: null,
  })
  
  const closeKeyboard = useCallback(() => Keyboard.dismiss(), [])
  
  const currencyNumber = number => {
    return currencyFormatter.format(number, { locale: 'pt-BR'})
  }

  const unCurrencynumber = number => {
    return currencyFormatter.unformat(number, { locale: 'pt-BR'})
  }


  const registerOperation = (operation, value, multiplyer) => {
    let error;
    const dbRef = firebase.database().ref('history')
    const key = dbRef.child(user.id).push().key

    dbRef.child(user.id)
      .child(key)
      .set({
        id: key,
        user_id: user.id,
        valor: value,
        tipo: operation,
        timestamp: Date.now(),
        created_at: format(new Date(), 'yyyy-MM-dd')
      })
    .then(() => {
      const usersRef = firebase.database().ref('users')
      return usersRef.child(user.id).update({
        saldo: user.saldo + (value * multiplyer)
      })
    })
    .then(() => updateUserStore({ id: user.id }))
    .catch(err => error = err)
    .finally(() => {
      if (error) {
        Alert.alert('Erro', 'Não foi possível concluir a operação')
      } else {
        Alert.alert('Successo', 'Operação realizada com sucesso!')
        setFormData({ operation: '', value: '0.0' })
        closeKeyboard()
        navigator.navigate('Home')
      }
    })
  }

  const handleRegister = useCallback(() => {
    let { value, operation } = formData
    if (!value || isNaN(value)) {
      return Alert.alert('Validação','Insira o valor valido para a operação!')
    }
    if (!operation) {
      return Alert.alert('Validacao', 'Selecione o tipo da operação!')
    }

    // Format a number
    value = unCurrencynumber(formData.value)
    const money = Number(user.saldo)
    let multiplyer = 1

    // Se for despesa verificar o saldo do usuario 
    if (operation === 'despesa') {
      multiplyer = -1
      if (value > money) {
        return Alert.alert(
          'Valor da operação excedida',
          `Valor: ${currencyNumber(value)}\nSaldo atual: ${currencyNumber(money)}`
        )
      }
    }

   Alert.alert(
     'Confirmar',
     'Deseja realizar essa operação?',
     [
       {
         text: 'Confirmar',
         onPress: () => registerOperation(operation, value, multiplyer),
       },
       {
         text: 'Cancelar',
         style: 'cancel'
       }
     ]
    )

  }, [formData, user])


  return (
    <TouchableWithoutFeedback onPress={closeKeyboard}>
      <Container>
        <InputText 
          name="saldo"
          placeholder="Valor desejado"
          autoFocus={true}
          keyboardType="numeric"
          returnKeyType="next"
          value={`${formData.value}`}
          onChangeText={value => setFormData({ ...formData, value })}
          onSubmitEditing={() => pickerRef.current.focus()}
          />

          <PickerBox >
            <Picker
              ref={pickerRef}
              selectedValue={formData.operation}
              onValueChange={(operation) => setFormData({ ...formData, operation })}>
              <Picker.Item enabled={false} label="Selecione a operação" />
              <Picker.Item enabled={true} label="Receita +"  value="receita" />
              <Picker.Item enabled={true} label="Despesa -" value="despesa" />
            </Picker>
          </PickerBox>
        <RegisterButton onPress={handleRegister}>
          <RegisterButtonText>Registrar despesa</RegisterButtonText>
        </RegisterButton>
      </Container>
    </TouchableWithoutFeedback>
  )
}

export default CreateRegister