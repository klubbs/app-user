import styled from 'styled-components/native';
import colors from '../../../../assets/constants/colors';
import { Feather } from '@expo/vector-icons';


export const Wrapper = styled.SafeAreaView`
  background-color: ${colors.COLOR_WHITE};
  justify-content: center;
  align-items: center;
  flex:1;
`

export const Container = styled.View`
  padding:20px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex:1;
`

export const SocialMediaContainer = styled.View`
  border-radius: 20px;
  flex-direction: row;
  padding:20px;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  background-color: ${colors.COLOR_BLACK10};
  flex:0.05;
`

export const SocialMediaSubtitle = styled.Text`
  margin-top: 15%;
  margin-bottom:2%;
  margin-left:5%;
  align-self: flex-start;
  color:${colors.COLOR_BLACK80};
  font-size:12px;
  font-family:'Nunito_Bold';
`

export const Instagram = styled(Feather).attrs(props => ({
  name: 'instagram',
  size: 22,
  color: colors.COLOR_BLACK40
}))`
`

export const Twitter = styled(Feather).attrs(props => ({
  name: 'twitter',
  size: 22,
  color: colors.COLOR_BLACK40
}))`
`
