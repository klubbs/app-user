import styled from 'styled-components/native';
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { colors } from '../../../../assets/constants/colors';
import QRCode from 'react-native-qrcode-svg';
import Button from '../../components/Button';

const { width, height } = Dimensions.get('window');

export const QRCodeCoupon = styled(QRCode).attrs({
  backgroundColor: 'transparent',
  logo: require('../../../../assets/images/klubbsLogoCircle.png'),
  size: Dimensions.get('window').width * 0.45,
  color: colors.COLOR_SECUNDARY_BLACK,
})``;

export const Wrapper = styled.SafeAreaView`
  background-color: ${colors.COLOR_YELLOW};
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const ContainerCoupon = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${Platform.select({ ios: 0, android: PixelRatio.get() === 3 ? '2.5%' : 0 })};
  top: 0;
`;

export const SubtitleHelp = styled.Text`
  color: ${colors.COLOR_WHITE_80};
  font-size: 14px;
  font-family: 'Nunito_Bold';
  position: absolute;
  bottom: ${Platform.select({ ios: '16%', android: '4%' })};
`;

export const ContainerImage = styled.View`
  align-items: center;
  justify-content: center;
  height: ${width * 0.15};
  width: ${width * 0.15};
  border-radius: ${width * 0.05};
  overflow: hidden;
  top: ${Platform.select({
    ios: '10%',
    android: PixelRatio.get() === 3 ? '2%' : '6%',
  })};
  margin-top: ${Platform.select({
    ios: 0,
    android: '8%' as any,
  })};
  background-color: ${colors.COLOR_SECUNDARY_WHITE};
`;

export const ImageInfluencer = styled.Image`
  width: 100%;
  height: 100%;
`;

export const FlatListComponent = styled.FlatList.attrs((props) => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  position: absolute;
  bottom: ${Platform.select({ ios: '22%', android: '12%' })};
  padding-horizontal: 15px;
  width: 80%;
  flex-grow: 0;
`;

export const ContainerQr = styled.View<{ distanceInBottom: boolean }>`
  position: absolute;
  top: ${Platform.select({ ios: '28.5%%', android: '24%' })};
`;

const BaseCheckoutButton = styled(Button).attrs({
  textColor: colors.COLOR_WHITE,
  activeOpacity: 0.5,
  styleContainer: {
    position: 'absolute',
  },
})``;

export const CheckinButton = styled(BaseCheckoutButton).attrs({
  text: 'CHECK-IN',
  featherIcon: 'clipboard',
  styleContainer: {
    backgroundColor: colors.COLOR_BLACK,
    width: '40%',
    bottom: Platform.select({ ios: '122%', android: '110%' }),
  },
})``;

export const CheckinProgressButton = styled(BaseCheckoutButton).attrs({
  text: 'CHECKIN EM ANDAMENTO',
  featherIcon: 'refresh-ccw',
  styleContainer: {
    backgroundColor: colors.COLOR_YELLOW_RATING,
    width: '70%',
    bottom: Platform.select({ ios: '6%', android: '32%' }),
  },
})``;
