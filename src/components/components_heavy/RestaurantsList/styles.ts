import { MotiView } from '@motify/components';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { isIphoneX } from '../../../utils/dimensions';

export const wrapperStyle = { justifyContent: 'space-around', marginBottom: 5 };

export const EmptyCard = styled.View`
  height: 250px;
  width: ${isIphoneX() ? '190px' : '175px'};
  align-items: center;
  background-color: transparent;
`;

export const Header = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 18px;
  font-family: 'Nunito_Bold';
  margin-bottom: 5px;
`;

export const WrapperNotFound = styled(MotiView).attrs((props) => ({
  from: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
}))`
  align-items: center;
  justify-content: center;
`;

export const NotFoundTitle = styled.Text`
  color: ${colors.COLOR_SECUNDARY_BLACK};
  font-size: 14px;
  font-family: 'Nunito_SemiBold';
  margin-top: 20px;
`;

export const NotFoundSubtitle = styled.Text`
  color: ${colors.COLOR_GRAY};
  font-size: 12px;
  font-family: 'Nunito_Light';
  margin-bottom: 20px;
`;

export const WrapperDenied = styled(MotiView).attrs((props) => ({
  from: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: 'spring',
  },
}))`
  align-items: center;
  padding-top: 20%;
  height: 85%;
`;
