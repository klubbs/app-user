import styled from 'styled-components'
import COLORS from '../../../../assets/constants/colors'

export const Wrapper = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: 0.9
}
))`
    height: 280px;
    width: 45%;
    align-items: center;
`

export const Image = styled.ImageBackground.attrs(props => ({
  imageStyle: { borderRadius: 10 }
}
))`
  height: 100px;
  width: 180px;
  z-index: 10;
`

export const OpenCloseBadge = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  left:95%;
  top:-5%;
  border-width: 1px;
  border-color: ${COLORS.COLOR_WHITE};
  background-color: #EA382D;
`

export const Container = styled.View`
    /* background-color: ${COLORS.COLOR_YELLOW}; */
    /* justify-content: center; */
    align-items: flex-start;
    /* padding-top: 5%; */
    height: 120px;
    width: 180px;
`

export const ContainerDescription = styled.View`
  flex: 1;
  justify-content:flex-end;
  align-items: center;
`
export const ContainerDescriptions = styled.View`
  flex:4;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-evenly;
`

export const ContainerBadges = styled.View`
  width: 100%;
  margin-top: 10%;
  flex-direction: row;
  justify-content:space-evenly;
  align-items: flex-start;
`

export const StablishmentName = styled.Text`
  color:${COLORS.COLOR_SECUNDARY_BLACK};
  font-size:16px;
  font-family:'Nunito_Bold';
  margin-bottom: 2%;
`;

export const StablishmentCategory = styled.Text`
  color:${COLORS.COLOR_BLACK50};
  font-size:12px;
  font-family:'Nunito_Light';
`;

export const ContainerToolbar = styled.View`
  flex:2;
  width: 180px;
  background-color: ${COLORS.COLOR_BLACK};
  border-radius: 10px;
  justify-content: flex-start;
  padding-horizontal:5px;
  align-items: center;
  flex-direction: row;
`

const ToolbarBadgeDefault = styled.View`
  width: 30%;
  height: 80%;
  margin-right: 8px;
`

export const ContainerOff = styled(ToolbarBadgeDefault)`
  background-color: ${COLORS.COLOR_SECUNDARY_BLACK};
  border-radius: 10px;
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
`

export const ContainerDistance = styled(ToolbarBadgeDefault)`
  justify-content: space-between;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
`

export const OffCoupon = styled.Text`
  color:${COLORS.COLOR_YELLOW};
  font-size:11px;
  font-family:'Nunito_Bold';
`;

export const DistanceLocation = styled.Text`
  color:${COLORS.COLOR_WHITE_80};
  font-size:10px;
  font-family:'Nunito_Regular';
`;
