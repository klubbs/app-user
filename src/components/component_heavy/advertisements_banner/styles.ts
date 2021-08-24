import { Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';

const WIDTH_DIMENSION = Dimensions.get('window').width


export const ContainerImage = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 150px;
  margin-right: 10px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`

export const CarouselBanner = styled(Carousel).attrs(props => ({
  autoplay: false,
  alwaysBounceHorizontal: true,
  sliderWidth: WIDTH_DIMENSION,
  itemWidth: WIDTH_DIMENSION / 1.2
}))``

export const Paginate = styled(Pagination).attrs(props => ({
  dotsLength: 2,
  activeDotIndex: 1,
  dotStyle: { width: 5, height: 5, borderRadius: 2.5, marginHorizontal: 8, backgroundColor: COLORS.COLOR_SECUNDARY_BLACK, top: -15 },
  inactiveDotStyle: { backgroundColor: COLORS.COLOR_SECUNDARY_BLACK },
  inactiveDotOpacity: 0.2,
  inactiveDotScale: 0.6
}))`

`
