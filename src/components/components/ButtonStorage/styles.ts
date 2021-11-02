import styled from 'styled-components/native'
import colors from '../../../../assets/constants/colors';


export const Wrapper = styled.TouchableOpacity.attrs(({
  activeOpacity: 0.8
})) <{ size?: number }>`
    background-color: ${colors.COLOR_YELLOW};
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: ${props => props.size ? `${props.size * 2}px` : '40px'};
    height: ${props => props.size ? `${props.size * 2}px` : '40px'};
`
