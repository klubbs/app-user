import { Skeleton } from '@motify/skeleton';
import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import { MotiView } from 'moti'

export const Description = styled.Text<{ selected: boolean }>`
  color:${({ selected }) => selected ? colors.COLOR_WHITE : colors.COLOR_BLACK80};
  font-size:13px;
  font-family:${({ selected }) => selected ? 'Nunito_Bold' : 'Nunito_Regular'};;
`;



export const WrapplerTouchable = styled.TouchableOpacity<{ selected: boolean }>`
  margin-left: 10px;
  width:90px;
  height:30px;
  background-color: ${({ selected }) => selected ? colors.COLOR_YELLOW : 'transparent'}
  border-radius:5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width:1px;
  border-color:${({ selected }) => selected ? 'transparent' : colors.COLOR_BLACK10}
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
