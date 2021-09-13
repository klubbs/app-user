import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';

export const Container = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8
}))<{ empty: boolean }>`
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

export const FlatComponent = styled.FlatList.attrs(props => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    backgroundColor: COLORS.COLOR_WHITE, alignItems: 'center', borderRadius: 10, paddingBottom: 80
  },
  columnWrapperStyle: { justifyContent: 'space-around', alignItems: 'center', width: '100%', paddingVertical: 15, paddingHorizontal: 15 }
}))`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: ${COLORS.COLOR_SECUNDARY_WHITE};

`