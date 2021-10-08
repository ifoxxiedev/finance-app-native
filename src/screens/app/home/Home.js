import React, { useContext, useState, useEffect, useCallback } from 'react'
import { View, Modal, Text, TouchableOpacity ,TouchableWithoutFeedback, Alert, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/Feather'
import { AuthContext } from '../../../context/auth-context'
import { 
  Background,
  Container,
  ContainerUser,
  Name,
  Money,
  Title,
  List,
  ListItem,
  Badge,
  BadgeIcon,
  BadgeText,
  MoneyList
} from './styles'

import currency from 'currency-formatter'
import { format } from 'date-fns'
import firebase from '../../../services/firebase'

const Home = () => {
  const { user, updateUserStore } = useContext(AuthContext)
  const [movs, setMovs] = useState([])
  const [showMoney, setShowMoney] = useState(false)
  const [dateFilter, setDateFilter]= useState(new Date())
  const [dialogModal, setDialogModal] = useState(false)
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    const fetchAllMovimentations = async () => {
      firebase.database()
      .ref('history')
      .child(user.id)
      .orderByChild("created_at").equalTo(format(dateFilter, 'yyyy-MM-dd'))
      .limitToLast(10)
      .on('value', $snap => {
        const result = []
        $snap.forEach(item => {
          const value = item.val()
          result.push(value)
        })
       setMovs(result.reverse())
     })
    }

    fetchAllMovimentations()
  }, [dateFilter])

  const resolveItemProps = useCallback((tipo) => {
    const result = {}
    if (tipo === 'despesa') {
      result.color = '#c62c36'
      result.icon = 'arrow-down'
    }
    if (tipo === 'receita') {
      result.color = '#049301'
      result.icon = 'arrow-up'
    }
    return result
  }, [])

  const removeItem = useCallback((item) => {
    const sendData = async () => {
      const delta = item.tipo === 'receita' ? -1 : 1

      await firebase.database().ref('history').child(item.user_id).child(item.id).remove()
      await firebase.database().ref('users').child(item.user_id).update({
        saldo: user.saldo + (item.valor * delta)
      }).then(() => updateUserStore({ id: item.user_id }))
    }
    sendData()
  }, [user])

  const handleRemove = useCallback((item) => {
    const past = format(new Date(), 'yyyy-MM-dd') !== item.created_at
    if (past) {
      Alert.alert('Erro', 'A movimentação não pode ser removida quando expirada')
      return
    }


    Alert.alert(
      'Remoção',
      'Deseja remover esse item?',
      [
        {
          text: 'Confirmar',
          onPress: () => {
            removeItem(item)

          }
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    )
  }, [removeItem])
  
  const formatCurrency = useCallback(value => {
    return currency.format(value || 0, { code: 'BRL'})
  }, [])

  return (
    <Background>
      <Modal visible={dialogModal} transparent={true}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.9)', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '90%', padding: 20, height: 200, backgroundColor: '#fff', borderRadius: 5, elevation: 1, position: 'relative'}}>
            <TouchableOpacity 
              onPress={() => setDialogModal(false)}
              style={{position: 'absolute', right: 10, top: 10}}>
              <Icon name="x" size={16}></Icon>
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
              <Text style={{color: '#000', fontSize: 22}}>Selecione uma data</Text>
              <TouchableOpacity 
                onPress={() => setShowPicker(true)}
                style={{
                  width: '100%',
                  height: 45,
                  backgroundColor: '#0fb9',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 5,
                  marginTop: 15
                }}>
                <Text style={{fontWeight: 'bold'}}>Selecionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {
        showPicker && <DateTimePicker 
          value={dateFilter} 
            onChange={(_, value) => {
            setShowPicker(Platform.OS === 'ios')
            setDateFilter(value)
        }} />
      }
      <ContainerUser>
        <Name>{user && user.name}</Name>
        <View style={{marginTop: 15, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setShowMoney(!showMoney)}>
            <Icon
              name={!showMoney ? 'eye' : 'eye-off' }
              color={"#fff"} size={20} 
            />
          </TouchableOpacity>
          <Text style={{marginLeft: 10, fontSize: 16, color: '#fff'}}>
            {showMoney ? formatCurrency(user.saldo) : 'Mostrar Saldo'}
          </Text>
        </View>
      </ContainerUser>
      <Container style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Icon size={20} color={"#fff"} name="calendar"></Icon>
        </TouchableOpacity>
        <Title>Ultimas movimentacoes</Title>
      </Container>
      {
        movs.length ? (
        <List
          contentContainerStyle={{
            paddingBottom: 20
          }}
          showsVerticalScrollIndicator={false}
          data={movs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const { icon, color } = resolveItemProps(item.tipo)
            return (
              <TouchableWithoutFeedback onLongPress={() => handleRemove(item)}>
              <ListItem>
                <Badge color={color}>
                  <BadgeIcon>
                    <Icon color={"#fff"} size={16} name={icon} />
                  </BadgeIcon>
                  <BadgeText>
                    {item.tipo}
                  </BadgeText>
                </Badge>
                <MoneyList>
                  { formatCurrency(item.valor) }
                </MoneyList>
              </ListItem>
              </TouchableWithoutFeedback>
            )
          }}
        />) : (
          <Container>
            <Text style={{color: '#fff', fontSize: 18}}>Nenhuma movimentação para este dia</Text>
          </Container>
        )
      }
        
      
    </Background>
  )
}

export default Home