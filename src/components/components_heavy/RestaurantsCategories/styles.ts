import { Skeleton } from '@motify/skeleton';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { MotiView } from 'moti'

export const Description = styled.Text<{ active: boolean }>`
  color:${({ active }) => active ? colors.COLOR_SECUNDARY_BLACK : colors.COLOR_BLACK80};
  font-size:13px;
  font-family:${({ active }) => active ? 'Nunito_Bold' : 'Nunito_Regular'};;
`;


export const Dot = styled.View<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin-right: 5px;
  background-color: ${({ active }) => active ? colors.COLOR_YELLOW : 'transparent'};
`

export const WrapplerTouchable = styled.TouchableOpacity`
  margin-left: 10px;
  width:100px;
  padding: 1px;
  border-radius:5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


export const FlatComponent = styled.FlatList.attrs(props => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingVertical: 20, marginBottom: 10, marginTop: 20 }
}))`
`


export const SkeletonStyled = styled(Skeleton).attrs(props => ({
  width: '100%',
  height: 20,
  colorMode: 'light',
  colors: [colors.COLOR_SECUNDARY_WHITE, colors.COLOR_WHITE],
  transition: {
    duration: 800
  }
}))`
`

export const WrapperSkeleton = styled(MotiView)`
  margin-top:20px;
  margin-bottom:20px;
`
