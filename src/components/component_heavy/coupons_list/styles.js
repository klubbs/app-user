import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors'


export const Container = {
  backgroundColor: COLORS.COLOR_WHITE,
  alignItems: 'center',
  borderRadius: 10,
  paddingBottom: 80
}

export const ColumWrapperStyle = {
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  paddingVertical: 15,
  paddingHorizontal: 15
}

export const FlatStyle = { width: '100%', height: '100%', padding: 10, backgroundColor: COLORS.COLOR_SECUNDARY_WHITE }

export const Box = styled.View`
  background-color: ${props => props.empty ? 'transparent' : COLORS.COLOR_SECUNDARY_WHITE};
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 200px;
  border-radius: 10px;
  shadow-color:${COLORS.COLOR_BLACK};
  shadow-opacity: 0.05;
  shadow-offset: 0 2px;
  shadow-radius: 1px;
`

export const PercentOff = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_Bold';
`;

export const Valid = styled.Text`
  color:${COLORS.COLOR_BLACK50};
  font-size:12px;
  font-family:'Nunito_Regular';
`;
