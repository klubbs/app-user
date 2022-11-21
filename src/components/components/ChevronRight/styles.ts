import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { Feather } from '@expo/vector-icons';


export const Container = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.COLOR_BLACK10};
  border-width:2px;
  border-color:${colors.COLOR_BLACK5}
`;


export const Icon = styled(Feather).attrs(props => ({
  name: "chevron-right",
  size: 18,
  colors: colors.COLOR_SECUNDARY_BLACK
}))``
