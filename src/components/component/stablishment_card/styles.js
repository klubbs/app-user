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
  imageStyle: { borderRadius: 75 }
}
))`
  height: 150px;
  width: 150px;
  z-index: 10;
`

export const OpenCloseBadge = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  left:90%;
  top:20%;
  border-width: 1px;
  border-color: ${COLORS.COLOR_WHITE};
  background-color: #EA382D;
`

export const Container = styled.View`
    background-color: ${COLORS.COLOR_SECUNDARY_WHITE};
    position: absolute;
    justify-content: center;
    align-items: center;
    top: 25%;
    padding-top: 45%;
    height: 200px;
    border-radius: 20px;
    shadow-color:${COLORS.COLOR_BLACK};
    shadow-opacity: 0.05;
    shadow-offset: 0 2px;
    shadow-radius: 1px;
`

export const ContainerDescription = styled.View`
  flex: 1;
  justify-content:flex-end;
  align-items: center;
`
export const ContainerDescriptions = styled.View`
  width: 100%;
  margin-top: 5%;
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
