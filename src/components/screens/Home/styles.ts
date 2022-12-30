import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.COLOR_WHITE};
  justify-content: center;
  align-items: center;
`;

export const ContainerLocation = styled.View`
  flex: 0.5;
  width: 50%;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${`${colors.COLOR_YELLOW}20`};
`;

export const ContainerDiscountPool = styled.View`
  flex: 2.5;
  justify-content: center;
  margin: 1px;
`;

export const ContainerCategories = styled.View`
  flex: 1;
`;

export const ContainerBottom = styled.View`
  flex: 5;
  padding-left: 2%;
  padding-right: 2%;
`;
