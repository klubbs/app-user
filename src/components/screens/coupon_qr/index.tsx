import React from 'react';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { CouponQrScreenProps } from '../../../settings/navigation/interfaces/IAppStackParams';
import { ICouponsItem } from '../../component_heavy/coupons_wallet_tab/interfaces';

// import { Container } from './styles';

export const CouponQrScreen: React.FC<CouponQrScreenProps> = ({ route }) => {
  return (
    <View>
      <QRCode
        value={route?.params?.recommendation_code}
        logo={require('../../../../assets/icon.png')}
        // color
      />
    </View>
  );
}
