import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors'


export const containerStyle = { paddingBottom: 50 }

export const wrapperStyle = { justifyContent: 'space-around' }

export const EmptyCard = styled.View`
  height: 280px;
  width: 40%;
  align-items: center;
  background-color: transparent;
`

export const Header = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:18px;
  font-family:'Nunito_Bold';
  margin-bottom: 20px;
  left: 5%;
`;
