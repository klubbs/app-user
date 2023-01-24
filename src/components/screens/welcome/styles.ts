import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';
import Button from '../../components/Button';

export const Title = styled.Text`
  color: ${colors.COLOR_WHITE};
  font-size: 20px;
  font-family: 'Nunito_Bold';
  text-shadow: ${`-1px 1px 10px ${colors.COLOR_WHITE_10}`};
`;

export const Description = styled.Text`
  color: ${colors.COLOR_YELLOW};
  font-size: 16px;
  text-align: center;
  font-family: 'Nunito_SemiBold';
  text-shadow: ${`-1px 1px 10px ${colors.COLOR_YELLOW}20`};
`;

export const ButtonStyled = styled(Button).attrs({
  styleContainer: { marginTop: '10%' },
})``;
