import styled from 'styled-components/native'

export const Background = styled.View`
  flex: 1;
  background-color: #131313;
`;

// KeyboardAvoidingView, quando o teclado aparecer move a view
export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Logo = styled.Image`
  margin-bottom: 25px;
`

export const AreaInput = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`

export const Input = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.2)'
})`
  background-color: rgba(0,0,0,0.2);
  width: 90%;
  font-size: 14px;
  color: #fff;

  padding: 10px 20px;
  border-radius: 4px;
`

export const SubmitButton = styled.TouchableOpacity`
  width: 90%;
  background-color: #00b94a;
  padding: 10px;
  height: 45px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`

export const SubmitText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`

export const Link = styled.TouchableOpacity`
  width: 90%;
  margin-top: 25px;

`

export const LinkText = styled.Text`
  text-align: center;
  color: #fff;

`