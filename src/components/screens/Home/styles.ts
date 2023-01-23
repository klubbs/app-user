import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.COLOR_WHITE};
  justify-content: center;
  align-items: center;
`;

export const ContainerCommandUserBar = styled.View`
  flex: 0.5;
  width: 90%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${`${colors.COLOR_YELLOW}20`};
  padding-horizontal: 0.5%;
  /* background-color: red; */
`;

export const ContainerDiscountPool = styled.View`
  flex: 2.5;
  justify-content: center;
  padding-horizontal: 0.5%;
  /* background-color: red; */
`;
export const ContainerBottom = styled.View`
  flex: 5;
  padding-horizontal: 1.5%;
`;
