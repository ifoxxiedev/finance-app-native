import styled from 'styled-components'

export const Container = styled.KeyboardAvoidingView`
  background-color: #131313;
  flex: 1;
  align-items: center;
  justify-content: center;
`


export const InputText = styled.TextInput.attrs({
  placeholderTextColor: '#222'
})`
  height: 50px;
  width: 90%;
  background-color: rgba(255,255,255,.75);
  padding: 0 15px;
  border-radius: 7px;
  font-size: 16px;
  margin-bottom: 15px;
`

export const PickerBox = styled.View`
  height: 50px;
  width: 90%;
  background-color: rgba(255,255,255,.75);
  border-radius: 7px;
`

export const RegisterButton = styled.TouchableOpacity`
  margin-top: 25px;
  background-color: #00b94a;
  width: 90%;
  padding: 10px;
  height: 50px;
  border-radius: 7px;
  justify-content: center;
  align-items: center;

`


export const RegisterButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
`