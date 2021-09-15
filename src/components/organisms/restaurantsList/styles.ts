import { MotiView } from '@motify/components'
import styled from 'styled-components/native'
import COLORS from '../../../../assets/constants/colors'
import { isIphoneX } from '../../../utils/iphoneHelper'


export const containerStyle = { height: '100%' }

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
`;


export const WrapperNotFound = styled(MotiView).attrs(props => ({
  from: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  }
}))`
  align-items:center;
  justify-content: center;
`


export const NotFoundTitle = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:14px;
  font-family:'Nunito_SemiBold';
  margin-top: 20px;
`;

export const NotFoundSubtitle = styled.Text`
  color:${COLORS.COLOR_GRAY};
  font-size:12px;
  font-family:'Nunito_Light';
  margin-bottom: 20px;
`;

export const WrapperDenied = styled(MotiView).attrs(props => ({
  from: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: 'spring'
  }
}))`
  align-items:center;
  padding-top:20%;
  height:85%;
`
