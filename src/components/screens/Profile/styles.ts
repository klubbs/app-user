import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';
import COLORS from '../../../../assets/constants/colors';


export const SafeArea = styled.SafeAreaView`
  flex:1;
  background-color: ${COLORS.COLOR_WHITE};

`

export const IconLogout = styled(Feather).attrs(props => ({
  name: 'log-out',
  size: 16,
  colors: COLORS.COLOR_BLACK40
}))``

export const IconUser = styled(Feather).attrs(props => ({
  name: 'user',
  size: 35,
  color: COLORS.COLOR_BLACK40
}))``

export const ContainerPoints = styled.View`
  border-left-width: 0.8px;
  border-left-color: ${COLORS.COLOR_BLACK20};
  flex: 1;
  height: 20%;
  margin-left: 5%;
  justify-content: center;
  padding-left: 10%;
`;

export const UserImage = styled.Image.attrs({
  resizeMode: 'contain'
})`
  width: 70px;
  height: 70px;
  z-index: 10;
`;

export const ContainerImage = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ImageBorder = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border-width: 5px;
  border-right-color: ${COLORS.COLOR_YELLOW};
  border-bottom-color: ${COLORS.COLOR_YELLOW};
  background-color: ${COLORS.COLOR_BLACK10};
  border-color: transparent;
  justify-content: center;
  align-items: center;
`;


export const WrapperTop = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const PointValues = styled.Text`
  color:${COLORS.COLOR_BLACK40};
  font-size:14px;
  font-family:'Nunito_Light';
`


export const Point = styled.Text`
  color:${COLORS.COLOR_BLACK80};
  font-size:14px;
  font-family:'Nunito_Regular';
`

export const MenuTextContainer = styled.View`
  flex: 1;
  align-items: flex-start;
  padding-left: 5%;
`


export const MenuLogoutContainer = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.8
}))`
  margin-top: 50px;
  padding-left: 2%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 15%;
`;

export const MenuTextLogout = styled.Text`
  color:${COLORS.COLOR_BLACK40};
  font-size:16px;
  font-family:'Nunito_Regular';
`

export const ContainerScroll = styled.ScrollView`
	padding:20px;
`

