import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';



export const SelectionTouch = styled.TouchableOpacity<{ active: boolean }>`
  background-color: ${props => !props.active ? colors.COLOR_BLACK10 : colors.COLOR_YELLOW};
  border-color: ${colors.COLOR_BLACK5};
  border-width: 2px;
  width: 22px;
  height:22px;
  border-radius: 11px;
`
