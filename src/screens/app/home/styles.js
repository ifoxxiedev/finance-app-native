import styled from 'styled-components'

export const Background = styled.View `
  flex: 1;
  background-color: #131313;
`

export const Container = styled.View`
  padding: 0 10px 25px;
`

export const ContainerUser = styled(Container)`
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-color: rgba(255,255,255,.1);
  padding-bottom: 10px;
`

export const Name = styled.Text`
  font-size: 19px;
  color: #fff;
  font-style: italic;
`

export const Money = styled.Text`
  font-size: 30px;
  color: #fff;
  margin-top: 5px;
  font-weight: bold;
`

export const Title = styled.Text`
  font-size: 16px;
  color: #00b94a;
  margin: 0 10px 0;
`

export const List = styled.FlatList`
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 100%;

  margin: 0 10px 0;
  padding: 15px 10px 15px 10px;
`


export const ListItem = styled.View`
  margin-bottom: 10px;
  padding: 10px;
  align-items: flex-start;
  box-shadow: 2px 2px rgba(0,0,0,.4);
  background-color: rgba(0,0,0,.1);
`

export const Badge = styled.View`
  flex-direction: row;
  align-items: center;
  width: auto;
  background-color: ${props => props.color || '#049301'};
  padding: 3px 8px;
  border-radius: 7px;
`

export const BadgeIcon = styled.View`
  margin-right: 5px;

`
export const BadgeText = styled.Text`
  font-size: 16px;
  color: #fff;
`

export const MoneyList = styled.Text`
  margin-top: 5px;
  font-size: 22px;
  font-weight: bold;
  color: #222
`