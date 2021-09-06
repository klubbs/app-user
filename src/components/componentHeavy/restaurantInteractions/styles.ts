import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';
import COLORS from '../../../../assets/constants/colors';


export const RestaurantFlatlist = styled.FlatList.attrs(props => {

})``


export const Container = styled.View`
  background-color: ${colors.COLOR_BLACK10};
  border-radius: 10px;
  overflow: hidden;
  width: 50px;
  height:50px;
`

export const Header = styled.Text`
  color:${COLORS.COLOR_BLACK40};
  font-size:18px;
  font-family:'Nunito_Bold';
  margin-bottom: 20px;
`;

export const TouchableContainer = styled.TouchableOpacity.attrs(props => ({

}))`

`
