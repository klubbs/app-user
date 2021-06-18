import styled from 'styled-components';
import COLORS from '../../../../assets/constants/colors'


export const Description = styled.Text`
  color:${({ selected }) => selected ? COLORS.COLOR_SECUNDARY_BLACK : COLORS.COLOR_BLACK80};
  font-size:13px;
  font-family:${({ selected }) => selected ? 'Nunito_Bold' : 'Nunito_Regular'};;
`;


export const Dot = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-right: 5px;
  background-color: ${({ selected }) => selected ? COLORS.COLOR_YELLOW : 'transparent'};
`

export const WrapplerTouchable = styled.TouchableOpacity.attrs(props => {

})`
  margin-left: 10px;
  width:100px;
  height:30px;
  padding: 1px;
  border-radius:5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
