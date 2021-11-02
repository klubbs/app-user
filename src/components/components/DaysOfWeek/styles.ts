import styled from 'styled-components/native'
import colors from '../../../../assets/constants/colors';
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

export const Wrapper = styled.View< { autoSpacing?: boolean }> `
	width: 100%;
	flex-direction: row;
	justify-content: ${props => props.autoSpacing ? 'flex-start' : 'space-around'};
	align-items: center;
`

export const Container = styled.View< { active: boolean }>`
	width: ${width <= 360 ? '34px' : '40px'};
	height: 30px;
	background-color: ${props => props.active ? colors.COLOR_YELLOW : colors.COLOR_BLACK40};
	border-radius: 5px;
	align-items: center;
	justify-content: center;
`

export const WrapperSelector = styled.View < { autoSpacing?: boolean }> `
	height: 60px;
	justify-content: space-around;
	align-items: center;
  	margin-right:${props => props.autoSpacing ? '10px' : 0};
`

export const Text = styled.Text`
  color:${colors.COLOR_WHITE};
  font-size:12px;
  font-family:'Nunito_Bold';
`
