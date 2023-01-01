import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { Feather } from '@expo/vector-icons';
import { ClockIcon } from '../../../../assets/icons/clockIcon';

export const Container = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.COLOR_BLACK10};
  border-width: 2px;
  border-color: ${colors.COLOR_BLACK5};
`;

export const Icon = styled(Feather).attrs((props) => ({
  name: props.right ? 'chevron-right' : 'chevron-left',
  size: 18,
  color: props.light ? colors.COLOR_WHITE : colors.COLOR_SECUNDARY_BLACK,
}))<{ right?: boolean; light?: boolean }>``;
