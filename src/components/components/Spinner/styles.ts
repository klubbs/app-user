import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const SpinnerLoading = styled.ActivityIndicator.attrs({
  color: colors.COLOR_WHITE,
  size: "large",
  animating: true,
})`
    z-index:10px;
`;

export const Container = styled.View`
    position:absolute;
    align-items:center;
    justify-content:center;
    bottom:0;
    left:0;
    top:0;
    right:0;
    z-index:100px;
`
