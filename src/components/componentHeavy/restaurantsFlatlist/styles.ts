import styled from 'styled-components/native'
import COLORS from '../../../../assets/constants/colors'
import { isIphoneX } from '../../../utils/iphoneHelper'


export const containerStyle = { paddingBottom: 50, height: '100%' }

export const wrapperStyle = { justifyContent: 'space-around' }

export const EmptyCard = styled.View`
  height: 250px;
  width: ${isIphoneX() ? '190px' : '175px'};
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
