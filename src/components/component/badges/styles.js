import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors'

export const Wrapper = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Box = styled.View`
  border-radius: 20px;
  background-color: ${COLORS.COLOR_YELLOW};
  width: 75%;
  height: 30%;
`

export const Description = styled.Text`
  color:${COLORS.COLOR_YELLOW};
  font-size:15px;
  font-family:'Nunito_400Regular';
`;
