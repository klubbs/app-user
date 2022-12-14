import styled from 'styled-components/native';
import { colors } from '../../../../assets/constants/colors';

export const Wrapper = styled.TouchableOpacity.attrs<{ disabled: boolean | undefined }>({
  activeOpacity: 0.9,
})<{ disabled: boolean | undefined }>`
  width: 90%;
  height: 60px;
  background-color: ${(props) => (props.disabled ? colors.COLOR_WHITE_GRAY : colors.COLOR_YELLOW)};
  border-radius: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text<{ color: string; disabled: boolean | undefined }>`
  color: ${(props) => (props.disabled ? colors.COLOR_BLACK20 : props.color ?? colors.COLOR_WHITE)};
  font-size: 18px;
  font-family: 'Nunito_Bold';
`;
